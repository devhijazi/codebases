package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class UserBudget(
  val id: String,
  val date: String,
  val price: Int,
  @SerialName("user_id")
  val userId: String,
  @SerialName("estimated_time_in_hours")
  val estimatedTimeInHours: Int,
  val address: UserAddress,
  val services: List<Service>,
  @SerialName("created_timestamp")
  val created_timestamp: Long
)