package com.marinetes.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.MarinetesTheme

@Composable
fun Button(
  text: String,
  modifier: Modifier = Modifier,
  backgroundColor: Color = Colors.GREEN_300,
  borderRadius: Dp = 10.dp,
  padding: PaddingValues = PaddingValues(all = 15.dp),
  textColor: Color = Colors.WHITE,
  textStyle: TextStyle = MaterialTheme.typography.bodyLarge,
  textFontSize: TextUnit = 16.sp,
  loadingModifier: Modifier = Modifier,
  loadingColor: Color = Colors.WHITE,
  loadingStrokeWidth: Dp = 3.dp,
  isLoading: Boolean = false,
  isDisabled: Boolean = false,
  onClick: () -> Any? = { null }
) {
  Row(
    modifier = modifier
      .fillMaxWidth()
      .clip(shape = RoundedCornerShape(borderRadius))
      .clickable(enabled = !isDisabled) { onClick() }
      .background(color = backgroundColor)
      .padding(padding),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.Center,
  ) {
    if (isLoading) {
      CircularProgressIndicator(
        modifier = loadingModifier.size(30.dp),
        color = loadingColor,
        strokeWidth = loadingStrokeWidth
      )
    } else {
      Text(
        text = text,
        style = textStyle.copy(color = textColor, fontSize = textFontSize),
      )
    }
  }
}

@Composable
fun Button(
  modifier: Modifier = Modifier,
  backgroundColor: Color = Colors.GREEN_300,
  borderRadius: Dp = 10.dp,
  padding: PaddingValues = PaddingValues(all = 15.dp),
  loadingModifier: Modifier = Modifier,
  loadingColor: Color = Colors.WHITE,
  loadingStrokeWidth: Dp = 3.dp,
  isLoading: Boolean = false,
  isDisabled: Boolean = false,
  onClick: () -> Unit = { null },
  content: @Composable ColumnScope.() -> Unit,
) {
  Column(
    modifier = modifier
      .fillMaxWidth()
      .clip(shape = RoundedCornerShape(borderRadius))
      .clickable(enabled = !isDisabled) { onClick() }
      .background(color = backgroundColor)
      .padding(padding),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    if (isLoading) {
      CircularProgressIndicator(
        modifier = loadingModifier.size(30.dp),
        color = loadingColor,
        strokeWidth = loadingStrokeWidth
      )
    } else {
      content()
    }
  }
}

@Preview
@Composable
private fun ButtonPreview() {
  MarinetesTheme {
    Column(
      modifier = Modifier
        .background(color = Colors.WHITE)
        .padding(10.dp),
      verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      Button(text = "Salvar")

      Button(text = "Salvar", isLoading = true)

      Button {
        Icon(
          modifier = Modifier.size(25.dp),
          imageVector = Icons.UIActions.Outlined.ArrowForwardIos,
          contentDescription = null,
          tint = Colors.WHITE
        )
      }
    }
  }
}