package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class CreateUserCodeRequest(
  val email: String,
)