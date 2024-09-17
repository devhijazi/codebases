package com.marinetes.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.marinetes.theme.MarinetesTheme

@Composable
fun Avatar(
  url: String? = null,
  size: Dp = 150.dp,
  borderEnabled: Boolean = false,
  borderSize: Dp = 1.dp,
  borderColor: Color = Colors.WHITE,
  modifier: Modifier = Modifier,
  onClick: () -> Unit = {}
) {
  Image(
    url = url,
    modifier = if (borderEnabled) modifier
      .size(size)
      .border(
        border = BorderStroke(borderSize, borderColor),
        shape = CircleShape
      )
      .clip(shape = CircleShape)
    else modifier
      .size(size)
      .clip(shape = CircleShape),
    onClick = onClick,
  )
}

@Preview
@Composable
private fun AvatarPreview() {
  MarinetesTheme {
    Avatar()
  }
}
