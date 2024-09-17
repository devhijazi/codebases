package com.marinetes.screens

import android.content.Intent
import android.net.Uri
import androidx.activity.compose.BackHandler
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Text
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.config.MarinetesConfig
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun SettingsSupportScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
) {
  val context = LocalContext.current

  val navigationActions = NavigationActions(navController = navController)

  val containerPadding = 20.dp
  val containerGap = 15.dp

  val whatsappIconSize = 30.dp
  val whatsappIconColor = Colors.WHITE

  val whatsappTextPaddingStart = 5.dp
  val whatsappTextColor = Colors.WHITE

  fun onGoBack() {
    navigationActions.navigateToSettingsList()
  }

  BackHandler {
    onGoBack()
  }

  DefaultLayout(
    functions = mutableMapOf("onGoBack" to { onGoBack() }),
    navController = navController,
    authenticationViewModel = authenticationViewModel,
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(all = containerPadding),
      verticalArrangement = Arrangement.spacedBy(containerGap)
    ) {
      Text(
        text = "Ajuda",
        style = MaterialTheme.typography.bodyLarge
      )

      Text(
        text = "Estamos atendendo via Whatsapp",
        style = MaterialTheme.typography.bodySmall
      )

      Button(
        onClick = {
          context.startActivity(
            Intent(
              Intent.ACTION_VIEW,
              Uri.parse(MarinetesConfig.MARINETES_WHATSAPP_URL)
            )
          )
        }
      ) {
        Row(
          verticalAlignment = Alignment.CenterVertically
        ) {
          Icon(
            modifier = Modifier.size(whatsappIconSize),
            imageVector = Icons.Brands.Outlined.Whatsapp,
            contentDescription = null,
            tint = whatsappIconColor
          )

          Text(
            text = "Iniciar atendimento",
            modifier = Modifier.padding(start = whatsappTextPaddingStart),
            style = MaterialTheme.typography.bodyLarge.copy(color = whatsappTextColor)
          )
        }
      }

      Text(
        text = "Perguntas frequentes",
        style = MaterialTheme.typography.bodyLarge
      )

      FAQList()
    }
  }
}

@Composable
private fun FAQList() {
  Column(
    modifier = Modifier
      .fillMaxSize()
      .clip(shape = RoundedCornerShape(10.dp))
  ) {
    FAQItem(
      title = "Pergunta 1",
      description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora natus, molestias " +
        "doloremque quo, consequuntur necessitatibus sint, explicabo minus ad maiores aliquam sapiente " +
        "adipisci odio tenetur corrupti iure error. Adipisci, voluptatum."
    )

    Divider(color = Colors.GRAY_200)

    FAQItem(
      title = "Pergunta 2",
      description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora natus, molestias " +
        "doloremque quo, consequuntur necessitatibus sint, explicabo minus ad maiores aliquam sapiente " +
        "adipisci odio tenetur corrupti iure error. Adipisci, voluptatum."
    )

    Divider(color = Colors.GRAY_200)

    FAQItem(
      title = "Pergunta 3",
      description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora natus, molestias " +
        "doloremque quo, consequuntur necessitatibus sint, explicabo minus ad maiores aliquam sapiente " +
        "adipisci odio tenetur corrupti iure error. Adipisci, voluptatum."
    )

    Divider(color = Colors.GRAY_200)

    FAQItem(
      title = "Pergunta 4",
      description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora natus, molestias " +
        "doloremque quo, consequuntur necessitatibus sint, explicabo minus ad maiores aliquam sapiente " +
        "adipisci odio tenetur corrupti iure error. Adipisci, voluptatum."
    )
  }
}

@Composable
private fun FAQItem(
  title: String,
  description: String,
) {
  var expandedState by remember { mutableStateOf(false) }

  val containerBackgroundColor = Colors.GRAY_100
  val containerPaddingVertical = 15.dp
  val containerPaddingHorizontal = 20.dp
  val containerGap = 10.dp

  val titleTextColor = Colors.GRAY_400

  val iconSize = 30.dp
  val iconColor = Colors.GRAY_400

  Column(
    modifier = Modifier
      .fillMaxWidth()
      .animateContentSize(
        animationSpec = tween(
          durationMillis = 400,
          easing = LinearOutSlowInEasing
        )
      )
      .clickable { expandedState = !expandedState }
      .background(color = containerBackgroundColor)
      .padding(
        vertical = containerPaddingVertical,
        horizontal = containerPaddingHorizontal,
      ),
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Text(
        text = title,
        style = MaterialTheme.typography.bodyMedium.copy(
          fontWeight = FontWeight.Normal,
          color = titleTextColor
        )
      )

      Icon(
        modifier = Modifier.size(iconSize),
        imageVector = if (expandedState) Icons.UIActions.Outlined.ExpandLess else Icons.UIActions.Outlined.ExpandMore,
        contentDescription = null,
        tint = iconColor
      )
    }

    if (expandedState) {
      Text(
        text = description,
        style = MaterialTheme.typography.bodySmall
      )
    }
  }
}