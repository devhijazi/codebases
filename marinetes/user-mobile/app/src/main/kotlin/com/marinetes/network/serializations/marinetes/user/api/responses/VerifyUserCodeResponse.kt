package com.marinetes.network.serializations.marinetes.user.api.responses

import kotlinx.serialization.Serializable

@Serializable
class VerifyUserCodeResponse(
  val valid: Boolean
)