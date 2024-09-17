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
import com.marinetes.network.NetworkError
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SettingsPixKeyEditEvent
import com.marinetes.viewmodels.SettingsPixKeyEditKeyType
import com.marinetes.viewmodels.SettingsPixKeyEditState
import com.marinetes.viewmodels.SettingsPixKeyEditViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterialApi::class, ExperimentalComposeUiApi::class)
@Composable
fun SettingsPixKeyEditScreen(
  pixDataId: String,
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  settingsPixKeyEditViewModel: SettingsPixKeyEditViewModel
) {
  val settingsPixKeyEditState = settingsPixKeyEditViewModel.state.collectAsState().value

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

  LaunchedEffect(key1 = pixDataId) {
    settingsPixKeyEditViewModel.getUserPixData(pixDataId = pixDataId)
  }

  LaunchedEffect(key1 = settingsPixKeyEditState) {
    settingsPixKeyEditViewModel.event.collect { event ->
      when (event) {
        is SettingsPixKeyEditEvent.PixKeyUpdated -> {

        }

        is SettingsPixKeyEditEvent.PixKeyError -> {
          if (event.code == NetworkError.DiaristPixKeyAlreadyExistsError.code) {
            settingsPixKeyEditViewModel.updateKeyError("Esta chave já está cadastrada.")
          }

          if (event.code == NetworkError.UserPixKeyRateLimitError.code) {
            settingsPixKeyEditViewModel.updateKeyError("Limite de chaves cadastradas atingido.")
          }
        }
      }
    }
  }

  Modal(
    modalState = modalState,
    modalContent = {
      PixTypeModal(
        settingsPixKeyEditViewModel = settingsPixKeyEditViewModel,
        settingsPixKeyEditState = settingsPixKeyEditState,
        onCloseModal = { onClosePixTypeModal() }
      )
    }
  ) {
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
        if (settingsPixKeyEditState.isGetPixDataLoading) {

        } else if (settingsPixKeyEditState.pixData != null) {
          Text(
            text = "Editar Chave Pix",
            style = MaterialTheme.typography.bodyLarge
          )

          Input(
            label = "Tipo de Chave Pix",
            value = if (settingsPixKeyEditState.keyType != null) settingsPixKeyEditState.keyType.title else "Escolha um tipo de Chave Pix",
            error = settingsPixKeyEditState.keyTypeError,
            isReadOnly = true,
            onClick = { if (!settingsPixKeyEditState.isUpdatePixDataLoading) onOpenPixTypeModal() },
            customIcon = {
              Icon(
                modifier = Modifier
                  .size(iconSize)
                  .noRippleClickable { if (!settingsPixKeyEditState.isUpdatePixDataLoading) onOpenPixTypeModal() },
                imageVector = Icons.UIActions.Outlined.ExpandMore,
                contentDescription = null,
                tint = iconColor
              )
            },
            onValueChange = { }
          )

          Input(
            label = "Chave Pix",
            type = when (settingsPixKeyEditState.keyType) {
              SettingsPixKeyEditKeyType.CPF -> InputType.CPF
              SettingsPixKeyEditKeyType.PHONE -> InputType.PHONE
              SettingsPixKeyEditKeyType.EMAIL -> InputType.EMAIL
              SettingsPixKeyEditKeyType.RANDOM_KEY -> InputType.TEXT
              else -> InputType.TEXT
            },
            value = settingsPixKeyEditState.key,
            error = settingsPixKeyEditState.keyError,
            placeholder = when (settingsPixKeyEditState.keyType) {
              SettingsPixKeyEditKeyType.CPF -> "000.000.000-00"
              SettingsPixKeyEditKeyType.PHONE -> "(00) 9 0000-0000"
              SettingsPixKeyEditKeyType.EMAIL -> "jhondoe@example.com"
              SettingsPixKeyEditKeyType.RANDOM_KEY -> ""
              else -> ""
            },
            isDisabled = settingsPixKeyEditState.keyType == null,
            onValueChange = { settingsPixKeyEditViewModel.setKey(it) }
          )

          Button(
            text = "Salvar",
            isLoading = settingsPixKeyEditState.isUpdatePixDataLoading,
            onClick = { settingsPixKeyEditViewModel.updateUserPixKey() }
          )
        }
      }
    }
  }
}

@Composable
private fun PixTypeModal(
  settingsPixKeyEditViewModel: SettingsPixKeyEditViewModel,
  settingsPixKeyEditState: SettingsPixKeyEditState,
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
        isSelected = settingsPixKeyEditState.keyType != null && settingsPixKeyEditState.keyType == SettingsPixKeyEditKeyType.CPF,
        onClick = {
          settingsPixKeyEditViewModel.setKeyType(SettingsPixKeyEditKeyType.CPF)

          onCloseModal()
        }
      )

      PixType(
        name = "Chave de celular",
        isSelected = settingsPixKeyEditState.keyType != null && settingsPixKeyEditState.keyType == SettingsPixKeyEditKeyType.PHONE,
        onClick = {
          settingsPixKeyEditViewModel.setKeyType(SettingsPixKeyEditKeyType.PHONE)

          onCloseModal()
        }
      )

      PixType(
        name = "Chave de e-mail",
        isSelected = settingsPixKeyEditState.keyType != null && settingsPixKeyEditState.keyType == SettingsPixKeyEditKeyType.EMAIL,
        onClick = {
          settingsPixKeyEditViewModel.setKeyType(SettingsPixKeyEditKeyType.EMAIL)

          onCloseModal()
        }
      )

      PixType(
        name = "Chave aleatória",
        isSelected = settingsPixKeyEditState.keyType != null && settingsPixKeyEditState.keyType == SettingsPixKeyEditKeyType.RANDOM_KEY,
        onClick = {
          settingsPixKeyEditViewModel.setKeyType(SettingsPixKeyEditKeyType.RANDOM_KEY)

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