package com.marinetes.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.MarinetesTheme

@Composable
fun IconButton(
  icon: ImageVector,
  iconSize: Dp = 30.dp,
  iconColor: Color = Colors.WHITE,
  containerModifier: Modifier = Modifier,
  containerSize: Dp = 55.dp,
  containerBackgroundColor: Color = Colors.GREEN_300,
  containerBorderRadius: Dp = 10.dp,
  isDisabled: Boolean = false,
  onClick: () -> Unit? = { null }
) {
  Column(
    modifier = containerModifier
      .size(containerSize)
      .clip(shape = RoundedCornerShape(containerBorderRadius))
      .clickable { onClick() }
      .background(color = containerBackgroundColor),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
  ) {
    Icon(
      imageVector = icon,
      modifier = Modifier.size(iconSize),
      tint = iconColor,
      contentDescription = null
    )
  }
}

@Preview
@Composable
fun IconButtonPreview() {
  MarinetesTheme {
    IconButton(icon = Icons.Maps.Outlined.CleaningServices)
  }
}