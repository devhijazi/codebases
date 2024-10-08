package com.marinetes.components

import android.annotation.SuppressLint
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import kotlinx.coroutines.delay

@SuppressLint("RememberReturnType")
@Composable
fun BeatLoader(
  circleColor: Color = Colors.GREEN_300,
  circleSize: Dp = 12.dp,
  animationDelay: Int = 400,
  initialAlpha: Float = 0.3f
) {

  val circles = listOf(
    remember {
      Animatable(initialValue = initialAlpha)
    },
    remember {
      Animatable(initialValue = initialAlpha)
    },
    remember {
      Animatable(initialValue = initialAlpha)
    }
  )

  circles.forEachIndexed { index, animatable ->
    LaunchedEffect(Unit) {
      delay(timeMillis = (animationDelay / circles.size).toLong() * index)

      animatable.animateTo(
        targetValue = 1f,
        animationSpec = infiniteRepeatable(
          animation = tween(
            durationMillis = animationDelay
          ),
          repeatMode = RepeatMode.Reverse
        )
      )
    }
  }

  Row {
    circles.forEachIndexed { index, animatable ->
      if (index != 0) {
        Spacer(modifier = Modifier.width(width = 6.dp))
      }

      Box(
        modifier = Modifier
          .size(size = circleSize)
          .clip(shape = CircleShape)
          .background(
            color = circleColor
              .copy(alpha = animatable.value)
          )
      )
    }
  }
}