package com.marinetes.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.Input
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun SettingsSecurityValidationScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
) {
  val navigationActions = NavigationActions(navController = navController)

  var code by remember { mutableStateOf("") }

  val containerPadding = 20.dp
  val containerGap = 15.dp

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel,
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(all = containerPadding),
      verticalArrangement = Arrangement.spacedBy(containerGap)
    ) {
      Text(
        text = "Atualização de senha",
        style = MaterialTheme.typography.bodyLarge
      )

      Divider(color = Colors.GRAY_200)

      Text(
        text = "Insira o código enviado para o e-mail",
        style = MaterialTheme.typography.bodySmall
      )

      Input(
        length = 6,
        value = code,
        onValueChange = { code = it }
      )

      Button(
        text = "Validar código",
        onClick = {
          navigationActions.navigateToSettingsSecurityUpdate()
        }
      )
    }
  }
}