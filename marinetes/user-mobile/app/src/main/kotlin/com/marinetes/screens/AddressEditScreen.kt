package com.marinetes.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.Counter
import com.marinetes.components.IconWithText
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.layouts.DefaultLayout
import com.marinetes.theme.Icons
import com.marinetes.viewmodels.AddressEditCategory
import com.marinetes.viewmodels.AddressEditType
import com.marinetes.viewmodels.AddressEditViewModel
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun AddressEditScreen(
  addressId: String,
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  addressEditViewModel: AddressEditViewModel
) {
  val addressEditState = addressEditViewModel.state.collectAsState().value

  val mainGap = 15.dp

  val containerPadding = 20.dp

  LaunchedEffect(key1 = addressId) {
    addressEditViewModel.getUserAddress(addressId = addressId)
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
      if (addressEditState.isGetAddressLoading) {

      } else if (addressEditState.address != null) {
        Text(
          text = "Editar de local",
          style = MaterialTheme.typography.bodyLarge
        )

        Input(
          label = "Título",
          value = addressEditState.title,
          error = addressEditState.titleError,
          onValueChange = { addressEditViewModel.setTitle(it) }
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
            value = addressEditState.address.zipCode,
            isDisabled = true,
            containerModifier = Modifier.weight(0.40F),
            onValueChange = {}
          )

          Input(
            label = "Rua",
            value = addressEditState.address.street,
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
            value = addressEditState.address.number,
            isDisabled = true,
            containerModifier = Modifier.weight(0.30F),
            onValueChange = {  }
          )

          Input(
            label = "Complemento",
            value = addressEditState.address.complement ?: "",
            isDisabled = true,
            containerModifier = Modifier.weight(0.70F),
            onValueChange = {  }
          )
        }

        Input(
          label = "Bairro",
          value = addressEditState.address.neighborhood,
          isDisabled = true,
          onValueChange = {}
        )

        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.spacedBy(mainGap)
        ) {
          Input(
            label = "Cidade",
            value = addressEditState.address.city,
            containerModifier = Modifier.weight(0.70F),
            isDisabled = true,
            onValueChange = {}
          )

          Input(
            label = "Estado",
            value = addressEditState.address.state,
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
            selected = addressEditState.category == AddressEditCategory.RESIDENCE,
            onClick = { addressEditViewModel.setCategory(AddressEditCategory.RESIDENCE) }
          )

          IconWithText(
            icon = Icons.BusinessAndPayments.Outlined.Storefront,
            text = "Est. comercial",
            selected = addressEditState.category == AddressEditCategory.COMMERCIAL_PLACE,
            onClick = { addressEditViewModel.setCategory(AddressEditCategory.COMMERCIAL_PLACE) }
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
            selected = addressEditState.type == AddressEditType.GROUND_FLOOR,
            onClick = { addressEditViewModel.setType(AddressEditType.GROUND_FLOOR) }
          )

          IconWithText(
            icon = Icons.Maps.Outlined.HomeWork,
            text = "Sobrado",
            selected = addressEditState.type == AddressEditType.LOFT,
            onClick = { addressEditViewModel.setType(AddressEditType.LOFT) }
          )

          IconWithText(
            icon = Icons.Travel.Outlined.Apartment,
            text = "Apartamento",
            selected = addressEditState.type == AddressEditType.APARTMENT,
            onClick = { addressEditViewModel.setType(AddressEditType.APARTMENT) }
          )
        }

        Text(
          text = "Quantidade de cômodos",
          style = MaterialTheme.typography.bodyMedium
        )

        Counter(
          value = addressEditState.rooms,
          onIncrement = { addressEditViewModel.setRooms(it) },
          onDecrement = { addressEditViewModel.setRooms(it) }
        )

        Text(
          text = "Metragem",
          style = MaterialTheme.typography.bodyMedium
        )

        Input(
          label = "",
          value = addressEditState.squareMeters,
          error = addressEditState.squareMetersError,
          inputModifier = Modifier
            .width(100.dp)
            .height(50.dp),
          errorModifier = Modifier.align(alignment = Alignment.Start),
          onValueChange = { addressEditViewModel.setSquareMeters(it) }
        )

        Button(
          text = "Salvar",
          isLoading = addressEditState.isUpdateAddressLoading,
          onClick = { addressEditViewModel.updateUserAddress() }
        )
      }
    }
  }
}