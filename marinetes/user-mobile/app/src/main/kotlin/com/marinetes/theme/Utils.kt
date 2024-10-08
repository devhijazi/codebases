package com.marinetes.theme

import android.content.Context
import android.graphics.BlurMaskFilter
import android.widget.Toast
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Paint
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

fun Modifier.shadow(
  color: Color = Colors.BLACK,
  borderRadius: Dp = 0.dp,
  blurRadius: Dp = 0.dp,
  offsetY: Dp = 0.dp,
  offsetX: Dp = 0.dp,
  spread: Dp = 0f.dp,
  modifier: Modifier = Modifier
) = this.then(
  modifier.drawBehind {
    this.drawIntoCanvas {
      val paint = Paint()
      val frameworkPaint = paint.asFrameworkPaint()
      val spreadPixel = spread.toPx()
      val leftPixel = (0f - spreadPixel) + offsetX.toPx()
      val topPixel = (0f - spreadPixel) + offsetY.toPx()
      val rightPixel = (this.size.width + spreadPixel)
      val bottomPixel = (this.size.height + spreadPixel)

      if (blurRadius != 0.dp) {
        frameworkPaint.maskFilter =
          (BlurMaskFilter(blurRadius.toPx(), BlurMaskFilter.Blur.NORMAL))
      }

      frameworkPaint.color = color.toArgb()

      it.drawRoundRect(
        left = leftPixel,
        top = topPixel,
        right = rightPixel,
        bottom = bottomPixel,
        radiusX = borderRadius.toPx(),
        radiusY = borderRadius.toPx(),
        paint
      )
    }
  }
)

fun Modifier.noRippleClickable(onClick: () -> Unit): Modifier = composed {
  clickable(indication = null,
    interactionSource = remember { MutableInteractionSource() }) {
    onClick()
  }
}

fun Context.showMessage(message: String) {
  Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}