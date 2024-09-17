package com.marinetes.viewmodels

import android.util.Patterns
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.colman.simplecpfvalidator.isCpf
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiUsersEndpoint
import com.marinetes.network.getSuccessValue
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserCodeRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserDataRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.VerifyUserCodeRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.util.Objects
import javax.inject.Inject

@HiltViewModel
class RegisterViewModel @Inject constructor() : ViewModel() {
  val state by lazy { MutableStateFlow<RegisterState>(RegisterState()) }

  val event by lazy { MutableSharedFlow<RegisterEvent>() }

  fun resetState() {
    setCurrentStep(1)

    setEmail("", false)
    setCode("", false)
    setFullName("", false)
    setDocument("", false)
    setPhone("",false)
    setPassword("", false)
    setConfirmPassword("", "", false)

    updateEmailError(null)
    updateCodeError(null)
    updateFullNameError(null)
    updateDocumentError(null)
    updatePasswordError(null)
    updateConfirmPasswordError(null)
  }

  fun setLoading(isLoading: Boolean) {
    state.update { it.copy(isLoading = isLoading) }
  }

  fun nextStep(currentStepValue: Int) {
    setCurrentStep(currentStepValue + 1)
  }

  private fun setCurrentStep(currentStep: Int) {
    state.update { it.copy(currentStep = currentStep) }
  }

  fun setEmail(email: String, validate: Boolean = true) {
    state.update { it.copy(email = email) }

    if (validate) {
      validateEmail(email = email)
    }
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

  fun setCode(code: String, validate: Boolean = true) {
    state.update { it.copy(code = code) }

    if (validate) {
      validateEmail(email = code)
    }
  }

  fun updateCodeError(codeError: String?) {
    state.update { it.copy(codeError = codeError) }
  }

  private fun validateCode(code: String): Boolean {
    val codeIsRequired = code.isBlank()
    val codeMaxCharacters = code.length < 5

    if (codeIsRequired) {
      updateCodeError("O código de verificação é obrigatório.")

      return true
    }

    if (codeMaxCharacters) {
      updateCodeError("O código de verificação precisa ter 5 caracteres numéricos.")

      return true
    }

    updateCodeError(null)

    return false
  }

  fun setFullName(fullName: String, validate: Boolean = true) {
    state.update { it.copy(fullName = fullName) }

    if (validate) {
      validateFullName(fullName = fullName)
    }
  }

  fun updateFullNameError(fullNameError: String?) {
    state.update { it.copy(fullNameError = fullNameError) }
  }

  private fun validateFullName(fullName: String): Boolean {
    val fullNameIsRequired = fullName.isBlank()
    val fullNameIsValid =
      !Regex("^[A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00f6\\u00f8-\\u00ff\\s]*$").matches(fullName) ||
        !Regex("^[A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00f6\\u00f8-\\u00ff\\s]* [A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00f6\\u00f8-\\u00ff\\s]*$").matches(
          (fullName)
        )

    if (fullNameIsRequired) {
      updateFullNameError("O nome completo é obrigatório.")

      return true
    }

    if (fullNameIsValid) {
      updateFullNameError("Insira um nome completo válido.")

      return true
    }

    updateFullNameError(null)

    return false
  }

  fun setDocument(document: String, validate: Boolean = true) {
    state.update { it.copy(document = document) }

    if (validate) {
      validateDocument(document = document)
    }
  }

  fun updateDocumentError(documentError: String?) {
    state.update { it.copy(documentError = documentError) }
  }

  private fun validateDocument(document: String): Boolean {
    val documentIsRequired = document.isBlank()
    val documentIsValid = !document.isCpf()

    if (documentIsRequired) {
      updateDocumentError("O CPF é obrigatório.")

      return true
    }

    if (documentIsValid) {
      updateDocumentError("O CPF precisa ser válido.")

      return true
    }

    updateDocumentError(null)

    return false
  }

  fun setPhone(phone: String, validate: Boolean = true) {
    state.update { it.copy(phone = phone) }

    if (validate) {
      validatePhone(phone = phone)
    }
  }

  fun updatePhoneError(phoneError: String?) {
    state.update { it.copy(phoneError = phoneError) }
  }

  private fun validatePhone(phone: String): Boolean {
    val phoneIsRequired = phone.isBlank()
    val phoneIsValid = !Regex("^\\d{2}9\\d{8}$").matches(phone)

    if (phoneIsRequired) {
      updatePhoneError("O número de celular é obrigatório.")

      return true
    }

    if (phoneIsValid) {
      updatePhoneError("Insira um número de celular válido.")

      return true
    }

    updatePhoneError(null)

    return false
  }

  fun setPassword(password: String, validate: Boolean = true) {
    state.update { it.copy(password = password) }

    if (validate) {
      validatePassword(password = password)
    }
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

  fun setConfirmPassword(confirmPassword: String, password: String, validate: Boolean = true) {
    state.update { it.copy(confirmPassword = confirmPassword) }

    if (validate) {
      validateConfirmPassword(
        confirmPassword = confirmPassword,
        password = password
      )
    }
  }

  fun updateConfirmPasswordError(confirmPasswordError: String?) {
    state.update { it.copy(confirmPasswordError = confirmPasswordError) }
  }

  private fun validateConfirmPassword(confirmPassword: String, password: String): Boolean {
    val confirmPasswordIsRequired = confirmPassword.isBlank()
    val confirmPasswordNotEqual = !Objects.equals(confirmPassword, password)

    if (confirmPasswordIsRequired || confirmPasswordNotEqual) {
      updateConfirmPasswordError("As senhas digitadas não conferem.")

      return true
    }

    updateConfirmPasswordError(null)

    return false
  }

  fun validateData() {
    viewModelScope.launch {
      when (state.value.currentStep) {
        1 -> {
          val emailValue = state.value.email

          val emailValidationHasError = validateEmail(emailValue)

          if (emailValidationHasError) {
            return@launch
          }

          setLoading(true)

          val userCodeResponse = MarinetesUserApiUsersEndpoint.createUserCode(
            request = CreateUserCodeRequest(
              email = emailValue
            )
          )

          when (userCodeResponse) {
            is NetworkResponse.Success -> {
              setLoading(false)

              event.emit(RegisterEvent.EmailValidated)
            }

            is NetworkResponse.Error -> {
              setLoading(false)

              event.emit(RegisterEvent.EmailError(userCodeResponse.code))
            }
          }
        }

        2 -> {
          val emailValue = state.value.email
          val codeValue = state.value.code

          val codeValidationHasError = validateCode(codeValue)

          if (codeValidationHasError) {
            return@launch
          }

          setLoading(true)

          val verifyUserCodeResponse = MarinetesUserApiUsersEndpoint.verifyUserCode(
            request = VerifyUserCodeRequest(
              email = emailValue,
              code = codeValue
            )
          )

          val body = verifyUserCodeResponse.getSuccessValue()

          setLoading(false)

          if (body != null && !body.valid) {
            event.emit(RegisterEvent.CodeError)

            return@launch
          }

          event.emit(RegisterEvent.CodeValidated)
        }

        3 -> {
          val emailValue = state.value.email
          val codeValue = state.value.code
          val fullNameValue = state.value.fullName
          val documentValue = state.value.document
          val phoneValue = state.value.phone
          val passwordValue = state.value.password
          val confirmPasswordValue = state.value.confirmPassword

          val fullNameValidation = validateFullName(fullNameValue)
          val documentValidation = validateDocument(documentValue)
          val phoneValidation = validatePhone(phoneValue)
          val passwordValidation = validatePassword(passwordValue)
          val confirmPasswordValidation = validateConfirmPassword(confirmPasswordValue, passwordValue)

          val validationHasError = listOf(
            fullNameValidation,
            documentValidation,
            phoneValidation,
            passwordValidation,
            confirmPasswordValidation
          ).any { it }

          if (validationHasError) {
            return@launch
          }

          setLoading(true)

          val createUserResponse = MarinetesUserApiUsersEndpoint.createUser(
            request = CreateUserRequest(
              code = codeValue,
              data = CreateUserDataRequest(
                fullName = fullNameValue,
                email = emailValue,
                password = passwordValue,
                document = documentValue,
                phone = phoneValue
              )
            )
          )

          when (createUserResponse) {
            is NetworkResponse.Success -> {
              setLoading(false)

              event.emit(RegisterEvent.UserDataCreated)
            }

            is NetworkResponse.Error -> {
              setLoading(false)

              event.emit(RegisterEvent.UserDataError(createUserResponse.code))
            }
          }
        }
      }
    }
  }
}

data class RegisterState(
  val currentStep: Int = 1,

  val email: String = "",
  val code: String = "",
  val fullName: String = "",
  val document: String = "",
  val phone: String = "",
  val password: String = "",
  val confirmPassword: String = "",

  val emailError: String? = null,
  val codeError: String? = null,
  val fullNameError: String? = null,
  val documentError: String? = null,
  val phoneError: String? = null,
  val passwordError: String? = null,
  val confirmPasswordError: String? = null,

  val isLoading: Boolean = false,
)

sealed class RegisterEvent {
  object EmailValidated : RegisterEvent()
  object CodeValidated : RegisterEvent()
  object UserDataCreated : RegisterEvent()
  data class EmailError(val code: String) : RegisterEvent()
  object CodeError : RegisterEvent()
  data class UserDataError(val code: String) : RegisterEvent()
}