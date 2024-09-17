package com.marinetes.layouts.drawer

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.marinetes.theme.noRippleClickable

@Composable
fun DrawerNavigationItem(
  title: String,
  icon: ImageVector,
  isSelected: Boolean,
  isLast: Boolean = false,
  onClick: () -> Unit
) {
  val containerGap = 10.dp

  val iconSize = 40.dp

  val iconColor = Colors.GREEN_300
  val textColor = Colors.GREEN_300

  Column(
    modifier = Modifier
      .fillMaxWidth()
      .noRippleClickable { onClick() },
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween,
    ) {
      Row(
        verticalAlignment = Alignment.CenterVertically
      ) {
        Icon(
          imageVector = icon,
          modifier = Modifier
            .size(iconSize)
            .padding(end = 10.dp),
          tint = iconColor,
          contentDescription = null,
        )

        Text(
          text = title,
          style = MaterialTheme.typography.bodyLarge.copy(
            fontWeight = FontWeight.Normal,
            color = textColor
          )
        )
      }

      if (isSelected) {
        Box(
          modifier = Modifier
            .size(15.dp)
            .background(
              color = Colors.GRAY_200,
              shape = RoundedCornerShape(50.dp)
            )
        )
      }
    }

    if (!isLast) {
      Divider(color = Colors.GRAY_200)
    }
  }
}