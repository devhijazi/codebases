package com.marinetes.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.layouts.DefaultLayout
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun NotificationsScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel
) {
  val containerPadding = 20.dp

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(all = containerPadding)
    ) {
      Text(
        text = "Notificações",
        style = MaterialTheme.typography.bodyLarge
      )
    }
  }
}