package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.config.MarinetesConfig
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiPaymentsEndpoint
import com.marinetes.network.serializations.marinetes.user.api.Payment
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
class DepositListViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<DepositListState>(DepositListState()) }

  val event by lazy { MutableSharedFlow<DepositListEvent>() }

  fun resetState() {
    state.value = DepositListState()
  }

  private fun setPayments(payments: MutableList<Payment>) {
    state.update { it.copy(payments = payments) }
  }

  fun setCurrentPayment(currentPayment: Payment?) {
    state.update { it.copy(currentPayment = currentPayment) }
  }

  private fun setPaymentWebsocket(paymentServiceSocket: Socket?) {
    state.update { it.copy(paymentWebsocket = paymentServiceSocket) }
  }

  private fun setLoading(loading: Boolean) {
    state.update { it.copy(isLoading = loading) }
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
          userId = state.value.currentPayment?.userId.toString(),
          createdAt = paymentJson.getString("created_at"),
          updatedAt = paymentJson.getString("updated_at"),
        )

        if (state.value.currentPayment != null) {
          setCurrentPayment(paymentUpdated)

          viewModelScope.launch {
            event.emit(DepositListEvent.PaymentRecevied)
          }
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

  fun getPayments() {
    viewModelScope.launch {
      setLoading(true)

      val response = MarinetesUserApiPaymentsEndpoint.getPayments(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val payments = response.body

          setPayments(payments.toMutableList())
          setLoading(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }
}

data class DepositListState(
  val payments: MutableList<Payment> = mutableListOf(),

  val paymentWebsocket: Socket? = null,

  val currentPayment: Payment? = null,

  val isLoading: Boolean = false,
)

sealed class DepositListEvent {
  object PaymentRecevied : DepositListEvent()
}