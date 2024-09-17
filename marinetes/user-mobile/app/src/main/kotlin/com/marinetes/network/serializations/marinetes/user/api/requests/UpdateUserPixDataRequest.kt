package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class UpdateUserPixDataRequest(
  val keyType: String,
  val key: String,
)