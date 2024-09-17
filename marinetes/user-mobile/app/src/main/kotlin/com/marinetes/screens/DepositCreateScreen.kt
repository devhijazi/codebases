package com.marinetes.screens

import android.os.Handler
import android.os.Looper
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
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
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetValue
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
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.layouts.DefaultLayout
import com.marinetes.layouts.Modal
import com.marinetes.navigation.NavigationActions
import com.marinetes.network.serializations.marinetes.user.api.User
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.theme.showMessage
import com.marinetes.utils.CurrencyUtils
import com.marinetes.utils.toBitmap
import com.marinetes.viewmodels.AuthenticationState
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.DepositCreateEvent
import com.marinetes.viewmodels.DepositCreateState
import com.marinetes.viewmodels.DepositCreateStateCurrentModal
import com.marinetes.viewmodels.DepositCreateStateMethod
import com.marinetes.viewmodels.DepositCreateViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterialApi::class, ExperimentalComposeUiApi::class)
@Composable
fun DepositCreateScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  depositCreateViewModel: DepositCreateViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val authenticationState = authenticationViewModel.state.collectAsState().value

  val depositCreateState = depositCreateViewModel.state.collectAsState().value

  val keyboardController = LocalSoftwareKeyboardController.current

  val coroutineScope = rememberCoroutineScope()
  val modalState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden)

  fun onOpenModal() {
    coroutineScope.launch {
      keyboardController?.hide()

      modalState.show()
    }
  }

  fun onCloseModal() {
    coroutineScope.launch {
      modalState.hide()
    }
  }

  fun onGoBack() {
    if (depositCreateState.currentStep == 1 || depositCreateState.currentStep == depositCreateState.totalSteps) {
      navigationActions.goBack()

      depositCreateViewModel.disconnectPaymentWebsocket()

      depositCreateViewModel.resetState()

      return
    }

    depositCreateViewModel.backStep(depositCreateState.currentStep)
  }

  BackHandler { onGoBack() }

  LaunchedEffect(key1 = depositCreateState) {
    depositCreateViewModel.event.collect { event ->
      when (event) {
        is DepositCreateEvent.ValueAndMethodValidated -> {
          depositCreateViewModel.setCurrentModal(DepositCreateStateCurrentModal.PAYMENT_CONFIRM)

          onOpenModal()
        }

        is DepositCreateEvent.PaymentCreated -> {
          depositCreateViewModel.nextStep(depositCreateState.currentStep)

          onCloseModal()
        }

        is DepositCreateEvent.PaymentReceived -> {
          authenticationViewModel.retriveUserWallet()

          Handler(Looper.getMainLooper()).postDelayed({
            navigationActions.navigateToDepositList()

            depositCreateViewModel.resetState()
          }, 6000)
        }

        is DepositCreateEvent.PaymentError -> {}
      }
    }
  }

  DisposableEffect(key1 = Unit) {
    onDispose {
      depositCreateViewModel.disconnectPaymentWebsocket()
    }
  }

  Modal(
    modalState = modalState,
    modalContent = {
      when (depositCreateState.currentModal) {
        DepositCreateStateCurrentModal.PAYMENT_METHOD -> {
          PaymentMethodModal(
            depositCreateViewModel = depositCreateViewModel,
            depositCreateState = depositCreateState,
            onCloseModal = { onCloseModal() },
          )
        }

        DepositCreateStateCurrentModal.PAYMENT_CONFIRM -> {
          PaymentConfirmModal(
            depositCreateViewModel = depositCreateViewModel,
            depositCreateState = depositCreateState,
            onCloseModal = { onCloseModal() },
          )
        }

        else -> {}
      }
    }
  ) {
    DefaultLayout(
      functions = mutableMapOf("onGoBack" to { onGoBack() }),
      navController = navController,
      authenticationViewModel = authenticationViewModel,
    ) {
      when (depositCreateState.currentStep) {
        1 -> ValueAndMethodStep(
          depositCreateViewModel = depositCreateViewModel,
          depositCreateState = depositCreateState,
          onOpenModal = { onOpenModal() },
        )

        2 -> PaymentStep(
          authenticationState = authenticationState,
          depositCreateViewModel = depositCreateViewModel,
          depositCreateState = depositCreateState
        )
      }
    }
  }
}

@Composable
private fun ValueAndMethodStep(
  depositCreateViewModel: DepositCreateViewModel,
  depositCreateState: DepositCreateState,
  onOpenModal: () -> Unit,
) {
  val containerMargin = 20.dp
  val containerGap = 10.dp

  val iconSize = 30.dp
  val iconColor = Colors.GRAY_400

  fun onOpenPaymentMethodModal() {
    depositCreateViewModel.setCurrentModal(DepositCreateStateCurrentModal.PAYMENT_METHOD)

    onOpenModal()
  }

  Column(
    modifier = Modifier
      .fillMaxSize()
      .verticalScroll(rememberScrollState())
      .padding(containerMargin),
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Text(
      text = "Realizar depósito",
      style = MaterialTheme.typography.bodyLarge
    )

    Input(
      label = "Valor",
      type = InputType.CURRENCY,
      value = depositCreateState.value,
      error = depositCreateState.valueError,
      onValueChange = { depositCreateViewModel.setValue(it) }
    )

    Input(
      label = "Método de pagamento",
      value = if (depositCreateState.method != null) depositCreateState.method.title else "",
      error = depositCreateState.methodError,
      placeholder = "Escolha um método de pagamento",
      isReadOnly = true,
      onClick = { onOpenPaymentMethodModal() },
      customIcon = {
        Icon(
          modifier = Modifier
            .size(iconSize)
            .noRippleClickable {
              onOpenPaymentMethodModal()
            },
          imageVector = Icons.UIActions.Outlined.ExpandMore,
          contentDescription = null,
          tint = iconColor
        )
      },
      onValueChange = { }
    )

    Button(
      text = "Continuar",
      onClick = { depositCreateViewModel.validateValueAndMethod() }
    )
  }
}

@Composable
private fun PaymentMethodModal(
  depositCreateViewModel: DepositCreateViewModel,
  depositCreateState: DepositCreateState,
  onCloseModal: () -> Unit,
) {
  val mainGap = 30.dp

  val titleColor = Colors.BLACK

  fun onClosePaymentMethodModal() {
    depositCreateViewModel.setMethod(DepositCreateStateMethod.PIX)

    onCloseModal()
  }

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(mainGap),
  ) {
    Text(
      text = "Escolha um método de pagamento",
      style = MaterialTheme.typography.titleLarge.copy(
        color = titleColor,
        textAlign = TextAlign.Center
      )
    )

    Column(
      verticalArrangement = Arrangement.spacedBy(mainGap / 2),
    ) {
      PaymentMethod(
        name = "PIX",
        isSelected = depositCreateState.method != null && depositCreateState.method == DepositCreateStateMethod.PIX,
        onClick = { onClosePaymentMethodModal() }
      )
    }
  }
}

@Composable
private fun PaymentMethod(
  name: String,
  isSelected: Boolean,
  onClick: (type: String) -> Unit,
) {
  val containerGap = 15.dp

  val titleColor = if (isSelected) Colors.GREEN_300 else Colors.GRAY_400

  val icon =
    if (isSelected) Icons.UIActions.Outlined.RadioButtonChecked else Icons.UIActions.Outlined.RadioButtonUnchecked
  val iconSize = 30.dp
  val iconColor = if (isSelected) Colors.GREEN_300 else Colors.GRAY_400

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .noRippleClickable { onClick("none") },
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Icon(
      modifier = Modifier.size(iconSize),
      imageVector = icon,
      contentDescription = null,
      tint = iconColor
    )

    Text(
      text = name,
      style = MaterialTheme.typography.bodyLarge.copy(color = titleColor)
    )
  }
}

@Composable
private fun PaymentConfirmModal(
  depositCreateViewModel: DepositCreateViewModel,
  depositCreateState: DepositCreateState,
  onCloseModal: () -> Unit,
) {
  val mainGap = 30.dp

  val titleColor = Colors.BLACK

  val buttonWeight = 0.50F
  val buttonBackgroundColor = Colors.INPUT
  val buttonTextColor = Colors.GRAY_500

  val value = CurrencyUtils.convertQuantityToLocalCurrency(
    CurrencyUtils.convertIntToDouble(
      depositCreateState.value.toInt()
    )
  )

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(mainGap),
  ) {
    Text(
      text = "Confirme os dados do depósito.",
      style = MaterialTheme.typography.bodyLarge.copy(
        color = titleColor,
        textAlign = TextAlign.Center
      )
    )

    Column(verticalArrangement = Arrangement.spacedBy(mainGap / 2)) {
      Column(modifier = Modifier.fillMaxWidth()) {
        Text(
          text = "Valor",
          style = MaterialTheme.typography.titleLarge.copy(color = titleColor)
        )

        Text(
          text = "$value + R$ 1,99 (taxa do depósito)",
          style = MaterialTheme.typography.bodyMedium
        )
      }

      Column(modifier = Modifier.fillMaxWidth()) {
        Text(
          text = "Método de pagamento",
          style = MaterialTheme.typography.titleLarge.copy(color = titleColor)
        )

        Text(
          text = depositCreateState.method?.title.toString(),
          style = MaterialTheme.typography.bodyMedium
        )
      }
    }

    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      Button(
        modifier = Modifier.weight(buttonWeight),
        text = "Voltar",
        textColor = buttonTextColor,
        backgroundColor = buttonBackgroundColor,
        onClick = {
          onCloseModal()
        }
      )

      Button(
        modifier = Modifier.weight(buttonWeight),
        text = "Confirmar",
        isDisabled = depositCreateState.isPayment,
        isLoading = depositCreateState.isLoading,
        backgroundColor = Colors.GREEN_300,
        onClick = { depositCreateViewModel.createPayment() }
      )
    }
  }
}

@Composable
private fun PaymentStep(
  authenticationState: AuthenticationState,
  depositCreateViewModel: DepositCreateViewModel,
  depositCreateState: DepositCreateState
) {
  val context = LocalContext.current
  val clipboardManager = LocalClipboardManager.current

  val user = authenticationState.user as User

  val containerMargin = 20.dp
  val containerGap = 15.dp

  LaunchedEffect(key1 = Unit) {
    depositCreateViewModel.connectPaymentWebsocket(userId = user.id)
  }

  if (depositCreateState.payment != null) {
    Column(
      modifier = if (depositCreateState.payment.status == "received") Modifier
        .fillMaxSize()
        .padding(containerMargin)
      else Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(containerMargin),
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = if (depositCreateState.payment.status == "received") Arrangement.Center
      else Arrangement.spacedBy(containerGap),
    ) {
      if (depositCreateState.payment.status == "pending") {
        val pixQrCodeBase64 = depositCreateState.payment.pixQrCodeBase64
        val pixQrCodeBitmap = pixQrCodeBase64.toBitmap().asImageBitmap()

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
                text = depositCreateState.payment.pixCopyAndPaste
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
      } else if (depositCreateState.payment.status == "received") {
        val iconSize = 80.dp
        val iconColor = Colors.GREEN_400

        Column(
          modifier = Modifier.fillMaxSize(),
          horizontalAlignment = Alignment.CenterHorizontally,
          verticalArrangement = Arrangement.Center,
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

          Spacer(modifier = Modifier.height(containerGap - 5.dp))

          Text(
            text = "O valor de ${CurrencyUtils.convertQuantityToLocalCurrency(CurrencyUtils.convertUnitToDouble(depositCreateState.payment.netValue))} foi adicionando a sua carteira!",
            style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
          )
        }
      }
    }
  }
}