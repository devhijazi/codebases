package com.marinetes.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable

@Composable
fun MarinetesTheme(content: @Composable () -> Unit) {
  MaterialTheme(
    colorScheme = ColorScheme,
    typography = Typographies,
    content = content
  )
}