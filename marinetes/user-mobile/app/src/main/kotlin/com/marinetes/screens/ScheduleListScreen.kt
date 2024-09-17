package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.pullrefresh.PullRefreshIndicator
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material.pullrefresh.rememberPullRefreshState
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Avatar
import com.marinetes.components.Badge
import com.marinetes.components.Button
import com.marinetes.components.IconButton
import com.marinetes.components.Shimmer
import com.marinetes.layouts.DefaultLayout
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleCanceledRequest
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleDonedRequest
import com.marinetes.network.serializations.marinetes.user.api.Schedule
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.utils.CurrencyUtils
import com.marinetes.viewmodels.AuthenticationState
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.ScheduleListEvent
import com.marinetes.viewmodels.ScheduleListState
import com.marinetes.viewmodels.ScheduleListViewModel
import java.text.SimpleDateFormat
import java.util.*

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun ScheduleListScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  scheduleListViewModel: ScheduleListViewModel
) {
  val authenticationState = authenticationViewModel.state.collectAsState().value
  val scheduleListState = scheduleListViewModel.state.collectAsState().value

  val pullRefreshState = rememberPullRefreshState(
    refreshing = scheduleListState.isGetUserSchedulesListLoading,
    onRefresh = { scheduleListViewModel.getUserSchedules(showLoading = true) }
  )

  val containerPadding = 20.dp

  BackHandler {}

  LaunchedEffect(key1 = Unit) {
    scheduleListViewModel.getUserSchedules()
  }

  LaunchedEffect(key1 = scheduleListState) {
    scheduleListViewModel.event.collect { event ->
      when (event) {
        is ScheduleListEvent.SchedulesFetched -> {
          authenticationViewModel.retriveUserWallet()
        }
      }
    }
  }

  DisposableEffect(key1 = navController) {
    navController.addOnDestinationChangedListener { _, _, _ ->
      scheduleListViewModel.resetState()
    }

    onDispose {
      navController.removeOnDestinationChangedListener { _, _, _ ->
        scheduleListViewModel.resetState()
      }
    }
  }

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel
  ) {
    val isLoading = scheduleListState.isGetUserSchedulesListLoading
    val isEmpty = scheduleListState.schedules.isEmpty()

    Column(
      modifier = if (isEmpty) Modifier
        .fillMaxSize()
        .padding(all = containerPadding)
      else Modifier
        .fillMaxSize()
        .pullRefresh(pullRefreshState)
        .verticalScroll(rememberScrollState())
        .padding(
          start = containerPadding,
          end = containerPadding,
          top = containerPadding,
          bottom = containerPadding * 2 + containerPadding
        ),
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = if (isEmpty) Arrangement.Center else Arrangement.Top
    ) {
      if (isLoading) {
        SchedulesLoader()
      } else if (isEmpty) {
        SchedulesEmpty()
      } else {
        SchedulesList(
          authenticationState = authenticationState,
          scheduleListState = scheduleListState,
          scheduleListViewModel = scheduleListViewModel,
        )

        PullRefreshIndicator(
          refreshing = isLoading,
          state = pullRefreshState
        )
      }
    }
  }
}

@Composable
private fun SchedulesLoader() {
  val containerGap = 20.dp

  Column(
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Shimmer(
      width = 100.dp,
      height = 25.dp,
    )

    repeat(12) {
      Shimmer(
        height = 100.dp,
      )
    }
  }
}

@Composable
private fun SchedulesEmpty() {
  val iconSize = 80.dp
  val iconColor = Colors.GREEN_400

  Column(
    modifier = Modifier.fillMaxSize(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
  ) {
    Icon(
      modifier = Modifier.size(iconSize),
      imageVector = Icons.CommonActions.Outlined.CalendarMonth,
      contentDescription = null,
      tint = iconColor
    )

    Text(
      text = "Nenhum agendamento\nencontrado!",
      style = MaterialTheme.typography.titleLarge.copy(textAlign = TextAlign.Center)
    )
  }
}

@Composable
private fun SchedulesList(
  authenticationState: AuthenticationState,
  scheduleListState: ScheduleListState,
  scheduleListViewModel: ScheduleListViewModel
) {
  val mainGap = 20.dp

  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Text(
      text = "Agendamentos",
      style = MaterialTheme.typography.bodyLarge
    )

    Column(
      modifier = Modifier.fillMaxSize(),
      verticalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      for (schedule in scheduleListState.schedules) {
        ScheduleCard(
          schedule = schedule,
          authenticationState = authenticationState,
          scheduleListViewModel = scheduleListViewModel
        )
      }
    }
  }
}

@Composable
private fun ScheduleCard(
  schedule: Schedule,
  authenticationState: AuthenticationState,
  scheduleListViewModel: ScheduleListViewModel
) {
  val isoFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())

  isoFormat.timeZone = TimeZone.getTimeZone("UTC")

  val date = isoFormat.parse(schedule.date)
  val outputFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
  val formattedDate = outputFormat.format(date)

  val mainGap = 10.dp

  val cardPadding = 20.dp
  val cardBorderRadius = 10.dp
  val cardBackgroundColor = Colors.WHITE

  val avatarSize = 35.dp

  val iconSize = 20.dp
  val iconContainerSize = 35.dp

  Column(
    modifier = Modifier
      .fillMaxSize()
      .clip(shape = RoundedCornerShape(cardBorderRadius))
      .background(color = cardBackgroundColor, shape = RoundedCornerShape(cardBorderRadius))
      .padding(cardPadding),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween,
    ) {
      Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(mainGap / 2),
      ) {
        Icon(
          imageVector = Icons.UIActions.Outlined.Home,
          modifier = Modifier.size(25.dp),
          tint = Colors.GREEN_300,
          contentDescription = null,
        )

        Text(
          text = schedule.address.title,
          style = MaterialTheme.typography.bodyMedium
        )
      }

      Text(
        text = formattedDate,
        style = MaterialTheme.typography.bodySmall
      )
    }

    Divider(color = Colors.GRAY_300)

    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween,
    ) {
      Column(
        modifier = Modifier.weight(1F),
        horizontalAlignment = Alignment.Start,
        verticalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        Row(
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.spacedBy(mainGap / 2),
        ) {
          Avatar(
            url = "https://api.dicebear.com/5.x/initials/svg?seed=${schedule.diarist?.fullName.toString()}",
            size = avatarSize
          )

          Text(
            text = schedule.diarist?.fullName.toString(),
            style = MaterialTheme.typography.bodySmall
          )
        }

        when (schedule.status) {
          "pending" -> {
            Text(
              text = "Com o APP aberto, peça para a diarista iniciar o serviço.",
              style = MaterialTheme.typography.bodySmall
            )

            Button(
              text = "Cancelar",
              backgroundColor = Colors.RED_400,
              onClick = {
                scheduleListViewModel.cancelSchedule(
                  request = UserScheduleCanceledRequest(
                    userId = authenticationState.user?.id.toString(),
                    scheduleId = schedule.id
                  )
                )
              }
            )
          }

          "working" -> {
            Text(
              text = "Serviço em andamento",
              style = MaterialTheme.typography.bodySmall
            )

            Button(
              text = "Finalizar",
              backgroundColor = Colors.BLUE_400,
              onClick = {
                scheduleListViewModel.doneSchedule(
                  request = UserScheduleDonedRequest(
                    userId = authenticationState.user?.id.toString(),
                    scheduleId = schedule.id
                  )
                )
              }
            )
          }

          "canceled" -> {
            Text(
              text = "Motivo: Nenhum",
              style = MaterialTheme.typography.bodySmall
            )

            Button(
              text = "Cancelado",
              isDisabled = true,
              textColor = Colors.GRAY_500,
              backgroundColor = Colors.GRAY_200,
              textStyle = MaterialTheme.typography.bodyLarge.copy(textAlign = TextAlign.Center)
            )
          }

          "done" -> {
            Text(
              text = "Observações: Nenhuma",
              style = MaterialTheme.typography.bodySmall
            )

            Button(
              text = "Finalizado",
              isDisabled = true
            )
          }
        }
      }

      Column(
        modifier = Modifier.weight(1F),
        horizontalAlignment = Alignment.End,
        verticalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        Badge(
          text = CurrencyUtils.convertQuantityToLocalCurrency(
            CurrencyUtils.convertUnitToDouble(
              schedule.price
            )
          ),
        )

        Row(horizontalArrangement = Arrangement.spacedBy(mainGap / 2)) {
          for (service in schedule.services) {
            val icon = when (service.icon) {
              "maps-cleaning-services" -> Icons.Maps.Outlined.CleaningServices
              "household-cleaning-services" -> Icons.Household.Outlined.Flatware
              "maps-local-laundry-service" -> Icons.Maps.Outlined.LocalLaundryService
              else -> Icons.CommonActions.Outlined.Help
            }

            IconButton(
              icon = icon,
              iconSize = iconSize,
              containerSize = iconContainerSize,
            )
          }
        }

        Column(
          horizontalAlignment = Alignment.End
        ) {
          for (service in schedule.services) {
            val title = when (service.title) {
              "cleaning" -> "Faxina •"
              "cook" -> "Cozinhar •"
              "wash-clothes" -> "Lavar roupa •"
              else -> ""
            }

            Text(
              text = title,
              style = MaterialTheme.typography.bodyMedium.copy(
                fontWeight = FontWeight.Normal,
                color = Colors.GREEN_300
              )
            )
          }
        }
      }
    }
  }
}