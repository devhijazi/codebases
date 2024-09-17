package com.marinetes.viewmodels

import android.content.Context
import android.util.Patterns
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.colman.simplecpfvalidator.isCpf
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserPixDataRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsPixKeyCreateViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<SettingsPixKeyCreateState>(SettingsPixKeyCreateState()) }

  val event by lazy { MutableSharedFlow<SettingsPixKeyCreateEvent>() }

  fun resetState() {
    state.value = SettingsPixKeyCreateState()
  }

  private fun setLoading(isLoading: Boolean) {
    state.update { it.copy(isLoading = isLoading) }
  }

  fun setKeyType(keyType: SettingsPixKeyCreateKeyType) {
    state.update { it.copy(keyType = keyType, key = "") }

    updateKeyTypeError(null)
    updateKeyError(null)
  }

  private fun updateKeyTypeError(keyTypeError: String?) {
    state.update { it.copy(keyTypeError = keyTypeError) }
  }

  private fun validateKeyType(keyType: SettingsPixKeyCreateKeyType?): Boolean {
    val keyTypeIsRequired = keyType == null

    if (keyTypeIsRequired) {
      updateKeyTypeError("O tipo de Chave Pix é obrigatório.")

      return true
    }

    updateKeyTypeError(null)

    return false
  }

  fun setKey(key: String) {
    state.update { it.copy(key = key) }

    validateKey(key, state.value.keyType)
  }

  fun updateKeyError(keyError: String?) {
    state.update { it.copy(keyError = keyError) }
  }

  private fun validateKey(key: String, keyType: SettingsPixKeyCreateKeyType?): Boolean {
    val keyIsRequired = key.isBlank()
    val keyTypeIsRequired = keyType == null
    val keyIsValidCPF = keyType == SettingsPixKeyCreateKeyType.CPF && !key.isCpf()
    val keyIsValidPhone =
      keyType == SettingsPixKeyCreateKeyType.PHONE && !Regex("^\\d{2}9\\d{8}$").matches(key)
    val keyIsValidEmail =
      keyType == SettingsPixKeyCreateKeyType.EMAIL && !Patterns.EMAIL_ADDRESS.matcher(key).matches()
    val keyIsValidRandomKey =
      keyType == SettingsPixKeyCreateKeyType.RANDOM_KEY && !Regex("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$").matches(
        key
      )

    if (keyTypeIsRequired) {
      updateKeyError("Selecione um tipo de Chave Pix.")

      return true
    }

    if (keyIsRequired) {
      updateKeyError("A Chave Pix é obrigatório.")

      return true
    }

    if (keyIsValidCPF) {
      updateKeyError("Insira um CPF válido.")

      return true
    }

    if (keyIsValidPhone) {
      updateKeyError("Insira um Celular válido.")

      return true
    }

    if (keyIsValidEmail) {
      updateKeyError("Insira um E-mail válido.")

      return true
    }

    if (keyIsValidRandomKey) {
      updateKeyError("Insira uma Cháve aleatória válida.")

      return true
    }

    updateKeyError(null)

    return false
  }

  fun createPixKey() {
    viewModelScope.launch {
      val keyTypeValue = state.value.keyType
      val keyValue = state.value.key

      val keyTypeValidation = validateKeyType(keyTypeValue)
      val keyValidation = validateKey(keyValue, keyTypeValue)

      val validationHasError = listOf(
        keyTypeValidation,
        keyValidation,
      ).any { it }

      if (validationHasError) {
        return@launch
      }

      setLoading(true)

      val response = MarinetesUserApiMeEndpoint.createUserPixData(
        request = CreateUserPixDataRequest(
          keyType = keyTypeValue?.value.toString(),
          key = keyValue
        ),
        context
      )

      when (response) {
        is NetworkResponse.Success -> {
          setLoading(false)

          event.emit(SettingsPixKeyCreateEvent.PixKeyCreated)
        }

        is NetworkResponse.Error -> {
          setLoading(false)

          event.emit(SettingsPixKeyCreateEvent.PixKeyError(response.code))
        }
      }
    }
  }
}

enum class SettingsPixKeyCreateKeyType(val title: String, val value: String) {
  CPF("CPF", "cpf"),
  PHONE("Celular", "phone"),
  EMAIL("E-mail", "email"),
  RANDOM_KEY("Chave aleatória", "random_key"),
}

data class SettingsPixKeyCreateState(
  val keyType: SettingsPixKeyCreateKeyType? = null,
  val key: String = "",

  val keyTypeError: String? = null,
  val keyError: String? = null,

  val isLoading: Boolean = false,
)

sealed class SettingsPixKeyCreateEvent {
  data class PixKeyError(val code: String) : SettingsPixKeyCreateEvent()
  object PixKeyCreated : SettingsPixKeyCreateEvent()
}