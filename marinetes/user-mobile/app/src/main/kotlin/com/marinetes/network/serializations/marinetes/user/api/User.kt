package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class User(
  val id: String,
  @SerialName("full_name")
  val fullName: String,
  val document: String,
  val email: String,
  val phone: String,
)