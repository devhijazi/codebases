package com.marinetes.layouts.drawer

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.marinetes.navigation.NavigationActions
import com.marinetes.navigation.NavigationRoutes
import com.marinetes.theme.Icons
import com.marinetes.viewmodels.AuthenticationEvent
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun DrawerNavigation(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  onCloseDrawer: () -> Unit,
) {
  val navigationActions = NavigationActions(navController = navController)
  val context = LocalContext.current

  val currentBackStackEntryAsState by navController.currentBackStackEntryAsState()
  val currentRoute = currentBackStackEntryAsState?.destination?.route

  val containerHorizontalMargin = 20.dp
  val containerGap = 10.dp

  LaunchedEffect(key1 = context) {
    authenticationViewModel.event.collect { event ->
      when (event) {
        is AuthenticationEvent.UserLoggedOut -> {
          navigationActions.navigateToLogin()

          onCloseDrawer()
        }

        else -> {}
      }
    }
  }

  Column(
    modifier = Modifier
      .fillMaxHeight()
      .padding(horizontal = containerHorizontalMargin),
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    DrawerNavigationItem(
      title = "Meus locais",
      icon = Icons.UIActions.Outlined.Home,
      isSelected = currentRoute == NavigationRoutes.AddressList,
      onClick = {
        navigationActions.navigateToAddressList()

        onCloseDrawer()
      }
    )

    DrawerNavigationItem(
      title = "Depósitos",
      icon = Icons.BusinessAndPayments.Outlined.AccountBalance,
      isSelected = currentRoute == NavigationRoutes.DepositList,
      onClick = {
        navigationActions.navigateToDepositList()

        onCloseDrawer()
      }
    )

    DrawerNavigationItem(
      title = "Sair",
      icon = Icons.UIActions.Outlined.Logout,
      isSelected = false,
      isLast = true,
      onClick = {
        authenticationViewModel.signOut()
      }
    )
  }
}