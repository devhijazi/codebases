package com.marinetes.network.serializations.marinetes.caller.requests

import kotlinx.serialization.Serializable

@Serializable
class AddUserToQueueRequest(
  val userId: String,
  val budgetId: String
)