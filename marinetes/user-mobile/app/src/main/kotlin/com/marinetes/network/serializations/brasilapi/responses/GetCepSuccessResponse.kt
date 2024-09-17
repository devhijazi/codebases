package com.marinetes.network.serializations.brasilapi.responses

import kotlinx.serialization.Serializable

@Serializable
data class GetCepSuccessResponse(
  val cep: String,
  val state: String,
  val city: String,
  val neighborhood: String,
  val street: String,
  val service: String
)