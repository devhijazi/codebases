package com.marinetes.network.endpoints.marinetes.caller

import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkError
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleCanceledRequest
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleConfirmRequest
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleDonedRequest
import com.marinetes.network.serializations.marinetes.user.api.Error
import io.ktor.client.call.body
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import java.net.ConnectException

object MarinetesCallerServiceSchedulesEndpoint {
  suspend fun userDoneSchedule(
    request: UserScheduleDonedRequest
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesCallerServiceClient.post {
        url("/schedules/users/done")
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

  suspend fun userCancelSchedule(
    request: UserScheduleCanceledRequest
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesCallerServiceClient.post {
        url("/schedules/users/cancel")
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

  suspend fun userConfirmSchedule(
    request: UserScheduleConfirmRequest
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesCallerServiceClient.post {
        url("/schedules/users/confirm")
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