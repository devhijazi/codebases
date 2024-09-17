package com.marinetes.layouts

import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.R
import com.marinetes.navigation.NavigationActions
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.MarinetesTheme
import com.marinetes.theme.shadow
import com.google.accompanist.navigation.animation.rememberAnimatedNavController

@Composable
fun BackHeaderLayout(
  navController: NavHostController,
  onGoBack: () -> Unit? = { null },
) {
  val navigationActions = NavigationActions(navController = navController)

  val containerPadding = 15.dp

  val containerShadowBlurRadius = 10.dp
  val containerShadowOffsetY = 10.dp

  val iconSize = 40.dp
  val logoSize = iconSize + 10.dp

  Row(
    modifier = Modifier
      .fillMaxWidth()
      .shadow(
        color = Colors.GRAY_300,
        blurRadius = containerShadowBlurRadius,
        offsetY = containerShadowOffsetY,
      )
      .background(color = Colors.WHITE)
      .padding(containerPadding),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween
  ) {
    IconButton(
      onClick = {
        val goBackResult = onGoBack()

        if (goBackResult == null) {
          navigationActions.goBack()
        }
      }
    ) {
      Icon(
        imageVector = Icons.UIActions.Outlined.ArrowBackIos,
        modifier = Modifier.size(iconSize),
        tint = Colors.GREEN_300,
        contentDescription = null,
      )
    }

    Image(
      painter = painterResource(R.drawable.logo_green),
      contentDescription = "logo",
      modifier = Modifier.size(logoSize),
      contentScale = ContentScale.Crop
    )

    IconButton(onClick = { }) {
      Icon(
        imageVector = Icons.Communication.Filled.Notifications,
        modifier = Modifier.size(iconSize),
        tint = Colors.GREEN_300,
        contentDescription = null,
      )
    }
  }
}

@OptIn(ExperimentalAnimationApi::class)
@Preview
@Composable
private fun BackHeaderLayoutPreview() {
  val navController = rememberAnimatedNavController()

  MarinetesTheme {
    BackHeaderLayout(navController = navController)
  }
}