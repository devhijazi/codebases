package com.marinetes.layouts.drawer

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.marinetes.R
import com.marinetes.theme.Colors

@Composable
fun DrawerWordmark() {
  val containerMargin = 20.dp

  Column(
    modifier = Modifier.fillMaxWidth().padding(containerMargin),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    Text(
      text = "Powered by",
      style = MaterialTheme.typography.bodySmall.copy(color = Colors.GREEN_300)
    )

    Image(
      painter = painterResource(R.drawable.wordmark),
      modifier = Modifier.width(120.dp),
      contentDescription = "wordmark"
    )
  }
}