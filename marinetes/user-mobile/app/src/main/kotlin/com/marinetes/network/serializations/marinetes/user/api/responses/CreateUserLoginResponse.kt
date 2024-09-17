package com.marinetes.network.serializations.marinetes.user.api.responses

import com.marinetes.network.serializations.marinetes.user.api.User
import kotlinx.serialization.Serializable

@Serializable
class CreateUserLoginResponse(
  val token: String,
  val refreshToken: String? = null,
  val user: User
)