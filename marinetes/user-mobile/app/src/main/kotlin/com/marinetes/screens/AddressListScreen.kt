package com.marinetes.screens

import androidx.activity.compose.BackHandler
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetValue
import androidx.compose.material.pullrefresh.PullRefreshIndicator
import androidx.compose.material.pullrefresh.pullRefresh
import androidx.compose.material.pullrefresh.rememberPullRefreshState
import androidx.compose.material3.Text
import androidx.compose.material.rememberModalBottomSheetState
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.Button
import com.marinetes.components.Shimmer
import com.marinetes.layouts.DefaultLayout
import com.marinetes.layouts.Modal
import com.marinetes.navigation.NavigationActions
import com.marinetes.network.serializations.marinetes.user.api.UserAddress
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.viewmodels.AddressListState
import com.marinetes.viewmodels.AddressListViewModel
import com.marinetes.viewmodels.AuthenticationViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun AddressListScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  addressListViewModel: AddressListViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val addressListState = addressListViewModel.state.collectAsState().value

  val pullRefreshState = rememberPullRefreshState(
    refreshing = addressListState.isLoading,
    onRefresh = { addressListViewModel.getUserAddressesWithLoading() }
  )

  val (currentAddress, setCurrentAddress) = remember { mutableStateOf<UserAddress?>(null) }

  val coroutineScope = rememberCoroutineScope()
  val modalState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden)

  val containerPadding = 20.dp

  fun onOpenAddressModal(address: UserAddress) {
    setCurrentAddress(address)

    coroutineScope.launch {
      modalState.show()
    }
  }

  fun onCloseAddressModal() {
    setCurrentAddress(null)

    coroutineScope.launch {
      modalState.hide()
    }
  }

  BackHandler {
    navigationActions.goBack()

    addressListViewModel.resetState()
  }

  LaunchedEffect(key1 = Unit) {
    addressListViewModel.getUserAddressesWithLoading()
  }

  Modal(
    modalState = modalState,
    modalContent = {
      if (currentAddress != null) {
        AddressModal(
          navigationActions = navigationActions,
          address = currentAddress,
          onCloseModal = { onCloseAddressModal() },
          onDeleteAddress = { addressListViewModel.deleteUserAddress(addressId = currentAddress.id) }
        )
      }
    }
  ) {
    DefaultLayout(
      functions = mutableMapOf("onClickFloatingButton" to { navigationActions.navigateToAddressAdd() }),
      navController = navController,
      authenticationViewModel = authenticationViewModel
    ) {
      val addressesIsEmpty = addressListState.addresses.isEmpty()

      Column(
        modifier = if (addressesIsEmpty) Modifier.fillMaxSize().padding(all = containerPadding)
        else Modifier
          .fillMaxSize()
          .pullRefresh(pullRefreshState)
          .verticalScroll(rememberScrollState())
          .padding(all = containerPadding),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = if (addressesIsEmpty) Arrangement.Center else Arrangement.Top
      ) {
        if (addressListState.isLoading) {
          AddressesLoader()
        } else if (addressesIsEmpty) {
          AddressesEmpty()
        } else {
          AddressesList(
            addressListState = addressListState,
            onOpenAddressModal = { onOpenAddressModal(it) }
          )

          PullRefreshIndicator(
            refreshing = addressListState.isLoading,
            state = pullRefreshState
          )
        }
      }
    }
  }
}

@Composable
private fun AddressesLoader() {
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
private fun AddressesEmpty() {
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
      imageVector = Icons.UIActions.Outlined.Home,
      contentDescription = null,
      tint = iconColor
    )

    Text(
      text = "Nenhum endereço\ncadastrado!",
      style = MaterialTheme.typography.titleLarge.copy(textAlign = TextAlign.Center)
    )

    Spacer(modifier = Modifier.height(containerGap))

    Text(
      text = "Adicione um novo endereço\nclicando no botão \"+\" abaixo.",
      style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
    )
  }
}

@Composable
private fun AddressesList(
  addressListState: AddressListState,
  onOpenAddressModal: (address: UserAddress) -> Unit,
) {
  val mainGap = 20.dp

  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Text(
      text = "Meus locais",
      style = MaterialTheme.typography.bodyLarge
    )

    Column(
      modifier = Modifier.fillMaxSize(),
      verticalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      for (address in addressListState.addresses) {
        AddressCard(
          address = address,
          onClick = { onOpenAddressModal(address) }
        )
      }
    }
  }
}

@Composable
private fun AddressCard(
  address: UserAddress,
  onClick: () -> Unit,
) {
  val cardHeight = 100.dp
  val cardPadding = 20.dp
  val cardGap = 20.dp
  val cardBorderRadius = 10.dp
  val cardBackgroundColor = Colors.WHITE

  val iconSize = 35.dp
  val iconColor = Colors.GREEN_400

  val titleColor = Colors.BLACK

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .height(cardHeight)
      .clip(shape = RoundedCornerShape(cardBorderRadius))
      .clickable { onClick() }
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
        imageVector = Icons.UIActions.Outlined.Home,
        modifier = Modifier.size(iconSize),
        tint = iconColor,
        contentDescription = null
      )

      Column {
        Text(
          text = address.title,
          style = MaterialTheme.typography.bodyLarge.copy(color = titleColor)
        )

        Text(
          text = "${address.street} ${if (address.number == "S/N") "" else address.number}",
          maxLines = 1,
          overflow = TextOverflow.Ellipsis,
          style = MaterialTheme.typography.bodySmall
        )

        Text(
          text = "${address.city} - ${address.state}",
          style = MaterialTheme.typography.bodySmall
        )
      }
    }

    Icon(
      imageVector = Icons.UIActions.Outlined.MoreVert,
      modifier = Modifier.size(iconSize),
      tint = iconColor,
      contentDescription = null
    )
  }
}

@Composable
private fun AddressModal(
  navigationActions: NavigationActions,
  address: UserAddress,
  onCloseModal: () -> Any? = { null },
  onDeleteAddress: () -> Any,
) {
  val (isDelete, setIsDelete) = remember { mutableStateOf(false) }

  val mainGap = 30.dp

  val titleColor = Colors.BLACK

  val buttonWeight = 0.50F
  val buttonGap = 10.dp
  val buttonBackgroundColor = Colors.INPUT
  val buttonIconSize = 25.dp
  val buttonIconColor = Colors.GRAY_500
  val buttonTextColor = Colors.GRAY_500

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(mainGap),
  ) {
    if (isDelete) {
      Text(
        text = "Deseja mesmo deletar \"${address.title}\"?",
        style = MaterialTheme.typography.titleLarge.copy(
          color = titleColor,
          textAlign = TextAlign.Center
        )
      )

      Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        Button(
          modifier = Modifier.weight(buttonWeight),
          text = "Sim",
          textColor = buttonTextColor,
          backgroundColor = buttonBackgroundColor,
          onClick = {
            onCloseModal()
            onDeleteAddress()

            setIsDelete(false)
          }
        )

        Button(
          modifier = Modifier.weight(buttonWeight),
          text = "Não",
          backgroundColor = Colors.GREEN_300,
          onClick = {
            onCloseModal()

            setIsDelete(false)
          }
        )
      }
    } else {
      Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
      ) {
        Text(
          text = address.title,
          style = MaterialTheme.typography.titleLarge.copy(color = titleColor)
        )

        Text(
          text = "${address.street} ${if (address.number == "S/N") "" else address.number}",
          style = MaterialTheme.typography.bodyMedium
        )

        Text(
          text = address.neighborhood,
          style = MaterialTheme.typography.bodyMedium
        )

        Text(
          text = "${address.city} - ${address.state}",
          style = MaterialTheme.typography.bodyMedium
        )
      }

      Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(mainGap)
      ) {
        Button(
          modifier = Modifier.weight(buttonWeight),
          backgroundColor = buttonBackgroundColor,
          onClick = {
            onCloseModal()

            navigationActions.navigateToAddressEdit(addressId = address.id)
          }
        ) {
          Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(buttonGap)
          ) {
            Icon(
              modifier = Modifier.size(buttonIconSize),
              imageVector = Icons.CommonActions.Outlined.Edit,
              contentDescription = null,
              tint = buttonIconColor
            )

            Text(
              text = "Editar",
              style = MaterialTheme.typography.bodyLarge
            )
          }
        }

        Button(
          modifier = Modifier.weight(buttonWeight),
          backgroundColor = buttonBackgroundColor,
          onClick = { setIsDelete(!isDelete) }
        ) {
          Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(buttonGap)
          ) {
            Icon(
              modifier = Modifier.size(buttonIconSize),
              imageVector = Icons.UIActions.Outlined.Delete,
              contentDescription = null,
              tint = buttonIconColor
            )

            Text(
              text = "Excluir",
              style = MaterialTheme.typography.bodyLarge
            )
          }
        }
      }
    }
  }
}