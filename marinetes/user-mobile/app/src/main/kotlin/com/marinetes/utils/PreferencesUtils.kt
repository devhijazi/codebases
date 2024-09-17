package com.marinetes.utils

import android.content.Context
import android.content.SharedPreferences

class PreferencesUtils(private val context: Context) {
  private fun sharedPreferences(): SharedPreferences {
    return context.getSharedPreferences(Constants.AUTH_PREFERENCES_KEY, Context.MODE_PRIVATE)
  }

  fun hasToken(): Boolean {
    return sharedPreferences().contains(PreferencesKeys.REBIMBOKA_AUTH_TOKEN_KEY)
  }

  fun hasRefreshToken(): Boolean {
    return sharedPreferences().contains(PreferencesKeys.REBIMBOKA_AUTH_REFRESH_TOKEN_KEY)
  }

  fun getToken(): String {
    return sharedPreferences().getString(PreferencesKeys.REBIMBOKA_AUTH_TOKEN_KEY, null).orEmpty()
  }

  fun getRefreshToken(): String {
    return sharedPreferences().getString(PreferencesKeys.REBIMBOKA_AUTH_REFRESH_TOKEN_KEY, null).orEmpty()
  }

  fun setToken(token: String?) {
    sharedPreferences()
      .edit()
      .putString(PreferencesKeys.REBIMBOKA_AUTH_TOKEN_KEY, token)
      .apply()
  }

  fun setRefreshToken(token: String?) {
    sharedPreferences()
      .edit()
      .putString(PreferencesKeys.REBIMBOKA_AUTH_REFRESH_TOKEN_KEY, token)
      .apply()
  }

  fun removeToken(): Unit {
    sharedPreferences()
      .edit()
      .remove(PreferencesKeys.REBIMBOKA_AUTH_TOKEN_KEY)
      .apply()
  }

  fun removeRefreshToken() {
    sharedPreferences()
      .edit()
      .remove(PreferencesKeys.REBIMBOKA_AUTH_REFRESH_TOKEN_KEY)
      .apply()
  }
}