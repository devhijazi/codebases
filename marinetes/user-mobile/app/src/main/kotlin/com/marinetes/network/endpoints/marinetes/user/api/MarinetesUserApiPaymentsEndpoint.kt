package com.marinetes.network.endpoints.marinetes.user.api

import android.content.Context
import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkError
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.marinetes.user.api.Error
import com.marinetes.network.serializations.marinetes.user.api.Payment
import com.marinetes.network.serializations.marinetes.user.api.requests.CreatePaymentRequest
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import java.net.ConnectException

object MarinetesUserApiPaymentsEndpoint {
  suspend fun createPayment(
    request: CreatePaymentRequest,
    context: Context
  ): NetworkResponse<Payment, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).post {
        url("/payments")
        contentType(ContentType.Application.Json)
        setBody(request)
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<Payment>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun getPayments(
    context: Context
  ): NetworkResponse<List<Payment>, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/payments")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<List<Payment>>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }
}