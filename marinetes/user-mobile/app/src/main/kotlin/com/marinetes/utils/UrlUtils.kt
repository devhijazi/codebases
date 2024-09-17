package com.marinetes.utils

import io.ktor.http.URLProtocol

object UrlUtils {
  fun getProtocolFromUrl(url: String): URLProtocol {
    return when {
      url.startsWith("http://") -> URLProtocol.HTTP
      url.startsWith("https://") -> URLProtocol.HTTPS
      url.startsWith("ws://") -> URLProtocol.WS
      url.startsWith("wss://") -> URLProtocol.WSS
      else -> URLProtocol.HTTP
    }
  }

  fun getUrlWithoutProtocol(url: String): String {
    return url.replace(Regex("^http://|https://|ws://|wss://"), "")
  }
}