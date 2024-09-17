package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class UserAddress(
  val id: String,
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