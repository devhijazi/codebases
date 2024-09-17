package com.marinetes.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun SettingsListScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val containerMargin = 20.dp
  val containerGap = 10.dp

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel,
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(containerMargin),
      verticalArrangement = Arrangement.spacedBy(containerGap)
    ) {
      Text(
        text = "Configurações",
        style = MaterialTheme.typography.bodyLarge
      )

      SettingsItem(
        title = "Meu perfil",
        icon = Icons.Social.Outlined.Person,
        onClick = { navigationActions.navigateToSettingsProfile() }
      )

      SettingsItem(
        title = "Transferências",
        icon = Icons.UIActions.Outlined.MoveUp,
        onClick = { navigationActions.navigateToSettingsTransferList() }
      )

      SettingsItem(
        title = "Chaves Pix",
        icon = Icons.UIActions.Outlined.Key,
        onClick = { navigationActions.navigateToSettingsPixKeyList() }
      )

      SettingsItem(
        title = "Ajuda",
        icon = Icons.Social.Outlined.SupportAgent,
        onClick = { navigationActions.navigateToSupport() }
      )

      SettingsItem(
        title = "Segurança",
        icon = Icons.CommonActions.Outlined.Lock,
        onClick = { navigationActions.navigateToSettingsSecurity() }
      )

      SettingsItem(
        title = "Políticas e Termos de Uso",
        icon = Icons.PrivacyAndSecurity.Outlined.VerifiedUser,
        isLast = true,
        onClick = { navigationActions.navigateToSettingsPolices() }
      )
    }
  }
}

@Composable
private fun SettingsItem(
  title: String,
  icon: ImageVector,
  isLast: Boolean = false,
  onClick: () -> Unit,
) {
  val containerGap = 10.dp

  val iconSize = 40.dp
  val backIconSize = 30.dp

  val iconColor = Colors.GREEN_300

  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .noRippleClickable { onClick() },
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween,
    ) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
          imageVector = icon,
          modifier = Modifier
            .size(iconSize)
            .padding(end = 10.dp),
          tint = iconColor,
          contentDescription = null
        )

        Text(
          text = title,
          style = MaterialTheme.typography.bodyMedium
        )
      }

      Icon(
        imageVector = Icons.UIActions.Outlined.ArrowForwardIos,
        modifier = Modifier.size(backIconSize),
        tint = iconColor,
        contentDescription = null
      )
    }

    if (!isLast) {
      Divider(color = Colors.GRAY_200)
    }
  }
}