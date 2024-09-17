package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class Payment(
  val id: String,
  @SerialName("asaas_payment_id")
  val asaasPaymentId: String,
  val method: String,
  @SerialName("total_value")
  val totalValue: Int,
  @SerialName("net_value")
  val netValue: Int,
  val status: String,
  @SerialName("pix_qr_code_base64")
  val pixQrCodeBase64: String,
  @SerialName("pix_copy_and_paste")
  val pixCopyAndPaste: String,
  @SerialName("user_id")
  val userId: String,
  @SerialName("created_at")
  val createdAt: String,
  @SerialName("updated_at")
  val updatedAt: String,
)