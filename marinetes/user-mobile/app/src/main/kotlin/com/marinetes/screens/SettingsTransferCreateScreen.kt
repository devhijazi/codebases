package com.marinetes.screens

import androidx.activity.compose.BackHandler
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
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetValue
import androidx.compose.material.rememberModalBottomSheetState
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.layouts.DefaultLayout
import com.marinetes.layouts.Modal
import com.marinetes.navigation.NavigationActions
import com.marinetes.network.serializations.marinetes.user.api.UserWallet
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.utils.CurrencyUtils
import com.marinetes.viewmodels.AuthenticationState
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SettingsTransferCreateCurrentModal
import com.marinetes.viewmodels.SettingsTransferCreateEvent
import com.marinetes.viewmodels.SettingsTransferCreateState
import com.marinetes.viewmodels.SettingsTransferCreateViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalComposeUiApi::class, ExperimentalMaterialApi::class)
@Composable
fun SettingsTransferCreateScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  settingsTransferCreateViewModel: SettingsTransferCreateViewModel
) {
  val navigationActions = NavigationActions(navController = navController)
  val keyboardController = LocalSoftwareKeyboardController.current
  val coroutineScope = rememberCoroutineScope()
  val modalState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden)

  val authenticationState = authenticationViewModel.state.collectAsState().value
  val settingsTransferCreateState = settingsTransferCreateViewModel.state.collectAsState().value

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
    if (settingsTransferCreateState.currentStep == 1 || settingsTransferCreateState.currentStep == settingsTransferCreateState.totalSteps) {
      navigationActions.goBack()

      settingsTransferCreateViewModel.resetState()

      return
    }

    settingsTransferCreateViewModel.backStep(settingsTransferCreateState.currentStep)
  }

  BackHandler { onGoBack() }

  LaunchedEffect(key1 = Unit) {
    settingsTransferCreateViewModel.getUserPixes()
  }

  LaunchedEffect(key1 = settingsTransferCreateState) {
    settingsTransferCreateViewModel.event.collect { event ->
      when (event) {
        is SettingsTransferCreateEvent.ValueAndPixKeyValidated -> {
          settingsTransferCreateViewModel.setCurrentModal(SettingsTransferCreateCurrentModal.TRANSFER_CONFIRM)

          onOpenModal()
        }

        is SettingsTransferCreateEvent.TransferCreated -> {
          settingsTransferCreateViewModel.nextStep(settingsTransferCreateState.currentStep)

          onCloseModal()

          authenticationViewModel.retriveUserWallet()
        }

        is SettingsTransferCreateEvent.TransferError -> {}
      }
    }
  }

  Modal(
    modalState = modalState,
    modalContent = {
      when (settingsTransferCreateState.currentModal) {
        SettingsTransferCreateCurrentModal.SELECT_PIX -> {
          SelectPixKeyModal(
            settingsTransferCreateState = settingsTransferCreateState,
            settingsTransferCreateViewModel = settingsTransferCreateViewModel,
            onCloseModal = { onCloseModal() }
          )
        }

        SettingsTransferCreateCurrentModal.TRANSFER_CONFIRM -> {
          TransferConfirmModal(
            settingsTransferCreateState = settingsTransferCreateState,
            settingsTransferCreateViewModel = settingsTransferCreateViewModel,
            onCloseModal = { onCloseModal() }
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
      when (settingsTransferCreateState.currentStep) {
        1 -> ValueAndPixKeyStep(
          authenticationState = authenticationState,
          settingsTransferCreateState = settingsTransferCreateState,
          settingsTransferCreateViewModel = settingsTransferCreateViewModel,
          onOpenModal = { onOpenModal() },
        )

        2 -> TransferCreatedStep(
          settingsTransferCreateState = settingsTransferCreateState,
        )
      }
    }
  }
}

@Composable
private fun ValueAndPixKeyStep(
  authenticationState: AuthenticationState,
  settingsTransferCreateState: SettingsTransferCreateState,
  settingsTransferCreateViewModel: SettingsTransferCreateViewModel,
  onOpenModal: () -> Unit,
) {
  val userWalletState = authenticationState.userWallet as UserWallet

  val balanceAvailable = CurrencyUtils.convertUnitToDouble(userWalletState.balanceAvailable)
  val balanceAvailableFormated = CurrencyUtils.convertQuantityToLocalCurrency(balanceAvailable)

  val containerMargin = 20.dp
  val containerGap = 10.dp

  val iconSize = 30.dp
  val iconColor = Colors.GRAY_400

  fun onOpenSelectedPixKeyModal() {
    settingsTransferCreateViewModel.setCurrentModal(SettingsTransferCreateCurrentModal.SELECT_PIX)

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
      text = "Criar uma transferência",
      style = MaterialTheme.typography.bodyLarge
    )

    Input(
      label = "Saldo disponível para transferências",
      value = balanceAvailableFormated,
      error = null,
      isReadOnly = true,
      onValueChange = { }
    )

    Input(
      label = "Valor que será transfererido",
      type = InputType.CURRENCY,
      value = settingsTransferCreateState.value,
      error = settingsTransferCreateState.valueError,
      isReadOnly = settingsTransferCreateState.isTransferLoading,
      onValueChange = { settingsTransferCreateViewModel.setValue(it, userWalletState) }
    )

    Input(
      label = "Chave Pix do destinatário",
      value = settingsTransferCreateViewModel.getPixKey(settingsTransferCreateState.pixKeyId),
      error = settingsTransferCreateState.pixKeyIdError,
      placeholder = "Escolha uma Chave Pix",
      isReadOnly = true,
      onClick = {
        if (!settingsTransferCreateState.isTransferLoading) {
          onOpenSelectedPixKeyModal()
        }
      },
      customIcon = {
        Icon(
          modifier = Modifier
            .size(iconSize)
            .noRippleClickable {
              if (!settingsTransferCreateState.isTransferLoading) {
                onOpenSelectedPixKeyModal()
              }
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
      onClick = { settingsTransferCreateViewModel.validateValueAndPixKey(userWalletState) }
    )
  }
}

@Composable
private fun SelectPixKeyModal(
  settingsTransferCreateState: SettingsTransferCreateState,
  settingsTransferCreateViewModel: SettingsTransferCreateViewModel,
  onCloseModal: () -> Any? = { null },
) {
  val pixesIsEmpty = settingsTransferCreateState.pixes.isEmpty()

  val containerGap = 30.dp

  val titleColor = Colors.BLACK

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(if (pixesIsEmpty) containerGap - 20.dp else containerGap),
  ) {
    if (pixesIsEmpty) {
      Text(
        text = "Nenhuma Chave Pix\nencontrada",
        style = MaterialTheme.typography.titleLarge.copy(
          color = titleColor,
          textAlign = TextAlign.Center
        )
      )

      Text(
        text = "Cadastre uma nova Chave Pix para\npoder realizar transferêncais.",
        style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
      )
    } else {
      Text(
        text = "Escolha uma Chave Pix",
        style = MaterialTheme.typography.titleLarge.copy(
          color = titleColor,
          textAlign = TextAlign.Center
        )
      )

      Column(
        verticalArrangement = Arrangement.spacedBy(containerGap / 2),
      ) {
        for (pixKey in settingsTransferCreateState.pixes) {
          PixKey(
            label = when (pixKey.keyType) {
              "cpf" -> "CPF"
              "phone" -> "Celular"
              "email" -> "E-mail"
              "random_key" -> "Chave aleatória"
              else -> ""
            },
            value = pixKey.key,
            isSelected = settingsTransferCreateState.pixKeyId != null && settingsTransferCreateState.pixKeyId == pixKey.id,
            onClick = {
              settingsTransferCreateViewModel.setPixKeyId(pixKey.id)

              onCloseModal()
            }
          )
        }
      }
    }
  }
}

@Composable
private fun PixKey(
  label: String,
  value: String,
  isSelected: Boolean,
  onClick: () -> Unit,
) {
  val containerGap = 15.dp

  val labelColor = if (isSelected) Colors.GREEN_300 else Colors.GRAY_400
  val valueColor = if (isSelected) Colors.GREEN_300 else Colors.GRAY_400

  val icon =
    if (isSelected) Icons.UIActions.Outlined.RadioButtonChecked else Icons.UIActions.Outlined.RadioButtonUnchecked
  val iconSize = 30.dp
  val iconColor = if (isSelected) Colors.GREEN_300 else Colors.GRAY_400

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .noRippleClickable { onClick() },
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Icon(
      modifier = Modifier.size(iconSize),
      imageVector = icon,
      contentDescription = null,
      tint = iconColor
    )

    Column {
      Text(
        text = label,
        style = MaterialTheme.typography.bodyLarge.copy(color = valueColor)
      )

      Text(
        text = value,
        style = MaterialTheme.typography.bodyMedium.copy(color = labelColor)
      )
    }
  }
}

@Composable
private fun TransferConfirmModal(
  settingsTransferCreateState: SettingsTransferCreateState,
  settingsTransferCreateViewModel: SettingsTransferCreateViewModel,
  onCloseModal: () -> Unit,
) {
  val mainGap = 30.dp

  val titleColor = Colors.BLACK

  val buttonWeight = 0.50F
  val buttonBackgroundColor = Colors.INPUT
  val buttonTextColor = Colors.GRAY_500

  val value = CurrencyUtils.convertQuantityToLocalCurrency(
    CurrencyUtils.convertIntToDouble(
      settingsTransferCreateState.value.toInt()
    )
  )

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(mainGap),
  ) {
    Text(
      text = "Confirme os dados da transferência.",
      style = MaterialTheme.typography.bodyLarge.copy(
        color = titleColor,
        textAlign = TextAlign.Center
      )
    )

    Column(verticalArrangement = Arrangement.spacedBy(mainGap / 2)) {
      Column(modifier = Modifier.fillMaxWidth()) {
        Text(
          text = "Valor que será transferido",
          style = MaterialTheme.typography.titleLarge.copy(color = titleColor)
        )

        Text(
          text = value,
          style = MaterialTheme.typography.bodyMedium
        )
      }

      Column(modifier = Modifier.fillMaxWidth()) {
        Text(
          text = "Chave Pix do destinatário",
          style = MaterialTheme.typography.titleLarge.copy(color = titleColor)
        )

        Text(
          text = settingsTransferCreateViewModel.getPixKey(settingsTransferCreateState.pixKeyId),
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
        isDisabled = settingsTransferCreateState.isTransfer,
        isLoading = settingsTransferCreateState.isTransferLoading,
        backgroundColor = Colors.GREEN_300,
        onClick = { settingsTransferCreateViewModel.createTransfer() }
      )
    }
  }
}

@Composable
private fun TransferCreatedStep(
  settingsTransferCreateState: SettingsTransferCreateState
) {
  val containerMargin = 20.dp
  val containerGap = 10.dp

  val iconSize = 80.dp
  val iconColor = Colors.ORANGE_400

  if (settingsTransferCreateState.transfer != null && settingsTransferCreateState.transfer.status == "pending") {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(containerMargin),
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.Center
    ) {
      Icon(
        modifier = Modifier.size(iconSize),
        imageVector = Icons.UIActions.Outlined.CheckCircleOutline,
        contentDescription = null,
        tint = iconColor
      )

      Text(
        text = "Sua transferência\nestá em análise!",
        style = MaterialTheme.typography.titleLarge.copy(textAlign = TextAlign.Center)
      )

      Spacer(modifier = Modifier.height(containerGap))

      Text(
        text = "Informamos que sua transfêrencia\nno valor de ${
          CurrencyUtils.convertQuantityToLocalCurrency(
            CurrencyUtils.convertUnitToDouble(settingsTransferCreateState.transfer.netValue)
          )
        } foi criada com sucesso!",
        style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
      )

      Spacer(modifier = Modifier.height(containerGap))

      Text(
        text = "Assim que sua transfêrencia for feita, iremos\nnotificar-lhe por email sobre a confirmação.",
        style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
      )
    }
  }
}

