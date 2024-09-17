package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class CreateUserLoginRequest(
  val email: String,
  val password: String,
  val stay: Boolean
)