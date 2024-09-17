package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetValue
import androidx.compose.material3.Text
import androidx.compose.material.rememberModalBottomSheetState
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
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
import com.marinetes.network.NetworkError
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SettingsPixKeyCreateEvent
import com.marinetes.viewmodels.SettingsPixKeyCreateKeyType
import com.marinetes.viewmodels.SettingsPixKeyCreateState
import com.marinetes.viewmodels.SettingsPixKeyCreateViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterialApi::class, ExperimentalComposeUiApi::class)
@Composable
fun SettingsPixKeyCreateScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  settingsPixKeyCreateViewModel: SettingsPixKeyCreateViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val settingsPixKeyCreateState = settingsPixKeyCreateViewModel.state.collectAsState().value

  val keyboardController = LocalSoftwareKeyboardController.current

  val coroutineScope = rememberCoroutineScope()
  val modalState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden)

  val containerMargin = 20.dp
  val containerGap = 10.dp

  val iconSize = 30.dp
  val iconColor = Colors.GRAY_400

  fun onOpenPixTypeModal() {
    coroutineScope.launch {
      keyboardController?.hide()

      modalState.show()
    }
  }

  fun onClosePixTypeModal() {
    coroutineScope.launch {
      modalState.hide()
    }
  }

  fun onGoBack() {
    settingsPixKeyCreateViewModel.resetState()

    navigationActions.goBack()
  }

  BackHandler {
    onGoBack()
  }

  LaunchedEffect(key1 = settingsPixKeyCreateState) {
    settingsPixKeyCreateViewModel.event.collect { event ->
      when (event) {
        is SettingsPixKeyCreateEvent.PixKeyCreated -> {
          onGoBack()
        }

        is SettingsPixKeyCreateEvent.PixKeyError -> {
          if (event.code == NetworkError.DiaristPixKeyAlreadyExistsError.code) {
            settingsPixKeyCreateViewModel.updateKeyError("Esta chave já está cadastrada.")
          }

          if (event.code == NetworkError.UserPixKeyRateLimitError.code) {
            settingsPixKeyCreateViewModel.updateKeyError("Limite de chaves cadastradas atingido.")
          }
        }
      }
    }
  }

  Modal(
    modalState = modalState,
    modalContent = {
      PixTypeModal(
        settingsPixKeyCreateViewModel = settingsPixKeyCreateViewModel,
        settingsPixKeyCreateState = settingsPixKeyCreateState,
        onCloseModal = { onClosePixTypeModal() }
      )
    }
  ) {
    DefaultLayout(
      functions = mutableMapOf("onGoBack" to { onGoBack() }),
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
          text = "Cadastrar Chave Pix",
          style = MaterialTheme.typography.bodyLarge
        )

        Input(
          label = "Tipo de Chave Pix",
          value = if (settingsPixKeyCreateState.keyType != null) settingsPixKeyCreateState.keyType.title else "Escolha um tipo de Chave Pix",
          error = settingsPixKeyCreateState.keyTypeError,
          isReadOnly = true,
          onClick = { if (!settingsPixKeyCreateState.isLoading) onOpenPixTypeModal() },
          customIcon = {
            Icon(
              modifier = Modifier
                .size(iconSize)
                .noRippleClickable { if (!settingsPixKeyCreateState.isLoading) onOpenPixTypeModal() },
              imageVector = Icons.UIActions.Outlined.ExpandMore,
              contentDescription = null,
              tint = iconColor
            )
          },
          onValueChange = { }
        )

        Input(
          label = "Chave Pix",
          type = when (settingsPixKeyCreateState.keyType) {
            SettingsPixKeyCreateKeyType.CPF -> InputType.CPF
            SettingsPixKeyCreateKeyType.PHONE -> InputType.PHONE
            SettingsPixKeyCreateKeyType.EMAIL -> InputType.EMAIL
            SettingsPixKeyCreateKeyType.RANDOM_KEY -> InputType.TEXT
            else -> InputType.TEXT
          },
          value = settingsPixKeyCreateState.key,
          error = settingsPixKeyCreateState.keyError,
          placeholder = when (settingsPixKeyCreateState.keyType) {
            SettingsPixKeyCreateKeyType.CPF -> "000.000.000-00"
            SettingsPixKeyCreateKeyType.PHONE -> "(00) 9 0000-0000"
            SettingsPixKeyCreateKeyType.EMAIL -> "jhondoe@example.com"
            SettingsPixKeyCreateKeyType.RANDOM_KEY -> ""
            else -> ""
          },
          isDisabled = settingsPixKeyCreateState.keyType == null,
          onValueChange = { settingsPixKeyCreateViewModel.setKey(it) }
        )

        Button(
          text = "Cadastrar",
          isLoading = settingsPixKeyCreateState.isLoading,
          onClick = { settingsPixKeyCreateViewModel.createPixKey() }
        )
      }
    }
  }
}

@Composable
private fun PixTypeModal(
  settingsPixKeyCreateViewModel: SettingsPixKeyCreateViewModel,
  settingsPixKeyCreateState: SettingsPixKeyCreateState,
  onCloseModal: () -> Any? = { null },
) {
  val mainGap = 30.dp

  val titleColor = Colors.BLACK

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(mainGap),
  ) {
    Text(
      text = "Escolha um tipo de Chave Pix",
      style = MaterialTheme.typography.titleLarge.copy(
        color = titleColor,
        textAlign = TextAlign.Center
      )
    )

    Column(
      verticalArrangement = Arrangement.spacedBy(mainGap / 2),
    ) {
      PixType(
        name = "Chave de CPF",
        isSelected = settingsPixKeyCreateState.keyType != null && settingsPixKeyCreateState.keyType == SettingsPixKeyCreateKeyType.CPF,
        onClick = {
          settingsPixKeyCreateViewModel.setKeyType(SettingsPixKeyCreateKeyType.CPF)

          onCloseModal()
        }
      )

      PixType(
        name = "Chave de celular",
        isSelected = settingsPixKeyCreateState.keyType != null && settingsPixKeyCreateState.keyType == SettingsPixKeyCreateKeyType.PHONE,
        onClick = {
          settingsPixKeyCreateViewModel.setKeyType(SettingsPixKeyCreateKeyType.PHONE)

          onCloseModal()
        }
      )

      PixType(
        name = "Chave de e-mail",
        isSelected = settingsPixKeyCreateState.keyType != null && settingsPixKeyCreateState.keyType == SettingsPixKeyCreateKeyType.EMAIL,
        onClick = {
          settingsPixKeyCreateViewModel.setKeyType(SettingsPixKeyCreateKeyType.EMAIL)

          onCloseModal()
        }
      )

      PixType(
        name = "Chave aleatória",
        isSelected = settingsPixKeyCreateState.keyType != null && settingsPixKeyCreateState.keyType == SettingsPixKeyCreateKeyType.RANDOM_KEY,
        onClick = {
          settingsPixKeyCreateViewModel.setKeyType(SettingsPixKeyCreateKeyType.RANDOM_KEY)

          onCloseModal()
        }
      )
    }
  }
}

@Composable
private fun PixType(
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