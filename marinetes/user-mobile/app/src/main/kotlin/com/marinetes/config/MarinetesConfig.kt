package com.marinetes.config

import com.marinetes.BuildConfig

object MarinetesConfig {
  const val MARINETES_USER_API_URL: String = BuildConfig.MARINETES_USER_API_URL
  const val MARINETES_PAYMENT_SERVICE_URL: String = BuildConfig.MARINETES_PAYMENT_SERVICE_URL
  const val MARINETES_PAYMENT_SERVICE_WEBSOCKET_URL: String = BuildConfig.MARINETES_PAYMENT_SERVICE_WEBSOCKET_URL
  const val MARINETES_CHAT_SERVICE_URL: String = BuildConfig.MARINETES_CHAT_SERVICE_URL
  const val MARINETES_CHAT_SERVICE_WEBSOCKET_URL: String = BuildConfig.MARINETES_CHAT_SERVICE_WEBSOCKET_URL
  const val MARINETES_NOTIFICATION_SERVICE_URL: String = BuildConfig.MARINETES_NOTIFICATION_SERVICE_URL
  const val MARINETES_NOTIFICATION_SERVICE_WEBSOCKET_URL: String = BuildConfig.MARINETES_NOTIFICATION_SERVICE_WEBSOCKET_URL
  const val MARINETES_CALLER_SERVICE_URL: String = BuildConfig.MARINETES_CALLER_SERVICE_URL
  const val MARINETES_CALLER_SERVICE_WEBSOCKET_URL: String = BuildConfig.MARINETES_CALLER_SERVICE_WEBSOCKET_URL

  const val MARINETES_POLICES_URL = "https://marinetes.com.br/polices"
  const val MARINETES_TERMS_URL = "https://marinetes.com.br/terms"

  const val MARINETES_WHATSAPP_SERVICE_NUMBER = "+5511920069182"
  const val MARINETES_WHATSAPP_DEFAULT_MESSAGE = "Olá! Gostaria de falar com um atendente."
  const val MARINETES_WHATSAPP_URL = "https://api.whatsapp.com/send?phone=$MARINETES_WHATSAPP_SERVICE_NUMBER&text=$MARINETES_WHATSAPP_DEFAULT_MESSAGE"
}

object MarinetesServiceTable {
  private const val hourlyRate = 21.0
  private val services = mapOf(
    "cleaning" to mapOf(
      "less than 100m²" to 6,
      "between 100m² and 180m²" to 7,
      "greater than 180m²" to 9
    ),
    "cook" to mapOf(
      "less than 100m²" to 1,
      "between 100m² and 180m²" to 1,
      "greater than 180m²" to 1
    ),
    "wash-clothes" to mapOf(
      "less than 100m²" to 2,
      "between 100m² and 180m²" to 2,
      "greater than 180m²" to 2
    )
  )

  fun calculateEstimatedValue(area: Double, services: List<String>): Double {
    var total = 0.0

    for (service in services) {
      val hours = when {
        area < 100.00 -> MarinetesServiceTable.services[service]?.get("less than 100m²")
        area <= 180.00 -> MarinetesServiceTable.services[service]?.get("between 100m² and 180m²")
        else -> MarinetesServiceTable.services[service]?.get("greater than 180m²")
      }

      total += MarinetesServiceTable.hourlyRate * (hours ?: 0)
    }

    return total
  }
}