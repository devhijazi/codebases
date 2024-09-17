package com.marinetes.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.layouts.DefaultLayout
import com.marinetes.theme.Colors
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun SettingsSecurityUpdateScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
) {
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
        text = "Dgite a senha nova",
        style = MaterialTheme.typography.bodySmall
      )

      Input(
        type = InputType.PASSWORD,
        label = "Nova senha",
        value = "123456789",
        error = null,
        placeholder = "Senha",
        onValueChange = {}
      )

      Input(
        type = InputType.PASSWORD,
        label = "Digite novamente",
        value = "123456789",
        error = null,
        placeholder = "Senha",
        onValueChange = {}
      )

      Button(
        text = "Atualizar senha",
        onClick = {}
      )
    }
  }
}