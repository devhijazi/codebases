package com.marinetes.layouts.drawer

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons

@Composable
fun DrawerCloseIcon(onCloseDrawer: () -> Unit) {
  val containerMargin = 20.dp

  val iconSize = 30.dp
  val iconColor = Colors.GREEN_300

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .padding(
        top = containerMargin,
        end = containerMargin,
      ),
    horizontalArrangement = Arrangement.End,
  ) {
    IconButton(onClick = { onCloseDrawer() }) {
      Icon(
        imageVector = Icons.UIActions.Outlined.Close,
        modifier = Modifier.size(iconSize),
        tint = iconColor,
        contentDescription = null,
      )
    }
  }
}