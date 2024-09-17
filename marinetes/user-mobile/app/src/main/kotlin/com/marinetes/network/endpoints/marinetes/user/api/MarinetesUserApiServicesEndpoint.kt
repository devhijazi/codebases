package com.marinetes.network.endpoints.marinetes.user.api

import android.content.Context
import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkError
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.marinetes.user.api.Error
import com.marinetes.network.serializations.marinetes.user.api.Service
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.url
import io.ktor.http.isSuccess
import java.net.ConnectException

object MarinetesUserApiServicesEndpoint {
  suspend fun getServices(
    context: Context
  ): NetworkResponse<List<Service>, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/services")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<List<Service>>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }
}