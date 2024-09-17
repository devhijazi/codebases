package com.marinetes.screens

import android.os.Handler
import android.os.Looper
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetValue
import androidx.compose.material.pullrefresh.PullRefreshIndicator
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material.pullrefresh.rememberPullRefreshState
import androidx.compose.material.rememberModalBottomSheetState
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.Shimmer
import com.marinetes.layouts.DefaultLayout
import com.marinetes.layouts.Modal
import com.marinetes.navigation.NavigationActions
import com.marinetes.network.serializations.marinetes.user.api.Payment
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.showMessage
import com.marinetes.utils.CurrencyUtils
import com.marinetes.utils.toBitmap
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.DepositListEvent
import com.marinetes.viewmodels.DepositListState
import com.marinetes.viewmodels.DepositListViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun DepositListScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  depositListViewModel: DepositListViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val authenticationState = authenticationViewModel.state.collectAsState().value
  val depositListState = depositListViewModel.state.collectAsState().value

  val pullRefreshState = rememberPullRefreshState(
    refreshing = depositListState.isLoading,
    onRefresh = { depositListViewModel.getPayments() }
  )

  val coroutineScope = rememberCoroutineScope()
  val modalState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden)

  val containerPadding = 20.dp

  fun onOpenPaymentModal(payment: Payment) {
    depositListViewModel.setCurrentPayment(payment)

    coroutineScope.launch {
      modalState.show()
    }
  }

  fun onClosePaymentModal() {
    depositListViewModel.setCurrentPayment(null)

    coroutineScope.launch {
      modalState.hide()
    }
  }

  BackHandler {
    navigationActions.goBack()

    depositListViewModel.disconnectPaymentWebsocket()

    depositListViewModel.resetState()
  }

  LaunchedEffect(key1 = Unit) {
    depositListViewModel.getPayments()
  }

  LaunchedEffect(key1 = Unit) {
    depositListViewModel.connectPaymentWebsocket(userId = authenticationState.user?.id as String)
  }

  LaunchedEffect(key1 = depositListState) {
    depositListViewModel.event.collect { event ->
      when (event) {
        is DepositListEvent.PaymentRecevied -> {
          authenticationViewModel.retriveUserWallet()

          depositListViewModel.getPayments()

          Handler(Looper.getMainLooper()).postDelayed({
            onClosePaymentModal()
          }, 6000)
        }
      }
    }
  }

  DisposableEffect(key1 = Unit) {
    onDispose {
      depositListViewModel.disconnectPaymentWebsocket()
    }
  }

  Modal(
    modalState = modalState,
    modalContent = {
      if (depositListState.currentPayment != null) {
        PaymentModal(
          payment = depositListState.currentPayment
        )
      }
    }
  ) {
    DefaultLayout(
      navController = navController,
      authenticationViewModel = authenticationViewModel,
    ) {
      val paymentsIsEmpty = depositListState.payments.isEmpty()

      Column(
        modifier = if (paymentsIsEmpty) Modifier
          .fillMaxSize()
          .padding(all = containerPadding)
        else Modifier
          .fillMaxSize()
          .pullRefresh(pullRefreshState)
          .verticalScroll(rememberScrollState())
          .padding(all = containerPadding),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = if (paymentsIsEmpty) Arrangement.Center else Arrangement.Top
      ) {
        if (depositListState.isLoading) {
          PaymentsLoader()
        } else if (paymentsIsEmpty) {
          PaymentsEmpty()
        } else {
          PaymentList(
            depositListState = depositListState,
            onOpenPaymentModal = { onOpenPaymentModal(it) }
          )

          PullRefreshIndicator(
            refreshing = depositListState.isLoading,
            state = pullRefreshState
          )
        }
      }

    }
  }
}

@Composable
private fun PaymentsLoader() {
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
private fun PaymentsEmpty() {
  val iconSize = 80.dp
  val iconColor = Colors.GREEN_400

  Column(
    modifier = Modifier.fillMaxSize(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
  ) {
    Icon(
      modifier = Modifier.size(iconSize),
      imageVector = Icons.BusinessAndPayments.Outlined.AccountBalance,
      contentDescription = null,
      tint = iconColor
    )

    Text(
      text = "Nenhum depósito\nrealizado!",
      style = MaterialTheme.typography.titleLarge.copy(textAlign = TextAlign.Center)
    )
  }
}

@Composable
private fun PaymentList(
  depositListState: DepositListState,
  onOpenPaymentModal: (payment: Payment) -> Unit,
) {
  val mainGap = 20.dp

  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Text(
      text = "Depósitos realziados",
      style = MaterialTheme.typography.bodyLarge
    )

    Column(
      modifier = Modifier.fillMaxSize(),
      verticalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      for (payment in depositListState.payments) {
        PaymentCard(
          payment = payment,
          onClick = { onOpenPaymentModal(payment) }
        )
      }
    }
  }
}

@Composable
private fun PaymentCard(
  payment: Payment,
  onClick: () -> Unit,
) {
  val cardHeight = 100.dp
  val cardPadding = 20.dp
  val cardGap = 20.dp
  val cardBorderRadius = 10.dp
  val cardBackgroundColor = Colors.WHITE

  val statusColor = when (payment.status) {
    "received" -> Colors.GREEN_400
    "pending" -> Colors.ORANGE_400
    "overdue" -> Colors.RED_400
    else -> Colors.GRAY_400
  }

  val iconSize = 35.dp

  val titleColor = Colors.BLACK

  Row(
    modifier = if (payment.status == "pending") Modifier
      .fillMaxWidth()
      .height(cardHeight)
      .clip(shape = RoundedCornerShape(cardBorderRadius))
      .clickable { onClick() }
      .background(color = cardBackgroundColor, shape = RoundedCornerShape(cardBorderRadius))
      .padding(cardPadding)
    else Modifier
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
        imageVector = when (payment.status) {
          "received" -> Icons.UIActions.Outlined.CheckCircleOutline
          "pending" -> Icons.CommonActions.Outlined.Schedule
          "overdue" -> Icons.CommonActions.Outlined.CalendarToday
          else -> Icons.CommonActions.Outlined.Help
        },
        modifier = Modifier.size(iconSize),
        tint = statusColor,
        contentDescription = null
      )

      Column {
        Text(
          text = "+ ${
            CurrencyUtils.convertQuantityToLocalCurrency(
              CurrencyUtils.convertUnitToDouble(
                payment.netValue
              )
            )
          }",
          style = MaterialTheme.typography.bodyLarge.copy(color = titleColor)
        )

        Text(
          text = payment.createdAt,
          style = MaterialTheme.typography.bodySmall
        )

        if (payment.status == "pending") {
          Text(
            text = "Clique aqui para finalizar o seu depósito",
            style = MaterialTheme.typography.bodySmall.copy(color = statusColor)
          )
        }

        if (payment.status == "overdue") {
          Text(
            text = "Depósito não efetuado, pagamento vencido.",
            style = MaterialTheme.typography.bodySmall.copy(color = statusColor)
          )
        }

        if (payment.status == "received") {
          Text(
            text = "Depósito efetuado",
            style = MaterialTheme.typography.bodySmall.copy(color = statusColor)
          )
        }
      }
    }

    if (payment.status == "pending") {
      Icon(
        imageVector = Icons.UIActions.Outlined.MoreVert,
        modifier = Modifier.size(iconSize),
        tint = statusColor,
        contentDescription = null
      )
    }
  }
}

@Composable
private fun PaymentModal(
  payment: Payment
) {
  val context = LocalContext.current
  val clipboardManager = LocalClipboardManager.current

  val pixQrCodeBase64 = payment.pixQrCodeBase64
  val pixQrCodeBitmap = pixQrCodeBase64.toBitmap().asImageBitmap()

  val containerGap = 15.dp

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(containerGap),
  ) {
    if (payment.status == "pending") {
      val qrCodeImageSize = 200.dp

      val copyPixButtonBackgroundColor = Colors.PIX

      val statusIconSize = 30.dp
      val statusIconColor = Colors.ORANGE_400

      val statusTitleColor = Colors.ORANGE_400

      Text(
        text = "Agora só falta concluir seu Pix!",
        style = MaterialTheme.typography.bodyLarge,
        modifier = Modifier
      )

      Image(
        bitmap = pixQrCodeBitmap,
        modifier = Modifier
          .align(Alignment.CenterHorizontally)
          .size(qrCodeImageSize),
        contentDescription = "Pix Qr Code",
        contentScale = ContentScale.Fit
      )

      Button(
        text = "Copiar código PIX",
        backgroundColor = copyPixButtonBackgroundColor,
        onClick = {
          clipboardManager.setText(
            annotatedString = AnnotatedString(
              text = payment.pixCopyAndPaste
            )
          )

          context.showMessage("Código PIX copiado para área de transferências.")
        }
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center
      ) {
        Icon(
          modifier = Modifier.size(statusIconSize),
          imageVector = Icons.CommonActions.Outlined.Schedule,
          contentDescription = null,
          tint = statusIconColor
        )

        Spacer(modifier = Modifier.width(containerGap - 5.dp))

        Text(
          text = "Aguardando pagamento",
          style = MaterialTheme.typography.bodyLarge.copy(color = statusTitleColor)
        )
      }

      Divider(color = Colors.GRAY_200)

      Column(
        verticalArrangement = Arrangement.spacedBy(containerGap - 5.dp)
      ) {
        Text(
          text = "Como pagar?",
          style = MaterialTheme.typography.bodyLarge
        )

        Text(
          text = "1. Abra o app do seu banco ou carteira digital e escolha a opção pagar com Pix.",
          style = MaterialTheme.typography.bodyMedium
        )

        Text(
          text = "2. Selecione a opção pagar com QR Code e escaneie o código ou copie o código e selecione a opção Pix Copia e Cola.",
          style = MaterialTheme.typography.bodyMedium
        )

        Text(
          text = "3. Confirme as informações e finalize a compra.",
          style = MaterialTheme.typography.bodyMedium
        )
      }
    } else if (payment.status == "received") {
      val iconSize = 80.dp
      val iconColor = Colors.GREEN_400

      Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(containerGap - 5.dp),
      ) {
        Icon(
          modifier = Modifier.size(iconSize),
          imageVector = Icons.UIActions.Outlined.CheckCircleOutline,
          contentDescription = null,
          tint = iconColor
        )

        Text(
          text = "Seu pagamento\nfoi recebido!",
          style = MaterialTheme.typography.titleLarge.copy(textAlign = TextAlign.Center)
        )

        Text(
          text = "O valor de ${CurrencyUtils.convertQuantityToLocalCurrency(CurrencyUtils.convertUnitToDouble(payment.netValue))} foi adicionando a sua carteira!",
          style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
        )
      }
    }
  }
}