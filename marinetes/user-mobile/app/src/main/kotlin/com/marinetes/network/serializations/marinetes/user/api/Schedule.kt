package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class Schedule(
  val id: String,
  val status: String,
  val date: String,
  @SerialName("end_date")
  val endDate: String? = null,
  val price: Int,
  @SerialName("estimated_time_in_hours")
  val estimatedTimeInHours: Int,
  val verified: Boolean,
  val confirmed: Boolean,
  @SerialName("going_to_local")
  val goingToLocal: Boolean,
  @SerialName("user_id")
  val userId: String,
  @SerialName("diarist_id")
  val diaristId: String,
  val diarist: Diarist?,
  @SerialName("second_diarist_id")
  val secondDiaristId: String? = null,
  @SerialName("verification_code")
  val verificationCode: String,
  @SerialName("confirmation_code")
  val confirmationCode: String,
  val address: UserAddress,
  val payment: Payment? = null,
  val services: List<Service>,
  @SerialName("created_at")
  val createdAt: String,
  @SerialName("updated_at")
  val updatedAt: String,
)