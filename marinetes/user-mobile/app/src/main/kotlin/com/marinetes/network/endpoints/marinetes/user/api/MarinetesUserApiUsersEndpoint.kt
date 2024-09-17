package com.marinetes.network.endpoints.marinetes.user.api

import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkError
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.marinetes.user.api.Error
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserCodeRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.VerifyUserCodeRequest
import com.marinetes.network.serializations.marinetes.user.api.responses.VerifyUserCodeResponse
import io.ktor.client.call.body
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import java.net.ConnectException

object MarinetesUserApiUsersEndpoint {
  suspend fun createUserCode(
    request: CreateUserCodeRequest
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(null).post {
        url("/users/register/code/new")
        contentType(ContentType.Application.Json)
        setBody(request)
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<Any>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun verifyUserCode(
    request: VerifyUserCodeRequest
  ): NetworkResponse<VerifyUserCodeResponse, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(null).post {
        url("/users/register/code/verify")
        contentType(ContentType.Application.Json)
        setBody(request)
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<VerifyUserCodeResponse>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun createUser(
    request: CreateUserRequest
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(null).post {
        url("/users/register")
        contentType(ContentType.Application.Json)
        setBody(request)
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<Any>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }
}