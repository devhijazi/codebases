package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class CreatePaymentRequest(
  val value: Int,
  val method: String
)