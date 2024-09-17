package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.serializations.marinetes.user.api.UserPixData
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsPixKeyListViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<SettingsPixKeyListState>(SettingsPixKeyListState()) }

  fun resetState() {
    state.value = SettingsPixKeyListState()
  }

  private fun setPixes(pixes: MutableList<UserPixData>) {
    state.update { it.copy(pixes = pixes) }
  }

  private fun setLoading(loading: Boolean) {
    state.update { it.copy(isLoading = loading) }
  }

  fun deleteUserPixData(pixDataId: String) {
    viewModelScope.launch {
      val response = MarinetesUserApiMeEndpoint.deleteUserPixData(
        pixDataId = pixDataId,
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          getUserPixes()
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  private fun getUserPixes() {
    viewModelScope.launch {
      val response = MarinetesUserApiMeEndpoint.getUserPixes(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val pixes = response.body

          setPixes(pixes.toMutableList())
          setLoading(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun getUserPixesWithLoading() {
    viewModelScope.launch {
      setLoading(true)

      getUserPixes()
    }
  }
}

data class SettingsPixKeyListState(
  val pixes: MutableList<UserPixData> = mutableListOf(),

  val isLoading: Boolean = false,
)