package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.config.MarinetesConfig
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiPaymentsEndpoint
import com.marinetes.network.serializations.marinetes.user.api.Payment
import com.marinetes.network.serializations.marinetes.user.api.requests.CreatePaymentRequest
import com.marinetes.utils.CurrencyUtils
import dagger.hilt.android.lifecycle.HiltViewModel
import io.socket.client.IO
import io.socket.client.Socket
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.json.JSONObject
import javax.inject.Inject

@HiltViewModel
class DepositCreateViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<DepositCreateState>(DepositCreateState()) }

  val event by lazy { MutableSharedFlow<DepositCreateEvent>() }

  fun resetState() {
    state.value = DepositCreateState()
  }

  fun setLoading(isLoading: Boolean) {
    state.update { it.copy(isLoading = isLoading) }
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

  fun setCurrentModal(currentModal: DepositCreateStateCurrentModal) {
    state.update { it.copy(currentModal = currentModal) }
  }

  private fun setPayment(payment: Payment) {
    state.update { it.copy(payment = payment) }
  }

  private fun setIsPayment(isPayment: Boolean) {
    state.update { it.copy(isPayment = isPayment) }
  }

  private fun setPaymentWebsocket(paymentServiceSocket: Socket?) {
    state.update { it.copy(paymentWebsocket = paymentServiceSocket) }
  }

  fun setValue(value: String) {
    state.update { it.copy(value = value) }

    validateValue(value = value)
  }

  fun updateValueError(valueError: String?) {
    state.update { it.copy(valueError = valueError) }
  }

  private fun validateValue(value: String): Boolean {
    val valueIsRequired = value.isBlank()
    val valueIsMin = !valueIsRequired && CurrencyUtils.convertIntToDouble(value.toInt()) < 5
    val valueIsMax = !valueIsRequired && CurrencyUtils.convertIntToDouble(value.toInt()) > 5000

    if (valueIsRequired) {
      updateValueError("O valor é obrigatório.")

      return true
    }


    if (valueIsMin) {
      updateValueError("O valor mínimo de depósito é R$ 5.00")

      return true
    }

    if (valueIsMax) {
      updateValueError("O valor máximo de depósito é R$ 5.000,00")

      return true
    }

    updateValueError(null)

    return false
  }

  fun setMethod(method: DepositCreateStateMethod?) {
    state.update { it.copy(method = method) }

    validateMethod(method = method)
  }

  fun updateMethodError(methodError: String?) {
    state.update { it.copy(methodError = methodError) }
  }

  private fun validateMethod(method: DepositCreateStateMethod?): Boolean {
    val methodIsRequired = method == null

    if (methodIsRequired) {
      updateMethodError("O método de pagamento é obrigatório.")

      return true
    }

    updateMethodError(null)

    return false
  }

  fun validateValueAndMethod() {
    viewModelScope.launch {
      when (state.value.currentStep) {
        1 -> {
          val value = state.value.value
          val method = state.value.method

          val valueValidationHasError = validateValue(value)
          val methodValidationHasError = validateMethod(method)

          val validationHasError = listOf(
            valueValidationHasError,
            methodValidationHasError,
          ).any { it }

          if (validationHasError) {
            return@launch
          }

          event.emit(DepositCreateEvent.ValueAndMethodValidated)
        }
      }
    }
  }

  fun connectPaymentWebsocket(userId: String) {
    viewModelScope.launch {
      val paymentWebsocket = IO.socket(
        MarinetesConfig.MARINETES_PAYMENT_SERVICE_WEBSOCKET_URL,
        IO.Options.builder()
          .setQuery("entityType=user&entityId=$userId")
          .build()
      )

      paymentWebsocket.on("paymentReceived") { args ->
        val dataJson = args[0] as JSONObject
        val paymentJson = dataJson.getJSONObject("payment")

        val paymentUpdated = Payment(
          id = paymentJson.getString("id"),
          asaasPaymentId = paymentJson.getString("asaas_payment_id"),
          method = paymentJson.getString("method"),
          totalValue = paymentJson.getInt("total_value"),
          netValue = paymentJson.getInt("net_value"),
          status = paymentJson.getString("status"),
          pixQrCodeBase64 = paymentJson.getString("pix_qr_code_base64"),
          pixCopyAndPaste = paymentJson.getString("pix_copy_and_paste"),
          userId = state.value.payment?.userId.toString() ?: "",
          createdAt = paymentJson.getString("created_at"),
          updatedAt = paymentJson.getString("updated_at"),
        )

        setPayment(paymentUpdated)

        viewModelScope.launch {
          event.emit(DepositCreateEvent.PaymentReceived)
        }
      }

      setPaymentWebsocket(paymentWebsocket)

      paymentWebsocket.connect()
    }
  }

  fun disconnectPaymentWebsocket() {
    viewModelScope.launch {
      val paymentServiceSocket = state.value.paymentWebsocket;

      if (paymentServiceSocket == null) {
        return@launch
      }

      paymentServiceSocket.disconnect()
    }
  }

  fun createPayment() {
    viewModelScope.launch {
      val value = state.value.value
      val method = state.value.method

      setLoading(true)

      val response = MarinetesUserApiPaymentsEndpoint.createPayment(
        request = CreatePaymentRequest(
          value = CurrencyUtils.convertDoubleToUnit(CurrencyUtils.convertIntToDouble(value.toInt())),
          method = method?.value.toString(),
        ),
        context
      )

      when (response) {
        is NetworkResponse.Success -> {
          setLoading(false)

          setPayment(response.body)
          setIsPayment(true)

          event.emit(DepositCreateEvent.PaymentCreated)
        }

        is NetworkResponse.Error -> {
          setLoading(false)

          event.emit(DepositCreateEvent.PaymentError(code = response.code))
        }
      }
    }
  }
}

enum class DepositCreateStateCurrentModal {
  PAYMENT_METHOD,
  PAYMENT_CONFIRM
}

enum class DepositCreateStateMethod(val title: String, val value: String) {
  PIX("PIX", "pix")
}

data class DepositCreateState(
  val startStep: Int = 1,
  val totalSteps: Int = 2,
  val currentStep: Int = 1,

  val currentModal: DepositCreateStateCurrentModal? = null,

  val value: String = "",
  val method: DepositCreateStateMethod? = null,

  val valueError: String? = null,
  val methodError: String? = null,

  val payment: Payment? = null,
  val paymentWebsocket: Socket? = null,

  val isPayment: Boolean = false,

  val isLoading: Boolean = false,
)

sealed class DepositCreateEvent {
  object ValueAndMethodValidated : DepositCreateEvent()
  data class PaymentError(val code: String) : DepositCreateEvent()
  object PaymentCreated : DepositCreateEvent()
  object PaymentReceived : DepositCreateEvent()
}