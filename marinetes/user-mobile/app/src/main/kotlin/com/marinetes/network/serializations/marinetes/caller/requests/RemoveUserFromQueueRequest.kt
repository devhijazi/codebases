package com.marinetes.network.serializations.marinetes.caller.requests

import kotlinx.serialization.Serializable

@Serializable
class RemoveUserFromQueueRequest(
  val userId: String
)