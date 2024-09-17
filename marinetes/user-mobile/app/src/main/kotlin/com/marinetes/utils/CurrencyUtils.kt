package com.marinetes.utils

import java.text.NumberFormat
import java.util.*

object CurrencyUtils {
  fun convertIntToDouble(value: Int): Double {
    return value / 100.0
  }

  fun convertDoubleToUnit(value: Double): Int {
    return (value * 100).toInt()
  }

  fun convertUnitToDouble(value: Int): Double {
    return value.toDouble() / 100.0
  }

  fun convertQuantityToLocalCurrency(value: Any): String {
    return NumberFormat.getCurrencyInstance(Locale("pt", "BR")).format(value) as String
  }
}