package com.marinetes.network.endpoints.marinetes.caller

import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkError
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.marinetes.caller.requests.AddUserToQueueRequest
import com.marinetes.network.serializations.marinetes.caller.requests.RemoveUserFromQueueRequest
import com.marinetes.network.serializations.marinetes.caller.responses.GetAllUsersQueueResponse
import com.marinetes.network.serializations.marinetes.user.api.Error
import io.ktor.client.call.body
import io.ktor.client.request.delete
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import java.net.ConnectException

object MarinetesCallerServiceQueuesEndpoint {
  suspend fun getAllUsersQueue(): NetworkResponse<GetAllUsersQueueResponse, Error> {
    try {
      val response = NetworkConfiguration.marinetesCallerServiceClient.get {
        url("/queues/users")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<GetAllUsersQueueResponse>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun addUserToQueue(
    request: AddUserToQueueRequest
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesCallerServiceClient.post {
        url("/queues/users/add")
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

  suspend fun removeUserFromQueue(
    request: RemoveUserFromQueueRequest
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesCallerServiceClient.delete {
        url("/queues/users/remove")
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