package com.marinetes.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

val Typographies = Typography(
  headlineSmall = TextStyle(
    fontFamily = Fonts.Roboto,
    fontWeight = FontWeight.Bold,
    fontSize = 22.sp,
    color = Colors.BLACK
  ),
  titleLarge = TextStyle(
    fontFamily = Fonts.Roboto,
    fontWeight = FontWeight.SemiBold,
    fontSize = 20.sp,
    color = Colors.BLACK
  ),
  titleMedium = TextStyle(
    fontFamily = Fonts.Roboto,
    fontWeight = FontWeight.SemiBold,
    fontSize = 18.sp,
    color = Colors.BLACK
  ),
  bodyLarge = TextStyle(
    fontFamily = Fonts.Roboto,
    fontWeight = FontWeight.Medium,
    fontSize = 16.sp,
    color = Colors.GRAY_500
  ),
  bodyMedium = TextStyle(
    fontFamily = Fonts.Roboto,
    fontWeight = FontWeight.Normal,
    fontSize = 14.sp,
    color = Colors.GRAY_500
  ),
  bodySmall = TextStyle(
    fontFamily = Fonts.Roboto,
    fontWeight = FontWeight.Normal,
    fontSize = 12.sp,
    color = Colors.GRAY_500
  )
)