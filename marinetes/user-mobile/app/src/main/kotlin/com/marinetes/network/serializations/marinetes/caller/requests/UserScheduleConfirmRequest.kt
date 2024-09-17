package com.marinetes.network.serializations.marinetes.caller.requests

import kotlinx.serialization.Serializable

@Serializable
class UserScheduleConfirmRequest(
  val userId: String,
  val scheduleId: String
)