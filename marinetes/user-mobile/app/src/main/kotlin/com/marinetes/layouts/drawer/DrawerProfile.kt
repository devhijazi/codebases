package com.marinetes.layouts.drawer

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.marinetes.components.Avatar
import com.marinetes.theme.Colors
import com.marinetes.theme.MarinetesTheme

@Composable
fun DrawerProfile(
  fullName: String,
  avatarURL: String? = null,
) {
  val containerMargin = 20.dp

  val avatarSize = 100.dp

  Column(
    modifier = Modifier
      .fillMaxWidth()
      .padding(
        top = containerMargin,
        start = containerMargin,
        end = containerMargin,
      ),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Avatar(
      url = avatarURL,
      size = avatarSize
    )

    Text(
      text = fullName,
      modifier = Modifier.padding(top = 10.dp),
      style = MaterialTheme.typography.titleLarge.copy(color = Colors.GREEN_300)
    )
  }
}

@Composable
@Preview
private fun DrawerProfilePreview() {
  MarinetesTheme {
    DrawerProfile(
      fullName = "Isaque"
    )
  }
}