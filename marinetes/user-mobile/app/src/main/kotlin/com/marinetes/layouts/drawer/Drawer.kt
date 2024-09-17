package com.marinetes.layouts.drawer

import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.marinetes.theme.Colors
import com.marinetes.theme.MarinetesTheme
import com.marinetes.viewmodels.AuthenticationViewModel
import com.google.accompanist.navigation.animation.rememberAnimatedNavController

@Composable
fun Drawer(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  onCloseDrawer: () -> Unit
) {
  val authentication = authenticationViewModel.state.collectAsState().value
  val userState = authentication.user
  val walletState = authentication.userWallet

  val mainGap = 20.dp

  val containerColor = Colors.GRAY_100

  if (userState != null && walletState != null) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .background(color = containerColor)
        .verticalScroll(rememberScrollState()),
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.SpaceBetween,
    ) {
      Column {
        val avatarURL = "https://api.dicebear.com/5.x/initials/svg?seed=${userState.fullName}"

        DrawerCloseIcon(onCloseDrawer = onCloseDrawer)

        Column(
          modifier = Modifier.offset(x = 0.dp, y = -40.dp),
          verticalArrangement = Arrangement.spacedBy(mainGap)
        ) {
          DrawerProfile(
            fullName = userState.fullName,
            avatarURL = avatarURL
          )

          DrawerUserBalance(
            navController = navController,
            walletState = walletState,
            onCloseDrawer = onCloseDrawer
          )

          DrawerQuickNavigation(
            navController = navController,
            onCloseDrawer = onCloseDrawer
          )

          DrawerNavigation(
            navController = navController,
            authenticationViewModel = authenticationViewModel,
            onCloseDrawer = onCloseDrawer
          )
        }
      }

      DrawerWordmark()
    }
  }
}

@OptIn(ExperimentalAnimationApi::class)
@Preview
@Composable
private fun DrawerPreview() {
  val navController = rememberAnimatedNavController()

  val authenticationViewModel: AuthenticationViewModel = hiltViewModel()

  MarinetesTheme {
    Drawer(
      navController = navController,
      authenticationViewModel = authenticationViewModel,
      onCloseDrawer = {}
    )
  }
}