package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class UpdateUserAddressRequest(
  val title: String,
  val category: Int,
  val type: Int,
  val rooms: Int,
  @SerialName("square_meters")
  val squareMeters: Double,
)