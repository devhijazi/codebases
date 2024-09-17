package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.Serializable

@Serializable
class Service(
  val id: String,
  val title: String,
  val icon: String,
)