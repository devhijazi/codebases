package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.pullrefresh.PullRefreshIndicator
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material3.Text
import androidx.compose.material.pullrefresh.rememberPullRefreshState
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Shimmer
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.network.serializations.marinetes.user.api.Transfer
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.utils.CurrencyUtils
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SettingsTransferListState
import com.marinetes.viewmodels.SettingsTransferListViewModel

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun SettingsTransferListScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  settingsTransferListViewModel: SettingsTransferListViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val settingsTransferListState = settingsTransferListViewModel.state.collectAsState().value

  val pullRefreshState = rememberPullRefreshState(
    refreshing = settingsTransferListState.isLoading,
    onRefresh = { settingsTransferListViewModel.getTrasnsfers() }
  )

  val containerPadding = 20.dp

  fun onGoBack() {
    navigationActions.goBack()

    settingsTransferListViewModel.resetState()
  }

  BackHandler { onGoBack() }

  LaunchedEffect(key1 = Unit) {
    settingsTransferListViewModel.getTrasnsfers()
  }

  DefaultLayout(
    functions = mutableMapOf(
      "onGoBack" to { onGoBack() },
      "onClickFloatingButton" to { navigationActions.navigateToSettingsTransferCreate() },
    ),
    navController = navController,
    authenticationViewModel = authenticationViewModel,
  ) {
    val transfersIsEmpty = settingsTransferListState.transfers.isEmpty()

    Column(
      modifier = if (transfersIsEmpty) Modifier.fillMaxSize().padding(all = containerPadding)
      else Modifier
        .fillMaxSize()
        .pullRefresh(pullRefreshState)
        .verticalScroll(rememberScrollState())
        .padding(all = containerPadding),
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = if (transfersIsEmpty) Arrangement.Center else Arrangement.Top
    ) {
      if (settingsTransferListState.isLoading) {
        TransfersLoader()
      } else if (transfersIsEmpty) {
        TransfersEmpty()
      } else {
        TransfersList(
          settingsTransferListState = settingsTransferListState
        )

        PullRefreshIndicator(
          refreshing = settingsTransferListState.isLoading,
          state = pullRefreshState
        )
      }
    }
  }
}

@Composable
private fun TransfersLoader() {
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
private fun TransfersEmpty() {
  val containerGap = 10.dp

  val iconSize = 80.dp
  val iconColor = Colors.GREEN_400

  Column(
    modifier = Modifier.fillMaxSize(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
  ) {
    Icon(
      modifier = Modifier.size(iconSize),
      imageVector = Icons.UIActions.Outlined.MoveUp,
      contentDescription = null,
      tint = iconColor
    )

    Text(
      text = "Nenhuma transferência\nrealizada!",
      style = MaterialTheme.typography.titleLarge.copy(textAlign = TextAlign.Center)
    )

    Spacer(modifier = Modifier.height(containerGap))

    Text(
      text = "Faça sua primeira transferência\nclicando no botão \"+\" abaixo.",
      style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
    )
  }
}

@Composable
private fun TransfersList(
  settingsTransferListState: SettingsTransferListState
) {
  val mainGap = 20.dp

  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Text(
      text = "Transferências realizadas",
      style = MaterialTheme.typography.bodyLarge
    )

    Column(
      modifier = Modifier.fillMaxSize(),
      verticalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      for (transfer in settingsTransferListState.transfers) {
        TransferCard(
          transfer = transfer
        )
      }
    }
  }
}

@Composable
private fun TransferCard(
  transfer: Transfer
) {
  val cardHeight = 100.dp
  val cardPadding = 20.dp
  val cardGap = 20.dp
  val cardBorderRadius = 10.dp
  val cardBackgroundColor = Colors.WHITE

  val statusColor = when (transfer.status) {
    "done" -> Colors.GREEN_400
    "pending" -> Colors.ORANGE_400
    "failed" -> Colors.RED_400
    else -> Colors.GRAY_400
  }

  val iconSize = 35.dp

  val titleColor = Colors.BLACK

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .height(cardHeight)
      .clip(shape = RoundedCornerShape(cardBorderRadius))
      .background(color = cardBackgroundColor, shape = RoundedCornerShape(cardBorderRadius))
      .padding(cardPadding),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween,
  ) {
    Row(
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(cardGap)
    ) {
      Icon(
        imageVector = when (transfer.status) {
          "done" -> Icons.UIActions.Outlined.CheckCircleOutline
          "pending" -> Icons.CommonActions.Outlined.Schedule
          "failed" -> Icons.UIActions.Outlined.Cancel
          else -> Icons.CommonActions.Outlined.Help
        },
        modifier = Modifier.size(iconSize),
        tint = statusColor,
        contentDescription = null
      )

      Column {
        Text(
          text = "- ${
            CurrencyUtils.convertQuantityToLocalCurrency(
              CurrencyUtils.convertUnitToDouble(
                transfer.netValue
              )
            )
          }",
          style = MaterialTheme.typography.bodyLarge.copy(color = titleColor)
        )

        Text(
          text = "${transfer.createdAt}",
          style = MaterialTheme.typography.bodySmall
        )

        if (transfer.status == "done") {
          Text(
            text = "Transferência realizada com sucesso",
            style = MaterialTheme.typography.bodySmall.copy(color = statusColor)
          )
        }

        if (transfer.status == "pending") {
          Text(
            text = "Transferência em análise",
            style = MaterialTheme.typography.bodySmall.copy(color = statusColor)
          )
        }

        if (transfer.status == "failed") {
          Text(
            text = "Transferência não realizada",
            style = MaterialTheme.typography.bodySmall.copy(color = statusColor)
          )
        }
      }
    }
  }
}