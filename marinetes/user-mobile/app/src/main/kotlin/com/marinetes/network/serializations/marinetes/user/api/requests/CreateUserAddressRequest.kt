package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class CreateUserAddressRequest(
  val category: Int,
  val type: Int,
  val city: String,
  val neighborhood: String,
  val number: String,
  val complement: String? = null,
  val rooms: Int,
  @SerialName("square_meters")
  val squareMeters: Double,
  val state: String,
  val street: String,
  val title: String,
  @SerialName("zip_code")
  val zipCode: String,
)