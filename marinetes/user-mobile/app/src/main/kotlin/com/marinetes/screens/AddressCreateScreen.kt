package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.CheckBox
import com.marinetes.components.Counter
import com.marinetes.components.IconWithText
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.viewmodels.AddressCreateCategory
import com.marinetes.viewmodels.AddressAddEvent
import com.marinetes.viewmodels.AddressCreateType
import com.marinetes.viewmodels.AddressCreateViewModel
import com.marinetes.viewmodels.AuthenticationViewModel
import kotlinx.coroutines.launch

@Composable
fun AddressCreateScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  addressCreateViewModel: AddressCreateViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val coroutineScope = rememberCoroutineScope()

  val addressCreateState = addressCreateViewModel.state.collectAsState().value

  val mainGap = 15.dp

  val containerPadding = 20.dp

  fun onGoBack() {
    navigationActions.goBack()

    addressCreateViewModel.resetState()
  }

  BackHandler { onGoBack() }

  LaunchedEffect(key1 = addressCreateState) {
    addressCreateViewModel.event.collect { event ->
      when (event) {
        is AddressAddEvent.GetCep -> {
          addressCreateViewModel.fetchCep(event.cep)
        }

        is AddressAddEvent.CepFetched -> {}

        is AddressAddEvent.CepError -> {
          addressCreateViewModel.updateZipCodeError("CEP não encontrado.")
        }

        is AddressAddEvent.AddressCreated -> {
          onGoBack()
        }

      }
    }
  }

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .padding(all = containerPadding),
      verticalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      Text(
        text = "Cadastro de local",
        style = MaterialTheme.typography.bodyLarge
      )

      Input(
        label = "Título",
        value = addressCreateState.title,
        error = addressCreateState.titleError,
        onValueChange = { addressCreateViewModel.setTitle(it) }
      )

      Text(
        text = "Endereço",
        style = MaterialTheme.typography.bodyMedium
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        Input(
          label = "CEP",
          type = InputType.CEP,
          value = addressCreateState.zipCode,
          error = addressCreateState.zipCodeError,
          containerModifier = Modifier.weight(0.40F),
          onValueChange = {
            coroutineScope.launch {
              addressCreateViewModel.setZipCode(it)
            }
          }
        )

        Input(
          label = "Rua",
          value = addressCreateState.street,
          containerModifier = Modifier.weight(0.60F),
          isDisabled = true,
          onValueChange = {}
        )
      }

      Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        Input(
          label = "Número",
          value = addressCreateState.number,
          error = addressCreateState.numberError,
          isDisabled = addressCreateState.isNoNumber,
          containerModifier = Modifier.weight(0.50F),
          onValueChange = { addressCreateViewModel.setNumber(it) }
        )

        CheckBox(
          label = "Sem número",
          checked = addressCreateState.isNoNumber,
          modifier = Modifier.weight(0.50F),
          checkedColor = Colors.GRAY_500,
          uncheckedColor = Colors.GRAY_500,
          textColor = Colors.GRAY_500,
          onCheckedChange = { addressCreateViewModel.setIsNoNumber(it) }
        )
      }

      Input(
        label = "Complemento",
        value = addressCreateState.complement,
        onValueChange = { addressCreateViewModel.setComplement(it) }
      )

      Input(
        label = "Bairro",
        value = addressCreateState.neighborhood,
        isDisabled = true,
        onValueChange = {}
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        Input(
          label = "Cidade",
          value = addressCreateState.city,
          containerModifier = Modifier.weight(0.70F),
          isDisabled = true,
          onValueChange = {}
        )

        Input(
          label = "Estado",
          value = addressCreateState.uf,
          containerModifier = Modifier.weight(0.30F),
          isDisabled = true,
          onValueChange = {}
        )
      }

      Text(
        text = "Categoria",
        style = MaterialTheme.typography.bodyMedium
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        IconWithText(
          icon = Icons.UIActions.Outlined.Home,
          text = "Residência",
          selected = addressCreateState.category == AddressCreateCategory.RESIDENCE,
          onClick = { addressCreateViewModel.setCategory(AddressCreateCategory.RESIDENCE) }
        )

        IconWithText(
          icon = Icons.BusinessAndPayments.Outlined.Storefront,
          text = "Est. comercial",
          selected = addressCreateState.category == AddressCreateCategory.COMMERCIAL_PLACE,
          onClick = { addressCreateViewModel.setCategory(AddressCreateCategory.COMMERCIAL_PLACE) }
        )
      }

      Text(
        text = "Tipo",
        style = MaterialTheme.typography.bodyMedium
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        IconWithText(
          icon = Icons.UIActions.Outlined.Home,
          text = "Térreo",
          selected = addressCreateState.type == AddressCreateType.GROUND_FLOOR,
          onClick = { addressCreateViewModel.setType(AddressCreateType.GROUND_FLOOR) }
        )

        IconWithText(
          icon = Icons.Maps.Outlined.HomeWork,
          text = "Sobrado",
          selected = addressCreateState.type == AddressCreateType.LOFT,
          onClick = { addressCreateViewModel.setType(AddressCreateType.LOFT) }
        )

        IconWithText(
          icon = Icons.Travel.Outlined.Apartment,
          text = "Apartamento",
          selected = addressCreateState.type == AddressCreateType.APARTMENT,
          onClick = { addressCreateViewModel.setType(AddressCreateType.APARTMENT) }
        )
      }

      Text(
        text = "Quantidade de cômodos",
        style = MaterialTheme.typography.bodyMedium
      )

      Counter(
        value = addressCreateState.rooms,
        onIncrement = { addressCreateViewModel.setRooms(it) },
        onDecrement = { addressCreateViewModel.setRooms(it) }
      )

      Text(
        text = "Metragem",
        style = MaterialTheme.typography.bodyMedium
      )

      Input(
        label = "",
        value = addressCreateState.squareMeters,
        error = addressCreateState.squareMetersError,
        inputModifier = Modifier
          .width(100.dp)
          .height(50.dp),
        errorModifier = Modifier.align(alignment = Alignment.Start),
        onValueChange = { addressCreateViewModel.setSquareMeters(it) }
      )

      Button(
        text = "Cadastrar",
        isLoading = addressCreateState.isLoading,
        onClick = { addressCreateViewModel.createAddress() }
      )
    }
  }
}