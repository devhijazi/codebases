package com.marinetes.network.serializations.marinetes.caller

import kotlinx.serialization.Serializable

@Serializable
class UserQueue(
  val jobId: String,
  val userId: String,
  val budgetId: String,
  val accpetedMatching: Boolean,
  val relatedDiaristId: String? = null,
)