package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiSessionsEndpoint
import com.marinetes.network.getSuccessValue
import com.marinetes.network.serializations.marinetes.user.api.User
import com.marinetes.network.serializations.marinetes.user.api.UserWallet
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserLoginRequest
import com.marinetes.utils.PreferencesUtils
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthenticationViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<AuthenticationState>(AuthenticationState()) }

  val event by lazy { MutableSharedFlow<AuthenticationEvent>() }

  private fun setUser(user: User?) {
    state.update { it.copy(user = user) }
  }

  private fun setUserWallet(userWallet: UserWallet?) {
    state.update { it.copy(userWallet = userWallet) }
  }

  private fun setIsAuthenticated(isAuthenticated: Boolean) {
    state.update { it.copy(isAuthenticated = isAuthenticated) }
  }

  private fun setLoading(isLoading: Boolean) {
    state.update { it.copy(isLoading = isLoading) }
  }

  private fun getPreferences(): PreferencesUtils {
    return PreferencesUtils(context)
  }

  fun hasToken(): Boolean {
    return getPreferences().hasToken()
  }

  private fun setToken(token: String) {
    getPreferences().setToken(token)
  }

  private fun setRefreshToken(refreshToken: String) {
    getPreferences().setRefreshToken(refreshToken)
  }

  private fun removeToken() {
    getPreferences().removeToken()
  }

  private fun removeRefreshToken() {
    getPreferences().removeRefreshToken()
  }

  fun signIn(request: CreateUserLoginRequest) {
    viewModelScope.launch {
      setLoading(true)

      when (val loginResponse = MarinetesUserApiSessionsEndpoint.createUserLogin(request)) {
        is NetworkResponse.Success -> {
          val loginData = loginResponse.body

          setUser(loginData.user)

          setToken(loginData.token)

          if (!loginData.refreshToken.isNullOrBlank()) {
            setRefreshToken(loginData.refreshToken)
          }

          val userWalletResponse = MarinetesUserApiMeEndpoint.getUserWallet(context)
          val userWalletData = userWalletResponse.getSuccessValue()

          setUserWallet(userWalletData)

          setIsAuthenticated(true)
          setLoading(false)

          event.emit(AuthenticationEvent.UserLoggedIn)
        }
        is NetworkResponse.Error -> {
          setLoading(false)

          event.emit(AuthenticationEvent.Error(loginResponse.code))
        }
      }
    }
  }

  fun signOut() {
    viewModelScope.launch {
      removeToken()
      removeRefreshToken()

      event.emit(AuthenticationEvent.UserLoggedOut)
    }
  }

  fun retriveUserWallet() {
    viewModelScope.launch {
      val userWalletResponse = MarinetesUserApiMeEndpoint.getUserWallet(context)
      val userWalletData = userWalletResponse.getSuccessValue()

      setUserWallet(userWalletData)
    }
  }

  fun retriveUser() {
    viewModelScope.launch {
      setLoading(true)

      when (val userResponse = MarinetesUserApiMeEndpoint.getUserLogged(context)) {
        is NetworkResponse.Success -> {
          val userData = userResponse.body

          setUser(userData)

          retriveUserWallet()

          setLoading(false)

          event.emit(AuthenticationEvent.UserFetched(userId = userData.id))
        }
        is NetworkResponse.Error -> {
          setLoading(false)

          event.emit(AuthenticationEvent.Error(userResponse.code))
        }
      }
    }
  }
}

data class AuthenticationState(
  val user: User? = null,
  val userWallet: UserWallet? = null,
  val isAuthenticated: Boolean = false,
  val isLoading: Boolean = false,
)

sealed class AuthenticationEvent {
  object UserLoggedIn : AuthenticationEvent()
  object UserLoggedOut : AuthenticationEvent()
  data class UserFetched(val userId: String) : AuthenticationEvent()
  data class Error(val code: String) : AuthenticationEvent()
}