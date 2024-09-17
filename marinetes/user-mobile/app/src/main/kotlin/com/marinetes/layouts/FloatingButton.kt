package com.marinetes.layouts

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons

@Composable
fun FloatingButton(
  onClick: () -> Unit = {}
) {
  FloatingActionButton(
    modifier = Modifier.size(70.dp),
    contentColor = Colors.WHITE,
    containerColor = Colors.GREEN_300,
    shape = RoundedCornerShape(100.dp),
    onClick = onClick,
  ) {
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.Center
    ) {
      Icon(
        imageVector = Icons.UIActions.Outlined.Add,
        modifier = Modifier.size(30.dp),
        tint = Colors.WHITE,
        contentDescription = null,
      )
    }
  }
}