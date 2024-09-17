package com.marinetes.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Avatar
import com.marinetes.components.Button
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.layouts.DefaultLayout
import com.marinetes.theme.Colors
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun SettingsProfileScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
) {
  val fullName = "User One"
  val avatarURL = "https://api.dicebear.com/5.x/initials/svg?seed=$fullName"

  val containerPadding = 20.dp

  val defaultGap = 15.dp

  val avatarSize = 100.dp

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel,
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(all = containerPadding),
      verticalArrangement = Arrangement.spacedBy(defaultGap)
    ) {
      Text(
        text = "Meu perfil",
        style = MaterialTheme.typography.bodyLarge
      )

      Divider(color = Colors.GRAY_200)

      Avatar(
        url = avatarURL,
        size = avatarSize,
        modifier = Modifier.align(alignment = Alignment.CenterHorizontally)
      )

      Input(
        label = "Nome completo",
        value = "Jhon Doe",
        error = null,
        placeholder = "teste",
        onValueChange = {}
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(defaultGap)
      ) {
        Input(
          type = InputType.CPF,
          label = "CPF",
          value = "12345678900",
          error = null,
          placeholder = "123.456.789-00",
          containerModifier = Modifier.weight(0.50F),
          onValueChange = {}
        )

        Input(
          type = InputType.TEXT,
          label = "RG",
          value = "1234567",
          error = null,
          placeholder = "1234567",
          containerModifier = Modifier.weight(0.50F),
          onValueChange = {}
        )
      }

      Input(
        type = InputType.PHONE,
        label = "Telefone",
        value = "12912345678",
        error = null,
        placeholder = "(12) 9 1234-5678",
        onValueChange = {}
      )

      Button(text = "Salvar")
    }
  }
}