package com.marinetes.network.serializations.marinetes.user.api

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
class Transfer(
  val id: String,
  @SerialName("asaas_transfer_id")
  val asaasTransferId: String,
  @SerialName("operation_type")
  val operationType: String,
  @SerialName("total_value")
  val totalValue: Int,
  @SerialName("net_value")
  val netValue: Int,
  @SerialName("trasnsfer_fee")
  val transferFee: Int,
  val status: String,
  @SerialName("pix_data_id")
  val pixDataId: String,
  @SerialName("user_id")
  val userId: String,
  @SerialName("created_at")
  val createdAt: String,
  @SerialName("updated_at")
  val updatedAt: String,
)