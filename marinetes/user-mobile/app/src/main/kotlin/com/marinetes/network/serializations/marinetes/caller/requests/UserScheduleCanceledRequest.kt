package com.marinetes.network.serializations.marinetes.caller.requests

import kotlinx.serialization.Serializable

@Serializable
class UserScheduleCanceledRequest(
  val userId: String,
  val scheduleId: String
)