package com.marinetes.components

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.size
import androidx.compose.material.Text
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.marinetes.theme.Colors

@Composable
fun IconWithText(
  icon: ImageVector,
  text: String? = null,
  selected: Boolean,
  buttonModifier: Modifier = Modifier,
  buttonSize: Dp = 80.dp,
  buttonPadding: PaddingValues = PaddingValues(all = 10.dp),
  buttonIconSize: Dp = 30.dp,
  buttonFontSize: TextUnit = 12.sp,
  isDisabled :Boolean = false,
  onClick: () -> Unit = { null }
) {
  val buttonSelectedBackgroundColor = Colors.GREEN_300
  val buttonNormalBackgroundColor = Colors.INPUT
  val buttonBackgroundColor =
    if (selected) buttonSelectedBackgroundColor else buttonNormalBackgroundColor

  val buttonIconSelectedColor = Colors.WHITE
  val buttonIconNormalColor = Colors.GREEN_300
  val buttonIconColor = if (selected) buttonIconSelectedColor else buttonIconNormalColor

  val buttonTextSelectedColor = Colors.WHITE
  val buttonTextNormalColor = Colors.GREEN_300
  val buttonTextColor = if (selected) buttonTextSelectedColor else buttonTextNormalColor

  Button(
    modifier = buttonModifier.size(buttonSize),
    backgroundColor = buttonBackgroundColor,
    padding = buttonPadding,
    isDisabled = isDisabled,
    onClick = { onClick() }
  ) {
    Icon(
      modifier = Modifier.size(buttonIconSize),
      imageVector = icon,
      contentDescription = null,
      tint = buttonIconColor
    )

    if (text != null) {
      Text(
        text = text,
        style = MaterialTheme.typography.bodySmall.copy(
          fontSize = buttonFontSize,
          color = buttonTextColor
        )
      )
    }
  }
}