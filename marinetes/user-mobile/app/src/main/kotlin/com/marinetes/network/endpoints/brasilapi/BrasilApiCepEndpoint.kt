package com.marinetes.network.endpoints.brasilapi

import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.brasilapi.responses.GetCepFailedResponse
import com.marinetes.network.serializations.brasilapi.responses.GetCepSuccessResponse
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.url
import io.ktor.http.isSuccess

object BrasilApiCepEndpoint {
  suspend fun getCep(cep: String): NetworkResponse<GetCepSuccessResponse, GetCepFailedResponse> {
    val response = NetworkConfiguration.brasilApiClient.get {
      url("/api/cep/v1/${cep}")
    }

    if (!response.status.isSuccess()) {
      val error = response.body<GetCepFailedResponse>()

      return NetworkResponse.Error(error.name, response.status.value)
    }

    return NetworkResponse.Success(response.body<GetCepSuccessResponse>())
  }
}