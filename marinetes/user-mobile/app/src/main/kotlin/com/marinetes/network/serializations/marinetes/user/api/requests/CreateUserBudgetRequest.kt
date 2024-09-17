package com.marinetes.network.serializations.marinetes.user.api.requests

import kotlinx.serialization.Serializable

@Serializable
class CreateUserBudgetRequest(
  val date: String,
  val price: Int,
  val addressId: String,
  val services: List<String>
)