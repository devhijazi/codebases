package com.marinetes.network.serializations.marinetes.caller.responses

import com.marinetes.network.serializations.marinetes.caller.UserQueue
import kotlinx.serialization.Serializable

@Serializable
class GetAllUsersQueueResponse(
  val usersInQueue: List<UserQueue>
)