package com.marinetes.utils

import android.os.Build
import java.text.SimpleDateFormat
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.util.Calendar
import java.util.Locale

object TimeUtils {
  fun currentDateToISO(): String {
    if (Build.VERSION.SDK_INT >= 26) {
      val current = ZonedDateTime.now()
      val formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME

      current.format(formatter)
    }

    val calendar = Calendar.getInstance()

    val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault())

    return sdf.format(calendar.time)
  }

  fun calendarToISO(calendar: Calendar): String {
    val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault())

    sdf.timeZone = calendar.timeZone

    return sdf.format(calendar.time)
  }

  fun getAllDaysOfTheYearStartingFromToday(): MutableList<DayData> {
    val calendar = Calendar.getInstance()
    val formatter = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
    val endOfYear = Calendar.getInstance()

    endOfYear.set(Calendar.DAY_OF_YEAR, 365)

    val currentDateOfYear = calendar.clone() as Calendar

    val days = mutableListOf<DayData>()

    while (currentDateOfYear.before(endOfYear)) {
      days.add(
        DayData(
          dayShortName = dayShortName(currentDateOfYear.get(Calendar.DAY_OF_WEEK)),
          displayDate = currentDateOfYear.get(Calendar.DAY_OF_MONTH).toString(),
          fullDate = formatter.format(currentDateOfYear.time),
          monthShortName = monthShortName(currentDateOfYear.get(Calendar.MONTH)),
          year = currentDateOfYear.get(Calendar.YEAR).toString(),
          iso = calendarToISO(currentDateOfYear)
        )
      )

      currentDateOfYear.add(Calendar.DAY_OF_YEAR, 1)
    }

    return days
  }

  fun dayShortName(dayOfWeek: Int): String {
    val calendar = Calendar.getInstance()

    calendar.set(Calendar.DAY_OF_WEEK, dayOfWeek)

    val dateFormat = SimpleDateFormat("EEE", Locale("pt", "BR"))

    return dateFormat.format(calendar.time)
  }

  fun monthShortName(month: Int): String {
    val calendar = Calendar.getInstance()

    calendar.set(Calendar.MONTH, month)

    val dateFormat = SimpleDateFormat("MMM", Locale("pt", "BR"))

    return dateFormat.format(calendar.time)
  }
}

data class DayData(
  val dayShortName: String, // Mon
  val displayDate: String, // 03
  val fullDate: String, // 03/01/2023
  val monthShortName: String, // Jan
  val year: String, // 2023
  val iso: String,
)