package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

@Serializable
data class Error(
  val message: String,
  val code: String,
  val status: Int,
  @SerialName("errors")
  val errors: JsonObject? = null
)