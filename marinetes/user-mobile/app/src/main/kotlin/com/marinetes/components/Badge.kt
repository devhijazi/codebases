package com.marinetes.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.marinetes.theme.Colors
import com.marinetes.theme.MarinetesTheme

@Composable
fun Badge(
  text: String,
  textSize: TextUnit = 12.sp,
  textColor: Color = Colors.GRAY_600,
  backgroundColor: Color = Colors.GRAY_200,
  borderRadius: Dp = 10.dp,
  padding: PaddingValues = PaddingValues(horizontal = 8.dp, vertical = 3.dp),
) {
  Row(
    modifier = Modifier
      .background(
        color = backgroundColor,
        shape = RoundedCornerShape(borderRadius)
      )
      .padding(padding),
  ) {
    Text(
      text = text,
      style = MaterialTheme.typography.titleLarge.copy(
        fontSize = textSize,
        color = textColor,
      )
    )
  }
}

@Preview
@Composable
private fun BadgePreview() {
  MarinetesTheme {
    Badge(text = "R$ 100,00")
  }
}