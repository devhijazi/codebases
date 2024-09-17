package com.marinetes.network

// https://stackoverflow.com/a/71801998/21073315

sealed class NetworkResponse<out T, out E> {
  data class Success<T>(val body: T) : NetworkResponse<T, Nothing>()
  data class Error<E>(val code: String, val status: Int) : NetworkResponse<Nothing, E>()
}

fun <T, E> NetworkResponse<T, E>.getSuccessValue(): T? {
  return when (this) {
    is NetworkResponse.Success -> body
    else -> null
  }
}