package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiTransfersEndpoint
import com.marinetes.network.serializations.marinetes.user.api.Transfer
import com.marinetes.network.serializations.marinetes.user.api.UserPixData
import com.marinetes.network.serializations.marinetes.user.api.UserWallet
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateTransferRequest
import com.marinetes.utils.CurrencyUtils
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsTransferCreateViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<SettingsTransferCreateState>(SettingsTransferCreateState()) }

  val event by lazy { MutableSharedFlow<SettingsTransferCreateEvent>() }

  fun resetState() {
    state.value = SettingsTransferCreateState()
  }

  fun backStep(currentStep: Int) {
    if (state.value.currentStep == state.value.startStep) {
      setCurrentStep(state.value.startStep)

      return
    }

    setCurrentStep(currentStep - 1)
  }

  fun nextStep(currentStep: Int) {
    if (state.value.currentStep == state.value.totalSteps) {
      setCurrentStep(state.value.totalSteps)

      return
    }

    setCurrentStep(currentStep + 1)
  }

  private fun setCurrentStep(currentStep: Int) {
    state.update { it.copy(currentStep = currentStep) }
  }

  fun setCurrentModal(currentModal: SettingsTransferCreateCurrentModal) {
    state.update { it.copy(currentModal = currentModal) }
  }

  private fun setPixes(pixes: MutableList<UserPixData>) {
    state.update { it.copy(pixes = pixes) }
  }

  private fun setIsGetPixesLoading(isGetPixesLoading: Boolean) {
    state.update { it.copy(isGetPixesLoading = isGetPixesLoading) }
  }

  private fun setIsTransferLoading(isTransferLoading: Boolean) {
    state.update { it.copy(isTransferLoading = isTransferLoading) }
  }

  private fun setIsTransfer(isTransfer: Boolean) {
    state.update { it.copy(isTransfer = isTransfer) }
  }

  private fun setTransfer(transfer: Transfer) {
    state.update { it.copy(transfer = transfer) }
  }

  fun setPixKeyId(pixKeyId: String?) {
    state.update { it.copy(pixKeyId = pixKeyId) }

    validatePixKeyId(pixKeyId = pixKeyId)
  }

  fun getPixKey(pixKeyId: String?): String {
    if (pixKeyId != null) {
      val pixKeyFounded = state.value.pixes.find { it.id == pixKeyId }

      if (pixKeyFounded != null) {
        val keyType = when (pixKeyFounded.keyType) {
          "cpf" -> "CPF"
          "phone" -> "Celular"
          "email" -> "E-mail"
          "random_key" -> "Chave aleatória"
          else -> ""
        }

        return "$keyType - ${pixKeyFounded.key}"
      }
    }

    return ""
  }

  private fun updatePixKeyIdError(pixKeyIdError: String?) {
    state.update { it.copy(pixKeyIdError = pixKeyIdError) }
  }

  private fun validatePixKeyId(pixKeyId: String?): Boolean {
    val pixKeyIdIsRequired = pixKeyId.isNullOrBlank()

    if (pixKeyIdIsRequired) {
      updatePixKeyIdError("A Chave Pix do destinatário é obrigatório.")

      return true
    }

    updatePixKeyIdError(null)

    return false
  }

  fun setValue(value: String, userWallet: UserWallet) {
    state.update { it.copy(value = value) }

    validateValue(value = value, userWallet = userWallet)
  }

  fun updateValueError(valueError: String?) {
    state.update { it.copy(valueError = valueError) }
  }

  private fun validateValue(value: String, userWallet: UserWallet): Boolean {
    val valueIsRequired = value.isBlank()
    val valueIsMin = !valueIsRequired && CurrencyUtils.convertIntToDouble(value.toInt()) < 5
    val valueIsMax = !valueIsRequired && CurrencyUtils.convertUnitToDouble(userWallet.balanceAvailable) <= CurrencyUtils.convertIntToDouble(value.toInt())

    if (valueIsRequired) {
      updateValueError("O valor da transferência é obrigatório.")

      return true
    }


    if (valueIsMin) {
      updateValueError("O valor mínimo de transferência é R$ 5.00")

      return true
    }

    if (valueIsMax) {
      val balanceAvailable = CurrencyUtils.convertQuantityToLocalCurrency(CurrencyUtils.convertUnitToDouble(userWallet.balanceAvailable))

      updateValueError("O valor da transferência precisa ser inferior ou igual à $balanceAvailable")

      return true
    }

    updateValueError(null)

    return false
  }

  fun getUserPixes() {
    viewModelScope.launch {
      setIsGetPixesLoading(true)

      val response = MarinetesUserApiMeEndpoint.getUserPixes(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val pixes = response.body

          setPixes(pixes.toMutableList())
          setIsGetPixesLoading(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun validateValueAndPixKey(userWallet: UserWallet) {
    viewModelScope.launch {
      val value = state.value.value
      val pixKeyId = state.value.pixKeyId

      val valueValidationHasError = validateValue(value, userWallet)
      val pixKeyIdValidationHasError = validatePixKeyId(pixKeyId)

      val validationHasError = listOf(
        valueValidationHasError,
        pixKeyIdValidationHasError,
      ).any { it }

      if (validationHasError) {
        return@launch
      }

      event.emit(SettingsTransferCreateEvent.ValueAndPixKeyValidated)
    }
  }

  fun createTransfer() {
    viewModelScope.launch {
      val value = state.value.value
      val pixKeyId = state.value.pixKeyId

      setIsTransferLoading(true)

      val response = MarinetesUserApiTransfersEndpoint.createTransfer(
        request = CreateTransferRequest(
          value = CurrencyUtils.convertDoubleToUnit(CurrencyUtils.convertIntToDouble(value.toInt())),
          operationType = "pix",
          pixDataId = pixKeyId.toString()
        ),
        context
      )

      when (response) {
        is NetworkResponse.Success -> {
          setIsTransferLoading(false)

          setTransfer(response.body)
          setIsTransfer(true)

          event.emit(SettingsTransferCreateEvent.TransferCreated)
        }

        is NetworkResponse.Error -> {
          setIsTransferLoading(false)

          event.emit(SettingsTransferCreateEvent.TransferError(code = response.code))
        }
      }
    }
  }
}

enum class SettingsTransferCreateCurrentModal {
  SELECT_PIX,
  TRANSFER_CONFIRM
}

data class SettingsTransferCreateState(
  val startStep: Int = 1,
  val totalSteps: Int = 2,
  val currentStep: Int = 1,

  val currentModal: SettingsTransferCreateCurrentModal? = null,

  val pixes: MutableList<UserPixData> = mutableListOf(),

  val transfer: Transfer? = null,

  val value: String = "",
  val pixKeyId: String? = null,

  val valueError: String? = null,
  val pixKeyIdError: String? = null,

  val isTransfer: Boolean = false,

  val isGetPixesLoading: Boolean = false,
  val isTransferLoading: Boolean = false,
)

sealed class SettingsTransferCreateEvent {
  object ValueAndPixKeyValidated : SettingsTransferCreateEvent()
  data class TransferError(val code: String) : SettingsTransferCreateEvent()
  object TransferCreated : SettingsTransferCreateEvent()
}