package com.marinetes.utils

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.dp

enum class Dimensions {
  MOBILE_SMALL,
  MOBILE_MEDIUM,
  MOBILE_LARGE,
  TABLET,
  LAPTOP,
  LAPTOP_LARGE,
  FOUR_K,
  UNKNOWN
}

object DeviceUtils {
  @Composable
  fun getCurrentDimension(): Dimensions {
    val configuration = LocalConfiguration.current

    return when(configuration.screenWidthDp.dp) {
      320.dp -> Dimensions.MOBILE_SMALL
      375.dp -> Dimensions.MOBILE_MEDIUM
      425.dp -> Dimensions.MOBILE_LARGE
      768.dp -> Dimensions.TABLET
      1024.dp -> Dimensions.LAPTOP
      1440.dp -> Dimensions.LAPTOP_LARGE
      2560.dp -> Dimensions.FOUR_K
      else ->  Dimensions.UNKNOWN
    }
  }
}

