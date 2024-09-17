package com.marinetes.network.endpoints.marinetes.user.api

import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkError
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.marinetes.user.api.Error
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserLoginRequest
import com.marinetes.network.serializations.marinetes.user.api.responses.CreateUserLoginResponse
import io.ktor.client.call.body
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import java.net.ConnectException

object MarinetesUserApiSessionsEndpoint {
  suspend fun createUserLogin(
    request: CreateUserLoginRequest
  ): NetworkResponse<CreateUserLoginResponse, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(null).post {
        url("/sessions/login")
        contentType(ContentType.Application.Json)
        setBody(request)
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<CreateUserLoginResponse>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }
}