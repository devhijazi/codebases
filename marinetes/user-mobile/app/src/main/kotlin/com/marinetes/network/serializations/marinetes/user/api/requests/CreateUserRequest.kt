package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class CreateUserRequest(
  val code: String,
  val data: CreateUserDataRequest
)

@Serializable
class CreateUserDataRequest(
  @SerialName("full_name")
  val fullName: String,
  val email: String,
  val password: String,
  val document: String,
  val phone: String,
)