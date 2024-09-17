package com.marinetes.layouts.drawer

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.marinetes.navigation.NavigationActions
import com.marinetes.navigation.NavigationRoutes
import com.marinetes.theme.Icons

@Composable
fun DrawerQuickNavigation(
  navController: NavHostController,
  onCloseDrawer: () -> Unit
) {
  val navigationActions = NavigationActions(navController = navController)

  val currentBackStackEntryAsState by navController.currentBackStackEntryAsState()
  val currentRoute = currentBackStackEntryAsState?.destination?.route

  val containerHorizontalMargin = 20.dp
  val containerGap = 10.dp

  val itemContainerWeight = 1F

  Row(
    modifier = Modifier.fillMaxWidth().padding(horizontal = containerHorizontalMargin),
    horizontalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    DrawerQuickNavigationItem(
      title = "Solicitar",
      icon = Icons.Household.Outlined.RoomService,
      isSelected = NavigationRoutes.SolicitationCreate == currentRoute,
      modifier = Modifier.weight(itemContainerWeight),
      onClick = {
        if (currentRoute != NavigationRoutes.SolicitationCreate) {
          navigationActions.navigateToSolicitationCreate()

          onCloseDrawer()
        }
      }
    )

    DrawerQuickNavigationItem(
      title = "Agenda",
      icon = Icons.CommonActions.Outlined.CalendarMonth,
      isSelected = NavigationRoutes.ScheduleList == currentRoute,
      modifier = Modifier.weight(itemContainerWeight),
      onClick = {
        if (currentRoute != NavigationRoutes.ScheduleList) {
          navigationActions.navigateToScheduleList()

          onCloseDrawer()
        }
      }
    )

    DrawerQuickNavigationItem(
      title = "Ajustes",
      icon = Icons.UIActions.Outlined.Settings,
      isSelected = listOf<String>(
        NavigationRoutes.SettingsList,
        NavigationRoutes.SettingsPolices,
        NavigationRoutes.SettingsProfile,
        NavigationRoutes.SettingsPixKeyCreate,
        NavigationRoutes.SettingsPixKeyEdit,
        NavigationRoutes.SettingsPixKeyList,
        NavigationRoutes.SettingsSecurity
      ).contains(currentRoute),
      modifier = Modifier.weight(itemContainerWeight),
      onClick = {
        if (currentRoute != NavigationRoutes.SettingsList) {
          navigationActions.navigateToSettingsList()

          onCloseDrawer()
        }
      }
    )
  }
}