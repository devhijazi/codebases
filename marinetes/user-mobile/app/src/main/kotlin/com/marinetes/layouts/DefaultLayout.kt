package com.marinetes.layouts

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.FabPosition
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material.Scaffold
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.marinetes.config.LayoutConfig
import com.marinetes.layouts.drawer.Drawer
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SolicitationViewModel
import kotlinx.coroutines.launch

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun DefaultLayout(
  arguments: Map<String, Any> = mapOf<String, Any>(),
  functions: MutableMap<String, (Any?) -> Unit> = mutableMapOf<String, (Any?) -> Unit>(),
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  solicitationViewModel: SolicitationViewModel? = null,
  surfaceModifer: Modifier = Modifier.fillMaxSize(),
  content: @Composable () -> Unit,
) {
  val scaffoldState = rememberScaffoldState()
  val coroutineScope = rememberCoroutineScope()

  val currentBackStackEntryAsState by navController.currentBackStackEntryAsState()
  val currentRoute = currentBackStackEntryAsState?.destination?.route

  val showDrawerHeader = LayoutConfig.routesWithDrawerHeader.contains(currentRoute)
  val showBackHeader = LayoutConfig.routesWithBackHeader.contains(currentRoute)
  val showSolicitationFooter = LayoutConfig.routesWithSolicitationFooter.contains(currentRoute)
  val showFloatingButton = LayoutConfig.routesWithFloatingButton.contains(currentRoute)
  val showNavigationFooter = LayoutConfig.routesWithNavigationFooter.contains(currentRoute)
  val showServiceChatFooter = LayoutConfig.routesWithServiceChatFooter.contains(currentRoute)

  fun onOpenDrawer() {
    coroutineScope.launch { scaffoldState.drawerState.open() }
  }

  fun onCloseDrawer() {
    coroutineScope.launch { scaffoldState.drawerState.close() }
  }

  Scaffold(
    scaffoldState = scaffoldState,
    topBar = {
      if (showDrawerHeader) {
        DrawerHeaderLayout(
          navController = navController,
          onOpenDrawer = { onOpenDrawer() }
        )
      }

      if (showBackHeader) {
        BackHeaderLayout(
          navController = navController,
          onGoBack = { functions.get("onGoBack")?.invoke(null) }
        )
      }
    },
    bottomBar = {
      if (showSolicitationFooter && solicitationViewModel != null) {
        SolicitationFooter(
          navController = navController,
          solicitationViewModel = solicitationViewModel
        )
      }

      if (showNavigationFooter) {
        NavigationFooterLayout(navController = navController)
      }

      if (showServiceChatFooter && arguments.isNotEmpty()) {
        ServiceChatFooterLayout(
          serviceId = arguments.get("serviceId") as String,
          chatId = arguments.get("chatId") as String,
        )
      }
    },
    drawerContent = {
      if (showDrawerHeader) {
        Drawer(
          navController = navController,
          authenticationViewModel = authenticationViewModel,
          onCloseDrawer = { onCloseDrawer() }
        )
      }
    },
    floatingActionButtonPosition = FabPosition.Center,
    floatingActionButton = {
      if (showSolicitationFooter && solicitationViewModel != null) {
        SolicitationFooterButton(
          solicitationViewModel = solicitationViewModel
        )
      }

      if (showFloatingButton) {
        FloatingButton(
          onClick = { functions.get("onClickFloatingButton")?.invoke(null) }
        )
      }
    },
  ) {
    Surface(
      modifier = surfaceModifer,
      color = MaterialTheme.colorScheme.background
    ) {
      content()
    }
  }
}
