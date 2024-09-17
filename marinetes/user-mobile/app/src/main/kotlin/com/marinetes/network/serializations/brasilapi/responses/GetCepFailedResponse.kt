package com.marinetes.network.serializations.brasilapi.responses

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

@Serializable
data class GetCepFailedResponse(
  val name: String,
  val message: String,
  val type: String,
  val errors: List<JsonObject> = listOf()
)