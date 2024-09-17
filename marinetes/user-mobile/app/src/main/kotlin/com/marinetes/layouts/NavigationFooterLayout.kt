package com.marinetes.layouts

import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.marinetes.navigation.NavigationActions
import com.marinetes.navigation.NavigationRoutes
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.MarinetesTheme
import com.marinetes.theme.shadow
import com.google.accompanist.navigation.animation.rememberAnimatedNavController

@Composable
fun NavigationFooterLayout(navController: NavHostController) {
  val navigationActions = NavigationActions(navController = navController)

  val currentBackStackEntryAsState by navController.currentBackStackEntryAsState()
  val currentRoute = currentBackStackEntryAsState?.destination?.route

  val containerShadowBlurRadius = 10.dp
  val containerShadowOffsetX = 10.dp

  val itemContainerWeight = 1F

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .shadow(
        color = Colors.GRAY_300,
        blurRadius = containerShadowBlurRadius,
        offsetX = containerShadowOffsetX,
      )
      .background(color = Colors.WHITE),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween
  ) {
    FooterItem(
      title = "Solicitar",
      icon = Icons.Household.Outlined.RoomService,
      isSelected = NavigationRoutes.SolicitationCreate == currentRoute,
      modifier = Modifier.weight(itemContainerWeight),
      onClick = { navigationActions.navigateToSolicitationCreate() }
    )

    FooterItem(
      title = "Agenda",
      icon = Icons.CommonActions.Outlined.CalendarMonth,
      isSelected = NavigationRoutes.ScheduleList == currentRoute,
      modifier = Modifier.weight(itemContainerWeight),
      onClick = { navigationActions.navigateToScheduleList() }
    )
  }
}

@OptIn(ExperimentalAnimationApi::class)
@Preview
@Composable
private fun NavigationFooterLayoutPreview() {
  val navController = rememberAnimatedNavController()

  MarinetesTheme {
    NavigationFooterLayout(navController = navController)
  }
}

@Composable
private fun FooterItem(
  title: String,
  icon: ImageVector,
  isSelected: Boolean,
  modifier: Modifier,
  onClick: () -> Unit,
) {
  val itemContainerPaddingHorizontal = 10.dp
  val itemContainerPaddingVertical = 10.dp

  val itemIconSize = 30.dp

  val itemIconColorNormal = Colors.GRAY_500
  val itemTextColorNormal = Colors.GRAY_500

  val itemIconColorSelected = Colors.GREEN_300
  val itemTextColorSelected = Colors.GREEN_300

  val iconColor = if (isSelected) itemIconColorSelected else itemIconColorNormal
  val textColor = if (isSelected) itemTextColorSelected else itemTextColorNormal

  Column(
    modifier = modifier
      .clickable { onClick() }
      .padding(
        horizontal = itemContainerPaddingHorizontal,
        vertical = itemContainerPaddingVertical
      ),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    Icon(
      imageVector = icon,
      modifier = Modifier.size(itemIconSize),
      tint = iconColor,
      contentDescription = null,
    )

    Text(
      text = title,
      style = MaterialTheme.typography.bodyMedium.copy(color = textColor)
    )
  }
}