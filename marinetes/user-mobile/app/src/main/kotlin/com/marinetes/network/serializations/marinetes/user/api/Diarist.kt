package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class Diarist(
  val id: String,
  @SerialName("full_name")
  val fullName: String,
  val birthdate: String,
  val document: String,
  @SerialName("general_register")
  val generalRegister: String,
  val phone: String,
  val email: String,
  @SerialName("accepting_services")
  val acceptingServices: Boolean,
  val avatar: String? = null,
  @SerialName("created_at")
  val createdAt: String,
  @SerialName("updated_at")
  val updatedAt: String,
)