package com.marinetes.network

import io.ktor.http.*

sealed class NetworkError(val code: String, val status: HttpStatusCode) {
  object APIError : NetworkError(
    code = "APIError",
    status = HttpStatusCode.InternalServerError
  )

  object InsuficientFundsError : NetworkError(
    code = "InsuficientFundsError",
    status = HttpStatusCode.BadRequest
  )

  object BadRequestError : NetworkError(
    code = "BadRequestError",
    status = HttpStatusCode.BadRequest
  )

  object APIOfflineError : NetworkError(
    code = "APIOfflineError",
    status = HttpStatusCode.ServiceUnavailable
  )

  object RegisterNotFoundError : NetworkError(
    code = "RegisterNotFoundError",
    status = HttpStatusCode.BadRequest
  )

  object RegisterFoundError : NetworkError(
    code = "RegisterFoundError",
    status = HttpStatusCode.BadRequest
  )

  object DiaristPixKeyAlreadyExistsError : NetworkError(
    code = "DiaristPixKeyAlreadyExistsError",
    status = HttpStatusCode.BadRequest
  )

  object UserPixKeyRateLimitError : NetworkError(
    code = "UserPixKeyRateLimitError",
    status = HttpStatusCode.BadRequest
  )

  object PasswordError : NetworkError(
    code = "PasswordError",
    status = HttpStatusCode.BadRequest
  )

  object ValidationError : NetworkError(
    code = "ValidationError",
    status = HttpStatusCode.BadRequest
  )
}