package com.marinetes.viewmodels

import android.content.Context
import android.util.Patterns
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.colman.simplecpfvalidator.isCpf
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.serializations.marinetes.user.api.UserPixData
import com.marinetes.network.serializations.marinetes.user.api.requests.UpdateUserPixDataRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsPixKeyEditViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<SettingsPixKeyEditState>(SettingsPixKeyEditState()) }

  val event by lazy { MutableSharedFlow<SettingsPixKeyEditEvent>() }

  fun resetState() {
    state.value = SettingsPixKeyEditState()
  }

  private fun setIsGetPixDataLoading(isGetPixDataLoading: Boolean) {
    state.update { it.copy(isGetPixDataLoading = isGetPixDataLoading) }
  }

  private fun setIsUpdatePixDataLoading(isUpdatePixDataLoading: Boolean) {
    state.update { it.copy(isUpdatePixDataLoading = isUpdatePixDataLoading) }
  }

  private fun setPixData(pixData: UserPixData) {
    state.update { it.copy(pixData = pixData) }
  }

  fun setKeyType(keyType: SettingsPixKeyEditKeyType) {
    state.update { it.copy(keyType = keyType, key = "") }

    updateKeyTypeError(null)
    updateKeyError(null)
  }

  private fun updateKeyTypeError(keyTypeError: String?) {
    state.update { it.copy(keyTypeError = keyTypeError) }
  }

  private fun validateKeyType(keyType: SettingsPixKeyEditKeyType?): Boolean {
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

  private fun validateKey(key: String, keyType: SettingsPixKeyEditKeyType?): Boolean {
    val keyIsRequired = key.isBlank()
    val keyTypeIsRequired = keyType == null
    val keyIsValidCPF = keyType == SettingsPixKeyEditKeyType.CPF && !key.isCpf()
    val keyIsValidPhone =
      keyType == SettingsPixKeyEditKeyType.PHONE && !Regex("^\\d{2}9\\d{8}$").matches(key)
    val keyIsValidEmail =
      keyType == SettingsPixKeyEditKeyType.EMAIL && !Patterns.EMAIL_ADDRESS.matcher(key).matches()
    val keyIsValidRandomKey =
      keyType == SettingsPixKeyEditKeyType.RANDOM_KEY && !Regex("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$").matches(
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

  fun getUserPixData(pixDataId: String) {
    viewModelScope.launch {
      val response = MarinetesUserApiMeEndpoint.getUserPixData(
        pixDataId = pixDataId,
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val pixData = response.body

          setPixData(pixData)
          setKeyType(SettingsPixKeyEditKeyType.findByValue(pixData.keyType) as SettingsPixKeyEditKeyType)
          setKey(pixData.key)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun updateUserPixKey() {
    viewModelScope.launch {
      val pixDataId = state.value.pixData?.id ?: ""

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

      setIsUpdatePixDataLoading(true)

      val response = MarinetesUserApiMeEndpoint.updateUserPixData(
        pixDataId = pixDataId,
        request = UpdateUserPixDataRequest(
          keyType = keyTypeValue?.value.toString(),
          key = keyValue
        ),
        context
      )

      when (response) {
        is NetworkResponse.Success -> {
          setIsUpdatePixDataLoading(false)

          event.emit(SettingsPixKeyEditEvent.PixKeyUpdated)
        }

        is NetworkResponse.Error -> {
          setIsUpdatePixDataLoading(false)

          event.emit(SettingsPixKeyEditEvent.PixKeyError(response.code))
        }
      }
    }
  }
}

enum class SettingsPixKeyEditKeyType(val title: String, val value: String) {
  CPF("CPF", "cpf"),
  PHONE("Celular", "phone"),
  EMAIL("E-mail", "email"),
  RANDOM_KEY("Chave aleatória", "random_key");

  companion object {
    fun findByValue(value: String): SettingsPixKeyEditKeyType? {
      return SettingsPixKeyEditKeyType.values().find { it.value == value }
    }
  }
}

data class SettingsPixKeyEditState(
  val pixData: UserPixData? = null,

  val keyType: SettingsPixKeyEditKeyType? = null,
  val key: String = "",

  val keyTypeError: String? = null,
  val keyError: String? = null,

  val isGetPixDataLoading: Boolean = false,
  val isUpdatePixDataLoading: Boolean = false,
)

sealed class SettingsPixKeyEditEvent {
  data class PixKeyError(val code: String) : SettingsPixKeyEditEvent()
  object PixKeyUpdated : SettingsPixKeyEditEvent()
}