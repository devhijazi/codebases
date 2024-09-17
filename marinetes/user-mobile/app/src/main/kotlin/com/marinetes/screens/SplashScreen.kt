package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.R
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.utils.DeviceUtils
import com.marinetes.utils.Dimensions
import com.marinetes.viewmodels.AuthenticationEvent
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SolicitationEvent
import com.marinetes.viewmodels.SolicitationViewModel

@Composable
fun SplashScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  solicitationViewModel: SolicitationViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val dimensions = DeviceUtils.getCurrentDimension()

  BackHandler {}

  LaunchedEffect(key1 = Unit) {
    Thread.sleep(3000)

    if (authenticationViewModel.hasToken()) {
      authenticationViewModel.retriveUser()
    } else {
      navigationActions.navigateToLogin()
    }
  }

  LaunchedEffect(key1 = Unit) {
    authenticationViewModel.event.collect { event ->
      when (event) {
        is AuthenticationEvent.UserFetched -> {
          solicitationViewModel.hasUserOnQueue(userId = event.userId)
        }

        is AuthenticationEvent.Error -> navigationActions.navigateToLogin()

        else -> {}
      }
    }
  }

  LaunchedEffect(key1 = Unit) {
    solicitationViewModel.event.collect { event ->
      when (event) {
        is SolicitationEvent.SolicitationFounded -> {
          navigationActions.navigateToSolicitationStatus(budgetId = event.budgetId)
        }

        is SolicitationEvent.SolicitationNotFound -> {
          navigationActions.navigateToSolicitationCreate()
        }

        else -> {}
      }
    }
  }

  Column(
    modifier = Modifier
      .fillMaxSize()
      .background(color = Colors.GREEN_400),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
  ) {
    val logoSize = when (dimensions) {
      Dimensions.MOBILE_SMALL -> 120.dp
      else -> 180.dp
    }

    Image(
      painter = painterResource(R.drawable.logo_white),
      modifier = Modifier.size(logoSize),
      contentDescription = "logo",
      contentScale = ContentScale.Fit
    )
  }
}