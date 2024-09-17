package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class CreateUserPixDataRequest(
  val keyType: String,
  val key: String
)