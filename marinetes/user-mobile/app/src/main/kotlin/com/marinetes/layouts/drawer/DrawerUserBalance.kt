package com.marinetes.layouts.drawer

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.marinetes.navigation.NavigationActions
import com.marinetes.network.serializations.marinetes.user.api.UserWallet
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.utils.CurrencyUtils

@Composable
fun DrawerUserBalance(
  navController: NavHostController,
  walletState: UserWallet,
  onCloseDrawer: () -> Unit,
) {
  val navigationActions = NavigationActions(navController = navController)

  val mainGap = 5.dp

  val containerHorizontalMargin = 20.dp
  val containerHorizontalPadding = 20.dp
  val containerVerticalPadding = 10.dp
  val containerBorderRadius = 10.dp
  val containerColor = Colors.GREEN_300

  val iconSize = 30.dp

  val textColor = Colors.WHITE
  val iconColor = Colors.WHITE

  val balanceAvailable = CurrencyUtils.convertUnitToDouble(walletState.balanceAvailable)
  val blockedBalance = CurrencyUtils.convertUnitToDouble(walletState.blockedBalance)

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .padding(horizontal = containerHorizontalMargin)
      .background(
        color = containerColor,
        shape = RoundedCornerShape(containerBorderRadius)
      )
      .padding(horizontal = containerHorizontalPadding, vertical = containerVerticalPadding),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween,
  ) {
    Column(
      verticalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      Column {
        Text(
          text = "Saldo disponível",
          style = MaterialTheme.typography.bodySmall.copy(color = textColor)
        )

        Text(
          text = CurrencyUtils.convertQuantityToLocalCurrency(balanceAvailable),
          style = MaterialTheme.typography.bodyLarge.copy(color = textColor)
        )
      }

      Column {
        Text(
          text = "Saldo bloqueado",
          style = MaterialTheme.typography.bodySmall.copy(
            color = textColor,
            fontSize = 10.sp,
          )
        )

        Text(
          text = CurrencyUtils.convertQuantityToLocalCurrency(blockedBalance),
          style = MaterialTheme.typography.bodyLarge.copy(
            color = textColor,
          )
        )
      }
    }

    Column(
      modifier = Modifier.noRippleClickable {
        navigationActions.navigateToDepositCreate()

        onCloseDrawer()
      },
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      Icon(
        imageVector = Icons.BusinessAndPayments.Outlined.MonetizationOn,
        modifier = Modifier.size(iconSize),
        tint = iconColor,
        contentDescription = null,
      )

      Text(
        text = "Depositar",
        style = MaterialTheme.typography.bodySmall.copy(color = textColor)
      )
    }
  }
}