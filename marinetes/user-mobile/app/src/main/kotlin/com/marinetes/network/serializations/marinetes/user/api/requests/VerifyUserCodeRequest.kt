package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class VerifyUserCodeRequest(
  val email: String,
  val code: String,
)