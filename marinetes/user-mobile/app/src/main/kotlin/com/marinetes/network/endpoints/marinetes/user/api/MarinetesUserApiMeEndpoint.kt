package com.marinetes.network.endpoints.marinetes.user.api

import android.content.Context
import com.marinetes.network.NetworkConfiguration
import com.marinetes.network.NetworkError
import com.marinetes.network.NetworkResponse
import com.marinetes.network.serializations.marinetes.user.api.Error
import com.marinetes.network.serializations.marinetes.user.api.Schedule
import com.marinetes.network.serializations.marinetes.user.api.User
import com.marinetes.network.serializations.marinetes.user.api.UserAddress
import com.marinetes.network.serializations.marinetes.user.api.UserBudget
import com.marinetes.network.serializations.marinetes.user.api.UserPixData
import com.marinetes.network.serializations.marinetes.user.api.UserWallet
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserAddressRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserBudgetRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserPixDataRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.UpdateUserAddressRequest
import com.marinetes.network.serializations.marinetes.user.api.requests.UpdateUserPixDataRequest
import io.ktor.client.call.body
import io.ktor.client.request.delete
import io.ktor.client.request.get
import io.ktor.client.request.patch
import io.ktor.client.request.post
import io.ktor.client.request.put
import io.ktor.client.request.setBody
import io.ktor.client.request.url
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.http.isSuccess
import java.net.ConnectException

object MarinetesUserApiMeEndpoint {
  suspend fun getUserLogged(
    context: Context
  ): NetworkResponse<User, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<User>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun getUserWallet(
    context: Context
  ): NetworkResponse<UserWallet, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/wallet")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<UserWallet>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun createUserAddress(
    request: CreateUserAddressRequest,
    context: Context
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).post {
        url("/me/addresses")
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

  suspend fun getUserAddresses(
    context: Context
  ): NetworkResponse<List<UserAddress>, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/addresses")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<List<UserAddress>>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun getUserAddress(
    addressId: String,
    context: Context
  ): NetworkResponse<UserAddress, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/addresses/${addressId}")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<UserAddress>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun updateUserAddress(
    addressId: String,
    request: UpdateUserAddressRequest,
    context: Context
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).put {
        url("/me/addresses/${addressId}")
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

  suspend fun deleteUserAddress(
    addressId: String,
    context: Context
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).delete {
        url("/me/addresses/${addressId}")
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

  suspend fun createUserPixData(
    request: CreateUserPixDataRequest,
    context: Context
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).post {
        url("/me/pixes")
        contentType(ContentType.Application.Json)
        setBody(request)
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<Any>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(
        NetworkError.APIOfflineError.code,
        NetworkError.APIOfflineError.status.value
      )
    }
  }

  suspend fun getUserPixes(context: Context): NetworkResponse<List<UserPixData>, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/pixes")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<List<UserPixData>>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(
        NetworkError.APIOfflineError.code,
        NetworkError.APIOfflineError.status.value
      )
    }
  }

  suspend fun getUserPixData(
    pixDataId: String,
    context: Context
  ): NetworkResponse<UserPixData, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/pixes/${pixDataId}")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<UserPixData>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(NetworkError.APIOfflineError.code, NetworkError.APIOfflineError.status.value)
    }
  }

  suspend fun updateUserPixData(
    pixDataId: String,
    request: UpdateUserPixDataRequest,
    context: Context
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).patch {
        url("/me/pixes/${pixDataId}")
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

  suspend fun deleteUserPixData(
    pixDataId: String,
    context: Context
  ): NetworkResponse<Any, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).delete {
        url("/me/pixes/${pixDataId}")
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

  suspend fun createUserBudget(
    request: CreateUserBudgetRequest,
    context: Context
  ): NetworkResponse<UserBudget, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).post {
        url("/me/budgets")
        contentType(ContentType.Application.Json)
        setBody(request)
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<UserBudget>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(
        NetworkError.APIOfflineError.code,
        NetworkError.APIOfflineError.status.value
      )
    }
  }

  suspend fun getUserBudgets(
    context: Context
  ): NetworkResponse<List<UserBudget>, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/budgets")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<List<UserBudget>>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(
        NetworkError.APIOfflineError.code,
        NetworkError.APIOfflineError.status.value
      )
    }
  }

  suspend fun getUserBudget(
    budgetId: String,
    context: Context
  ): NetworkResponse<UserBudget, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/budgets/$budgetId")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<UserBudget>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(
        NetworkError.APIOfflineError.code,
        NetworkError.APIOfflineError.status.value
      )
    }
  }

  suspend fun getUserSchedules(
    context: Context
  ): NetworkResponse<List<Schedule>, Error> {
    try {
      val response = NetworkConfiguration.marinetesUserApiClient(context).get {
        url("/me/schedules/all")
      }

      if (!response.status.isSuccess()) {
        val error = response.body<Error>()

        return NetworkResponse.Error(error.code, error.status)
      }

      return NetworkResponse.Success(response.body<List<Schedule>>())
    } catch (e: ConnectException) {
      return NetworkResponse.Error(
        NetworkError.APIOfflineError.code,
        NetworkError.APIOfflineError.status.value
      )
    }
  }
}