package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class UserWallet(
  val id: String,
  @SerialName("balance_available")
  val balanceAvailable: Int,
  @SerialName("blocked_balance")
  val blockedBalance: Int,
  @SerialName("created_at")
  val createdAt: String,
  @SerialName("updated_at")
  val updatedAt: String,
)