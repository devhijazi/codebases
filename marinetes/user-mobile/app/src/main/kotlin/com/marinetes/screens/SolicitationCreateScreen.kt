package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
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
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.marinetes.R
import com.marinetes.components.CarouselSlider
import com.marinetes.components.DateCard
import com.marinetes.components.IconWithText
import com.marinetes.components.Input
import com.marinetes.components.Shimmer
import com.marinetes.layouts.DefaultLayout
import com.marinetes.layouts.Modal
import com.marinetes.navigation.NavigationActions
import com.marinetes.navigation.NavigationRoutes
import com.marinetes.network.NetworkError
import com.marinetes.network.serializations.marinetes.user.api.UserAddress
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.theme.showMessage
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SolicitationEvent
import com.marinetes.viewmodels.SolicitationModal
import com.marinetes.viewmodels.SolicitationState
import com.marinetes.viewmodels.SolicitationViewModel
import kotlinx.coroutines.launch
import androidx.compose.runtime.*

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun SolicitationCreateScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  solicitationViewModel: SolicitationViewModel
) {
  val context = LocalContext.current

  val navigationActions = NavigationActions(navController = navController)

  val coroutineScope = rememberCoroutineScope()
  val modalState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden)

  val authenticationState = authenticationViewModel.state.collectAsState().value
  val solicitationState = solicitationViewModel.state.collectAsState().value

  val mainMargin = 20.dp

  val containerMarginTop = 20.dp
  val containerMarginBottom = 110.dp
  val containerGap = 10.dp

  val iconSize = 30.dp
  val iconColor = Colors.GRAY_400

  fun onOpenModal() {
    coroutineScope.launch {
      modalState.show()
    }
  }

  fun onCloseModal() {
    coroutineScope.launch {
      modalState.hide()
    }
  }

  BackHandler {}

  LaunchedEffect(key1 = Unit) {
    solicitationViewModel.connectCallerWebsocket(userId = authenticationState.user?.id.toString())
  }

  LaunchedEffect(key1 = Unit) {
    solicitationViewModel.getServices()
    solicitationViewModel.getUserAddresses()
  }

  DisposableEffect(key1 = navController) {
    navController.addOnDestinationChangedListener { _, destination, _ ->
      if (destination.route != NavigationRoutes.SolicitationStatus) {
        solicitationViewModel.resetState()
      }
    }

    onDispose {
      navController.removeOnDestinationChangedListener { _, destination, _ ->
        if (destination.route != NavigationRoutes.SolicitationStatus) {
          solicitationViewModel.resetState()
        }
      }
    }
  }

  LaunchedEffect(key1 = solicitationState) {
    solicitationViewModel.event.collect { event ->
      when (event) {
        is SolicitationEvent.AddressAndServicesAndDateValidated -> {
          solicitationViewModel.createBudget()
        }

        is SolicitationEvent.BudgetCreated -> {
          navigationActions.navigateToSolicitationStatus(budgetId = event.budgetId)
        }

        is SolicitationEvent.BudgetError -> {
          if (event.code == NetworkError.InsuficientFundsError.code) {
            context.showMessage("Saldo insuficiente.")
          }

          if (event.code == NetworkError.BadRequestError.code) {
            solicitationViewModel.updateDateError("Selecione outra data")
          }
        }

        else -> {}
      }
    }
  }

  Modal(
    modalState = modalState,
    modalContent = {
      when (solicitationState.modal) {
        SolicitationModal.SELECT_ADDRESS -> {
          SelectAddressModal(
            solicitationState = solicitationState,
            solicitationViewModel = solicitationViewModel,
            onCloseModal = { onCloseModal() }
          )
        }

        else -> {}
      }
    }
  ) {
    DefaultLayout(
      navController = navController,
      authenticationViewModel = authenticationViewModel,
      solicitationViewModel = solicitationViewModel
    ) {
      Column(
        modifier = Modifier
          .fillMaxSize()
          .verticalScroll(rememberScrollState())
          .padding(top = containerMarginTop, bottom = containerMarginBottom),
        verticalArrangement = Arrangement.spacedBy(containerGap)
      ) {
        val isLoading =
          solicitationState.isLoadingToGetServices || solicitationState.isLoadingToGetUserAddresses

        if (isLoading) {
          Loader()
        } else {
          CarouselSlider(
            modifier = Modifier.padding(horizontal = mainMargin),
            autoplay = true,
            delayBetweenSlides = 4000,
            images = listOf(
              R.drawable.carousel_one,
              R.drawable.carousel_two,
              R.drawable.carousel_three,
            ),
          )

          Text(
            text = "Solicitar diarista",
            modifier = Modifier.padding(horizontal = mainMargin),
            style = MaterialTheme.typography.bodyLarge
          )

          Input(
            label = "Local",
            value = if (solicitationState.address != null) "${solicitationState.address.title} - ${solicitationState.address.street} - ${solicitationState.address.number}" else "",
            error = solicitationState.addressError,
            placeholder = "Selecione o local",
            isReadOnly = true,
            containerModifier = Modifier.padding(horizontal = mainMargin),
            onClick = {
              if (!solicitationState.isLoadingToCreateBudget) {
                solicitationViewModel.setModal(SolicitationModal.SELECT_ADDRESS)

                onOpenModal()
              }
            },
            customIcon = {
              Icon(
                modifier = Modifier
                  .size(iconSize)
                  .noRippleClickable {
                    if (!solicitationState.isLoadingToCreateBudget) {
                      solicitationViewModel.setModal(SolicitationModal.SELECT_ADDRESS)

                      onOpenModal()
                    }
                  },
                imageVector = Icons.UIActions.Outlined.ExpandMore,
                contentDescription = null,
                tint = iconColor
              )
            },
            onValueChange = { }
          )

          Text(
            text = "Tipo de serviço",
            modifier = Modifier.padding(horizontal = mainMargin),
            style = MaterialTheme.typography.bodyLarge
          )

          ServiceSelector(
            solicitationViewModel = solicitationViewModel
          )

          Text(
            text = "Data e hora",
            modifier = Modifier.padding(horizontal = mainMargin),
            style = MaterialTheme.typography.bodyLarge
          )

          DateCard(
            solicitationState = solicitationState,
            solicitationViewModel = solicitationViewModel,
          )
        }
      }
    }
  }
}

@Composable
private fun Loader() {
  val containerMargin = 20.dp
  val containerGap = 10.dp

  Column(
    modifier = Modifier.padding(containerMargin),
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    Shimmer(
      height = 130.dp,
    )

    Shimmer(
      width = 100.dp,
      height = 25.dp,
    )

    Shimmer(
      height = 60.dp,
    )

    Shimmer(
      width = 100.dp,
      height = 25.dp,
    )

    Shimmer(
      height = 100.dp,
    )

    Shimmer(
      width = 100.dp,
      height = 25.dp,
    )

    Shimmer(
      height = 100.dp,
    )
  }
}

@Composable
private fun ServiceSelector(
  solicitationViewModel: SolicitationViewModel
) {
  val services = solicitationViewModel.state.collectAsState().value.services

  val containerMargin = 20.dp
  val containerGap = 10.dp

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .padding(start = containerMargin, end = containerMargin)
      .horizontalScroll(rememberScrollState()),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    for (service in services) {
      val serviceIsSelelected = solicitationViewModel.isSelectedService(service)

      val buttonSize = 100.dp
      val buttonWeight = 1F
      val buttonIconSize = 35.dp
      val buttonFontSize = 14.sp
      val buttonPadding = 5.dp

      val icon = when (service.icon) {
        "maps-cleaning-services" -> Icons.Maps.Outlined.CleaningServices
        "household-cleaning-services" -> Icons.Household.Outlined.Flatware
        "maps-local-laundry-service" -> Icons.Maps.Outlined.LocalLaundryService
        else -> Icons.CommonActions.Outlined.Help
      }

      val title = when (service.title) {
        "cleaning" -> "Faxina"
        "cook" -> "Cozinhar"
        "wash-clothes" -> "Lavar roupa"
        else -> ""
      }

      IconWithText(
        icon = icon,
        text = title,
        selected = serviceIsSelelected,
        buttonSize = buttonSize,
        buttonModifier = Modifier.weight(buttonWeight),
        buttonIconSize = buttonIconSize,
        buttonFontSize = buttonFontSize,
        buttonPadding = PaddingValues(buttonPadding),
        onClick = {
          if (serviceIsSelelected) {
            solicitationViewModel.removeServiceAsSelected(service)
          } else {
            solicitationViewModel.addServiceAsSelected(service)
          }
        }
      )
    }
  }
}

@Composable
private fun SelectAddressModal(
  solicitationState: SolicitationState,
  solicitationViewModel: SolicitationViewModel,
  onCloseModal: () -> Any,
) {
  val addressesIsEmpty = solicitationState.addresses.isEmpty()

  val containerGap = 30.dp

  val titleColor = Colors.BLACK

  Column(
    modifier = Modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.spacedBy(if (addressesIsEmpty) containerGap - 20.dp else containerGap),
  ) {
    if (addressesIsEmpty) {
      Text(
        text = "Nenhuma endereço\ncadastrado encontrado",
        style = MaterialTheme.typography.titleLarge.copy(
          color = titleColor,
          textAlign = TextAlign.Center
        )
      )

      Text(
        text = "Cadastre um endereço para\npoder solicitar alguma diarista.",
        style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
      )
    } else {
      Text(
        text = "Escolha um Endereço",
        style = MaterialTheme.typography.titleLarge.copy(
          color = titleColor,
          textAlign = TextAlign.Center
        )
      )

      Column(
        verticalArrangement = Arrangement.spacedBy(containerGap / 2),
      ) {
        for (address in solicitationState.addresses) {
          AddressCard(
            address = address,
            isSelected = solicitationState.address != null && solicitationState.address.id == address.id,
            onClick = {
              solicitationViewModel.setAddress(address)

              onCloseModal()
            }
          )
        }
      }
    }
  }
}

@Composable
private fun AddressCard(
  address: UserAddress,
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
        text = address.title,
        style = MaterialTheme.typography.bodyLarge.copy(color = valueColor)
      )

      Text(
        text = "${address.street} - ${address.number} - ${address.zipCode}",
        style = MaterialTheme.typography.bodyMedium.copy(color = labelColor)
      )

      Text(
        text = address.neighborhood,
        style = MaterialTheme.typography.bodyMedium.copy(color = labelColor)
      )

      Text(
        text = "${address.city} - ${address.state}",
        style = MaterialTheme.typography.bodyMedium.copy(color = labelColor)
      )
    }
  }
}