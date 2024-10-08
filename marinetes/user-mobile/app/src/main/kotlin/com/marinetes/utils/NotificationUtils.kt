package com.marinetes.utils

import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.marinetes.R

class NotificationUtils(private val context: Context) {
  private val channelId = "MyChannelId"
  private val channelName = "MyChannelName"

  private fun getNotificationManager(): NotificationManager {
    return context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
  }

  private fun createChannel(
    isSilent: Boolean = false,
  ) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val notificationManager = getNotificationManager()

      val channel = NotificationChannel(
        channelId,
        channelName,
        NotificationManager.IMPORTANCE_HIGH
      ).apply {
        if (isSilent) {
          setSound(null, null)
        }
      }

      notificationManager.createNotificationChannel(channel)
    }
  }

  fun clearAllNotifications() {
    val notificationManager = getNotificationManager()

    notificationManager.cancelAll()
  }

  fun clearNotificationById(id: Int) {
    val notificationManager = getNotificationManager()

    notificationManager.cancel(id)
  }

  private fun createNotification(
    title: String,
    description: String? = null,
    isClearble: Boolean = true,
    isSilent: Boolean = false,
  ): Notification {
    val notification = NotificationCompat.Builder(context, channelId)

    notification.setContentTitle(title)
    notification.setContentText(description)


    if (!isClearble) {
      notification.setOngoing(true)
    }

    if (isSilent) {
      notification.setSound(null)
    }

    notification.setSmallIcon(R.drawable.ic_launcher_background)

    notification.priority =
      if (isClearble) NotificationCompat.PRIORITY_HIGH else NotificationCompat.FLAG_NO_CLEAR

    return notification.build()
  }

  @SuppressLint("MissingPermission")
  fun sendNotification(
    id: Int,
    title: String,
    description: String? = null,
    isClearble: Boolean = true,
    isSilent: Boolean = false,
  ) {
    createChannel(isSilent)

    val notification = createNotification(
      title = title,
      description = description,
      isClearble = isClearble,
      isSilent = isSilent
    )

    with(NotificationManagerCompat.from(context)) {
      notify(id, notification)
    }
  }
}