package com.marinetes.layouts.drawer

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors

@Composable
fun DrawerQuickNavigationItem(
  title: String,
  icon: ImageVector,
  isSelected: Boolean,
  isDisabled: Boolean = false,
  modifier: Modifier,
  onClick: () -> Unit
) {
  val containerBorderRadius = 10.dp
  val containerPaddingVertical = 20.dp
  val containerShape = RoundedCornerShape(containerBorderRadius)

  val iconSize = 30.dp

  val containerColorNormal = Colors.GRAY_50
  val iconColorNormal = Colors.GREEN_300
  val textColorNormal = Colors.GREEN_300

  val containerColorDisabled = Colors.GRAY_200
  val iconColorDisabled = Colors.GREEN_300
  val textColorDisabled = Colors.GREEN_300

  val containerColorSelected = Colors.GREEN_300
  val iconColorSelected = Colors.WHITE
  val textColorSelected = Colors.WHITE

  val containerColor = when {
    isDisabled -> containerColorDisabled
    isSelected -> containerColorSelected
    else -> containerColorNormal
  }

  val iconColor = when {
    isDisabled -> iconColorDisabled
    isSelected -> iconColorSelected
    else -> iconColorNormal
  }

  val textColor = when {
    isDisabled -> textColorDisabled
    isSelected -> textColorSelected
    else -> textColorNormal
  }

  Column(
    modifier = modifier
      .clip(shape = containerShape)
      .clickable(enabled = !isDisabled) { onClick() }
      .background(color = containerColor, shape = containerShape)
      .padding(vertical = containerPaddingVertical),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    Icon(
      imageVector = icon,
      modifier = Modifier.size(iconSize),
      tint = iconColor,
      contentDescription = null,
    )

    Text(
      text = title,
      style = MaterialTheme.typography.bodyMedium.copy(color = textColor),
      maxLines = 1,
      modifier = Modifier.widthIn(0.dp, 60.dp),
      overflow = TextOverflow.Ellipsis
    )
  }
}