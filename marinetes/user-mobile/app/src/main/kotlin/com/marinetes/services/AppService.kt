package com.marinetes.services

import android.app.Service
import android.content.Intent
import android.os.IBinder
import com.marinetes.utils.NotificationUtils

class AppService : Service() {
  override fun onTaskRemoved(rootIntent: Intent?) {
    super.onTaskRemoved(rootIntent)

    val notificationUtils = NotificationUtils(applicationContext)

    notificationUtils.clearAllNotifications()
  }

  override fun onBind(intent: Intent): IBinder? {
    return null
  }
}