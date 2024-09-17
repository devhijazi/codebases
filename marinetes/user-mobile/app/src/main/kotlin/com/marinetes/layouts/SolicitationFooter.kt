package com.marinetes.layouts

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.marinetes.config.MarinetesServiceTable
import com.marinetes.navigation.NavigationActions
import com.marinetes.navigation.NavigationRoutes
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.shadow
import com.marinetes.utils.CurrencyUtils
import com.marinetes.viewmodels.SolicitationState
import com.marinetes.viewmodels.SolicitationViewModel

@Composable
fun SolicitationFooter(
  navController: NavHostController,
  solicitationViewModel: SolicitationViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val currentBackStackEntryAsState by navController.currentBackStackEntryAsState()
  val currentRoute = currentBackStackEntryAsState?.destination?.route

  val solicitationState = solicitationViewModel.state.collectAsState().value

  val mainWeight = 1F

  val containerShadowBlurRadius = 10.dp
  val containerShadowOffsetX = 10.dp

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .shadow(
        color = Colors.GRAY_300,
        blurRadius = containerShadowBlurRadius,
        offsetX = containerShadowOffsetX,
      )
      .background(color = Colors.WHITE),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween
  ) {
    FooterDetails(
      modifier = Modifier.weight(mainWeight),
      solicitationState = solicitationState,
      solicitationViewModel = solicitationViewModel
    )

    FooterItem(
      title = "Agenda",
      icon = Icons.CommonActions.Outlined.CalendarMonth,
      isSelected = NavigationRoutes.ScheduleList == currentRoute,
      modifier = Modifier.weight(mainWeight),
      onClick = { navigationActions.navigateToScheduleList() }
    )
  }
}

@Composable
private fun FooterDetails(
  modifier: Modifier,
  solicitationState: SolicitationState,
  solicitationViewModel: SolicitationViewModel
) {
  val containerPaddingHorizontal = 10.dp
  val containerPaddingVertical = 10.dp

  LaunchedEffect(
    key1 = solicitationState.address,
    key2 = solicitationState.selectedServices
  ) {
    val namesOfSelectedServices = solicitationState.selectedServices.map { it.title }

    val estimatedValue = MarinetesServiceTable.calculateEstimatedValue(
      area = solicitationState.address?.squareMeters ?: 0.0,
      services = namesOfSelectedServices
    )

    solicitationViewModel.setEstimatedValue(CurrencyUtils.convertDoubleToUnit(estimatedValue))
  }

  Column(
    modifier = modifier
      .padding(
        horizontal = containerPaddingHorizontal,
        vertical = containerPaddingVertical
      ),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center,
  ) {
    Column {
      Text(
        text = "Valor estimado",
        style = MaterialTheme.typography.bodySmall
      )

      Text(
        text = CurrencyUtils.convertQuantityToLocalCurrency(
          CurrencyUtils.convertUnitToDouble(solicitationState.estimatedValue)
        ),
        style = MaterialTheme.typography.titleLarge.copy(color = Colors.GREEN_300)
      )
    }
  }
}

@Composable
private fun FooterItem(
  title: String,
  icon: ImageVector,
  isSelected: Boolean,
  modifier: Modifier,
  onClick: () -> Unit,
) {
  val itemContainerPaddingHorizontal = 10.dp
  val itemContainerPaddingVertical = 10.dp

  val itemIconSize = 30.dp

  val itemIconColorNormal = Colors.GRAY_500
  val itemTextColorNormal = Colors.GRAY_500

  val itemIconColorSelected = Colors.GREEN_300
  val itemTextColorSelected = Colors.GREEN_300

  val iconColor = if (isSelected) itemIconColorSelected else itemIconColorNormal
  val textColor = if (isSelected) itemTextColorSelected else itemTextColorNormal

  Column(
    modifier = modifier
      .clickable { onClick() }
      .padding(
        horizontal = itemContainerPaddingHorizontal,
        vertical = itemContainerPaddingVertical
      ),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    Icon(
      imageVector = icon,
      modifier = Modifier.size(itemIconSize),
      tint = iconColor,
      contentDescription = null,
    )

    Text(
      text = title,
      style = MaterialTheme.typography.bodyMedium.copy(color = textColor)
    )
  }
}

@Composable
fun SolicitationFooterButton(
  solicitationViewModel: SolicitationViewModel
) {
  FloatingActionButton(
    modifier = Modifier
      .size(70.dp)
      .offset(y = 60.dp),
    contentColor = Colors.WHITE,
    containerColor = Colors.GREEN_300,
    shape = RoundedCornerShape(100.dp),
    onClick = { solicitationViewModel.validateAddressAndServicesAndDate() },
  ) {
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.Center
    ) {
      Icon(
        imageVector = Icons.Household.Outlined.RoomService,
        modifier = Modifier.size(30.dp),
        tint = Colors.WHITE,
        contentDescription = null,
      )

      Text(
        text = "Solicitar",
        style = MaterialTheme.typography.bodySmall.copy(color = Colors.WHITE)
      )
    }
  }
}
