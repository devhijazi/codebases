package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.R
import com.marinetes.components.Button
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.utils.DeviceUtils
import com.marinetes.utils.Dimensions
import com.marinetes.utils.NotificationUtils
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SolicitationEvent
import com.marinetes.viewmodels.SolicitationViewModel

@Composable
fun ScheduleStatusScreen(
  scheduleId: String,
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  solicitationViewModel: SolicitationViewModel
) {
  val context = LocalContext.current

  val notificationUtils = NotificationUtils(context)
  val diaristWaitingConfirmationNotificationId = 1

  val navigationActions = NavigationActions(navController = navController)

  val authenticationState = authenticationViewModel.state.collectAsState().value
  val solicitationState = solicitationViewModel.state.collectAsState().value

  val dimensions = DeviceUtils.getCurrentDimension()

  val mainMargin = 20.dp

  val containerGap = 20.dp

  val logoSize = when (dimensions) {
    Dimensions.MOBILE_SMALL -> 120.dp
    else -> 180.dp
  }

  val textColor = Colors.GREEN_300

  fun onGoBack() {
    notificationUtils.clearNotificationById(diaristWaitingConfirmationNotificationId)

    navigationActions.navigateToScheduleList()
  }

  BackHandler {
    onGoBack()
  }

  LaunchedEffect(key1 = Unit) {
    solicitationViewModel.event.collect { event ->
      when (event) {
        is SolicitationEvent.ScheduleConfirmed -> {
          onGoBack()
        }

        else -> {}
      }
    }
  }

  DefaultLayout(
    functions = mutableMapOf("onGoBack" to { onGoBack() }),
    navController = navController,
    authenticationViewModel = authenticationViewModel,
    solicitationViewModel = solicitationViewModel
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(all = mainMargin),
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.spacedBy(containerGap)
    ) {
      Image(
        painter = painterResource(R.drawable.diarist_founded),
        modifier = Modifier.size(logoSize),
        contentDescription = "diarist_founded",
        contentScale = ContentScale.Fit
      )

      Text(
        text = "Atenção",
        style = MaterialTheme.typography.titleLarge.copy(
          color = textColor,
          fontWeight = FontWeight.Bold
        )
      )

      Text(
        text = "A diarista ${solicitationState.diarist?.fullName.toString()} solicitou o início do serviço.",
        style = MaterialTheme.typography.bodySmall.copy(
          color = textColor,
          textAlign = TextAlign.Center
        )
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(containerGap)
      ) {
        Button(
          text = "Negar",
          modifier = Modifier.weight(1F),
          textColor = Colors.GRAY_500,
          backgroundColor = Colors.GRAY_200,
          onClick = { onGoBack() }
        )

        Button(
          text = "Confirmar",
          modifier = Modifier.weight(1F),
          onClick = {
            solicitationViewModel.confirmSchedule(
              userId = authenticationState.user?.id.toString(),
              scheduleId = scheduleId
            )
          }
        )
      }

      Text(
        text = "Importante: Só clique em confirmar se a diarista estiver presente, caso o contrário negue a solicitação.",
        style = MaterialTheme.typography.bodySmall.copy(textAlign = TextAlign.Center)
      )

      Row(
        modifier = Modifier.clickable { navigationActions.navigateToSupport() },
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(containerGap / 2),
      ) {
        Icon(
          imageVector = Icons.Social.Outlined.SupportAgent,
          modifier = Modifier.size(25.dp),
          tint = Colors.GREEN_300,
          contentDescription = null,
        )

        Text(
          text = "Ajuda",
          style = MaterialTheme.typography.bodyMedium.copy(
            color = textColor,
            textDecoration = TextDecoration.Underline
          )
        )
      }
    }
  }
}