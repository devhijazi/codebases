package com.marinetes.network

import android.annotation.SuppressLint
import android.content.Context
import android.util.Log
import com.marinetes.config.MarinetesConfig
import com.marinetes.utils.PreferencesUtils
import com.marinetes.utils.UrlUtils
import io.ktor.client.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.logging.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json
import io.ktor.client.request.*

object NetworkConfiguration {
  private val marinetesUserApiUrl = MarinetesConfig.MARINETES_USER_API_URL
  private val marinetesCallerServiceUrl = MarinetesConfig.MARINETES_CALLER_SERVICE_URL
  private val brasilApiUrl = "https://brasilapi.com.br"

  private val marinetesUserApiTag = "MARINETES_USER_API"
  private val marinetesCallerServiceTag = "MARINETES_CALLER_SERVICE"
  private val brasilApiTag = "BRASIL_API"

  val marinetesUserApiClient: (context: Context?) -> HttpClient = { context ->
    HttpClient {
      install(ContentNegotiation) {
        json(Json {
          ignoreUnknownKeys = true
          coerceInputValues = true
        })
      }

      install(Logging) {
        level = LogLevel.ALL
        logger = object : Logger {
          override fun log(message: String) {
            Log.d(marinetesUserApiTag, message)
          }
        }
      }

      defaultRequest {
        url {
          protocol = UrlUtils.getProtocolFromUrl(marinetesUserApiUrl)
          host = UrlUtils.getUrlWithoutProtocol(marinetesUserApiUrl)

          if (context != null) {
            val preferences = PreferencesUtils(context)

            val token = preferences.getToken()

            headers {
              append("Authorization", "bearer $token")
            }
          }
        }
      }
    }
  }

  val marinetesCallerServiceClient = HttpClient {
    install(ContentNegotiation) {
      json(Json {
        ignoreUnknownKeys = true
        coerceInputValues = true
      })
    }

    install(Logging) {
      level = LogLevel.ALL
      logger = object : Logger {
        @SuppressLint("LongLogTag")
        override fun log(message: String) {
          Log.d(marinetesCallerServiceTag, message)
        }
      }
    }

    defaultRequest {
      url {
        protocol = UrlUtils.getProtocolFromUrl(marinetesCallerServiceUrl)
        host = UrlUtils.getUrlWithoutProtocol(marinetesCallerServiceUrl)
      }
    }
  }

  val brasilApiClient = HttpClient {
    install(ContentNegotiation) {
      json(Json {
        ignoreUnknownKeys = true
        coerceInputValues = true
      })
    }

    install(Logging) {
      level = LogLevel.ALL
      logger = object : Logger {
        override fun log(message: String) {
          Log.d(brasilApiTag, message)
        }
      }
    }

    defaultRequest {
      url {
        protocol = UrlUtils.getProtocolFromUrl(brasilApiUrl)
        host = UrlUtils.getUrlWithoutProtocol(brasilApiUrl)
      }
    }
  }
}