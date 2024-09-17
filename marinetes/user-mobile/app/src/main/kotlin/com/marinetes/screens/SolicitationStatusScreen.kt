package com.marinetes.screens

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Looper
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
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
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.R
import com.marinetes.components.Badge
import com.marinetes.components.BeatLoader
import com.marinetes.components.Button
import com.marinetes.components.IconWithText
import com.marinetes.components.Shimmer
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.utils.CurrencyUtils
import com.marinetes.utils.DeviceUtils
import com.marinetes.utils.Dimensions
import com.marinetes.utils.NotificationUtils
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SolicitationEvent
import com.marinetes.viewmodels.SolicitationStatus
import com.marinetes.viewmodels.SolicitationViewModel
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone

@SuppressLint("MissingPermission")
@Composable
fun SolicitationStatusScreen(
  budgetId: String,
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  solicitationViewModel: SolicitationViewModel
) {
  val context = LocalContext.current

  val notificationUtils = NotificationUtils(context)
  val searchingDiaristsNotificationId = 1
  val diaristFoundedNotificationId = 2

  val navigationActions = NavigationActions(navController = navController)

  val authenticationState = authenticationViewModel.state.collectAsState().value
  val solicitationState = solicitationViewModel.state.collectAsState().value

  val dimensions = DeviceUtils.getCurrentDimension()

  val mainMargin = 20.dp

  val containerGap = 20.dp

  val textColor = Colors.GREEN_300

  val iconSize = 20.dp
  val iconColor = Colors.GREEN_300

  val logoSize = when (dimensions) {
    Dimensions.MOBILE_SMALL -> 120.dp
    else -> 180.dp
  }

  fun onGoBack() {
    solicitationViewModel.cancelSolicitation(
      userId = authenticationState.user?.id.toString(),
      emitEvent = false
    )

    solicitationViewModel.resetState()

    notificationUtils.clearAllNotifications()

    navigationActions.navigateToSolicitationCreate()
  }

  BackHandler {
    onGoBack()
  }

  LaunchedEffect(key1 = Unit) {
    solicitationViewModel.connectCallerWebsocket(userId = authenticationState.user?.id.toString())
  }

  LaunchedEffect(key1 = solicitationState.callerWebsocket) {
    solicitationViewModel.listenerSolicitationsEvents()
  }

  LaunchedEffect(key1 = solicitationState.callerWebsocket) {
    if (solicitationState.callerWebsocket == null) {
      notificationUtils.sendNotification(
        id = searchingDiaristsNotificationId,
        title = "Procurando a Diarista ideal...",
        description = "Por favor, aguarde.",
        isClearble = false,
        isSilent = true
      )
    }
  }

  LaunchedEffect(key1 = solicitationState) {
    solicitationViewModel.event.collect { event ->
      when (event) {
        is SolicitationEvent.SolicitationAccepted -> {
          notificationUtils.clearNotificationById(searchingDiaristsNotificationId)

          notificationUtils.sendNotification(
            id = diaristFoundedNotificationId,
            title = "Diarista encontrada!",
            description = "A diarista ${event.diarist.fullName} aceitou sua solicitação."
          )

          Handler(Looper.getMainLooper()).postDelayed({
            solicitationViewModel.resetState()

            authenticationViewModel.retriveUserWallet()

            notificationUtils.clearNotificationById(diaristFoundedNotificationId)

            navigationActions.navigateToScheduleList()
          }, 6000)
        }

        is SolicitationEvent.CancelSolicitationDiarist -> {
          onGoBack()
        }

        is SolicitationEvent.SearchingDiarist -> {
          notificationUtils.sendNotification(
            id = searchingDiaristsNotificationId,
            title = "Procurando a Diarista ideal...",
            description = "Por favor, aguarde.",
            isClearble = false,
            isSilent = true
          )
        }

        is SolicitationEvent.CancelSolicitationDiaristError -> {
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
    if (solicitationState.budget != null) {
      Column(
        modifier = Modifier
          .fillMaxSize()
          .verticalScroll(rememberScrollState())
          .padding(all = mainMargin),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(containerGap)
      ) {
        if (solicitationState.status == SolicitationStatus.CONFIRMING_CREATION) {
          Text(
            text = "Confirme a sua solicitação",
            style = MaterialTheme.typography.bodyLarge
          )
        }

        if (solicitationState.status == SolicitationStatus.SEARCHING) {
          Image(
            painter = painterResource(R.drawable.searching_diarist),
            modifier = Modifier.size(logoSize),
            contentDescription = "searching_diarist",
            contentScale = ContentScale.Fit
          )

          Text(
            text = "Procurando a diarista ideal.\nNão feche o APP!",
            style = MaterialTheme.typography.bodyLarge.copy(
              color = textColor,
              textAlign = TextAlign.Center
            )
          )

          BeatLoader()
        }

        if (solicitationState.status == SolicitationStatus.ACCEPTED && solicitationState.diarist != null) {
          Column(
            horizontalAlignment = Alignment.CenterHorizontally
          ) {
            Icon(
              modifier = Modifier.size(120.dp),
              imageVector = Icons.UIActions.Outlined.CheckCircleOutline,
              contentDescription = null,
              tint = iconColor
            )

            Text(
              text = "Solicitação aceita!",
              style = MaterialTheme.typography.titleLarge.copy(
                color = textColor,
                fontWeight = FontWeight.Bold
              )
            )

            Text(
              text = "A diarista ${solicitationState.diarist.fullName} aceitou a solicitação.",
              style = MaterialTheme.typography.bodySmall.copy(
                color = textColor,
                textAlign = TextAlign.Center
              )
            )
          }
        }

        Row(
          horizontalArrangement = Arrangement.spacedBy(containerGap / 2)
        ) {
          for (service in solicitationState.selectedServices) {
            val icon = when (service.icon) {
              "maps-cleaning-services" -> Icons.Maps.Outlined.CleaningServices
              "household-cleaning-services" -> Icons.Household.Outlined.Flatware
              "maps-local-laundry-service" -> Icons.Maps.Outlined.LocalLaundryService
              else -> Icons.CommonActions.Outlined.Help
            }

            IconWithText(
              icon = icon,
              selected = true,
              isDisabled = true
            )
          }
        }

        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          Column(
            modifier = Modifier.weight(1F),
            horizontalAlignment = Alignment.Start
          ) {
            Column {
              for (service in solicitationState.selectedServices) {
                val title = when (service.title) {
                  "cleaning" -> "• Faxina"
                  "cook" -> "• Cozinhar"
                  "wash-clothes" -> "• Lavar roupa"
                  else -> ""
                }

                Text(
                  text = title,
                  style = MaterialTheme.typography.bodyMedium.copy(
                    fontWeight = FontWeight.Normal,
                    color = textColor
                  )
                )
              }
            }

            Text(
              text = "• Serviço até ${solicitationState.budget?.estimatedTimeInHours}h",
              style = MaterialTheme.typography.bodyMedium.copy(
                fontWeight = FontWeight.SemiBold,
                color = textColor
              )
            )

            if (solicitationState.status != SolicitationStatus.ACCEPTED) {
              Spacer(modifier = Modifier.height(containerGap))

              Badge(
                borderRadius = 5.dp,
                padding = PaddingValues(10.dp),
                text = CurrencyUtils.convertQuantityToLocalCurrency(
                  CurrencyUtils.convertUnitToDouble(
                    solicitationState.estimatedValue
                  )
                ),
                textColor = Colors.WHITE,
                backgroundColor = Colors.GREEN_300
              )
            }
          }

          Column(
            modifier = Modifier.weight(1F),
            horizontalAlignment = Alignment.End
          ) {
            val isoFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())

            isoFormat.timeZone = TimeZone.getTimeZone("UTC")

            val date = isoFormat.parse(solicitationState.budget.date)
            val outputFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
            val formattedDate = outputFormat.format(date)

            Text(
              text = formattedDate,
              style = MaterialTheme.typography.bodyMedium.copy(
                fontWeight = FontWeight.SemiBold
              )
            )

            Row(
              verticalAlignment = Alignment.CenterVertically
            ) {
              Icon(
                modifier = Modifier.size(iconSize),
                imageVector = Icons.UIActions.Outlined.Home,
                contentDescription = null,
                tint = iconColor
              )

              Text(
                text = solicitationState.address?.title.toString(),
                style = MaterialTheme.typography.bodyLarge.copy(
                  fontWeight = FontWeight.Normal,
                  color = iconColor
                )
              )
            }
          }
        }

        Column(
          horizontalAlignment = Alignment.CenterHorizontally,
          verticalArrangement = Arrangement.spacedBy(containerGap / 2),
        ) {
          if (solicitationState.status == SolicitationStatus.CONFIRMING_CREATION) {
            Button(
              text = "Solicitar",
              onClick = {
                solicitationViewModel.createSolicitation(
                  userId = authenticationState.user?.id.toString(),
                  budgetId = budgetId
                )
              }
            )
          }

          if (solicitationState.status == SolicitationStatus.ACCEPTED) {
            Text(
              text = "Você pode conferir detalhes do serviço em \"Agenda\"",
              style = MaterialTheme.typography.bodySmall.copy(
                textAlign = TextAlign.Center
              )
            )

            Button(
              text = "Agenda",
              onClick = {
                solicitationViewModel.resetState()

                navigationActions.navigateToScheduleList()
              }
            )
          }

          if (solicitationState.status != SolicitationStatus.ACCEPTED) {
            Button(
              text = "Cancelar",
              textColor = Colors.GRAY_500,
              backgroundColor = Colors.GRAY_200,
              onClick = {
                solicitationViewModel.cancelSolicitation(
                  userId = authenticationState.user?.id.toString()
                )
              }
            )
          }
        }
      }
    } else {
      Loader()
    }
  }
}

@Composable
private fun Loader() {
  val containerMargin = 20.dp
  val containerGap = 10.dp

  Column(
    modifier = Modifier.padding(containerMargin),
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Shimmer(
      height = 130.dp,
    )

    Shimmer(
      width = 100.dp,
      height = 25.dp,
    )

    Shimmer(
      height = 60.dp,
    )

    Shimmer(
      width = 100.dp,
      height = 25.dp,
    )

    Shimmer(
      height = 100.dp,
    )

    Shimmer(
      width = 100.dp,
      height = 25.dp,
    )

    Shimmer(
      height = 100.dp,
    )
  }
}