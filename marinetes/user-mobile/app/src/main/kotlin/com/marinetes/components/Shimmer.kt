package com.marinetes.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.valentinilk.shimmer.shimmer

@Composable
fun Shimmer(
  width: Dp = 0.dp,
  height: Dp,
  backgroundColor: Color = Colors.GRAY_500,
  borderRadius: Dp = 10.dp
) {
  val modifierWithWidth = if (width == 0.dp) Modifier.fillMaxWidth() else Modifier.width(width)

  val modifier = modifierWithWidth
    .height(height)
    .shimmer()
    .background(color = backgroundColor, shape = RoundedCornerShape(borderRadius))

  Box(
    modifier = modifier
  )
}