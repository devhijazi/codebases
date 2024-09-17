package com.marinetes.viewmodels

import android.util.Patterns
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor() : ViewModel() {
  val state by lazy { MutableStateFlow<LoginState>(LoginState()) }

  val event by lazy { MutableSharedFlow<LoginEvent>() }

  fun resetState() {
    setEmail("")
    setPassword("")
    setStay(false)

    updateEmailError(null)
    updatePasswordError(null)
  }

  fun setEmail(email: String) {
    state.update { it.copy(email = email) }

    validateEmail(email = email)
  }

  fun updateEmailError(emailError: String?) {
    state.update { it.copy(emailError = emailError) }
  }

  private fun validateEmail(email: String): Boolean {
    val emailIsRequired = email.isBlank()
    val emailIsValid = !Patterns.EMAIL_ADDRESS.matcher(email).matches()

    if (emailIsRequired) {
      updateEmailError("O e-mail é obrigatório.")

      return true
    }

    if (emailIsValid) {
      updateEmailError("Isso não é um e-mail válido.")

      return true
    }

    updateEmailError(null)

    return false
  }

  fun setPassword(password: String) {
    state.update { it.copy(password = password) }

    validatePassword(password = password)
  }

  fun updatePasswordError(passwordError: String?) {
    state.update { it.copy(passwordError = passwordError) }
  }

  private fun validatePassword(password: String): Boolean {
    val passwordIsRequired = password.isBlank()
    val passwordMinCharacters = password.length < 6

    if (passwordIsRequired) {
      updatePasswordError("A senha é obrigatória.")

      return true
    }

    if (passwordMinCharacters) {
      updatePasswordError("A senha precisa ter no mínimo 6 caracteres.")

      return true
    }

    updatePasswordError(null)

    return false
  }

  fun setStay(stay: Boolean) {
    state.update { it.copy(stay = stay) }
  }

  fun validateData() {
    viewModelScope.launch {
      val emailValue = state.value.email
      val passwordValue = state.value.password

      val emailValidation = validateEmail(emailValue)
      val passwordValidation = validatePassword(passwordValue)

      val validationHasError = listOf(
        emailValidation,
        passwordValidation
      ).any { it }

      if (validationHasError) {
        return@launch
      }

      event.emit(LoginEvent.DataValidated)
    }
  }
}

data class LoginState(
  val email: String = "",
  val password: String = "",
  val stay: Boolean = false,

  val emailError: String? = null,
  val passwordError: String? = null,
)

sealed class LoginEvent {
  object DataValidated : LoginEvent()
}

