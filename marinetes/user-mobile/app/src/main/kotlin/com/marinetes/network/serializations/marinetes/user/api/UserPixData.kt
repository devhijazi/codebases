package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class UserPixData(
  val id: String,
  @SerialName("key_type")
  val keyType: String,
  val key: String,
  @SerialName("created_at")
  val createdAt: String,
  @SerialName("updated_at")
  val updatedAt: String,
)