package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class CreateTransferRequest(
  val value: Int,
  val operationType: String,
  val pixDataId: String
)