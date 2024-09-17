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
import com.marinetes.network.serializations.marinetes.user.api.UserPixData
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.SettingsPixKeyListState
import com.marinetes.viewmodels.SettingsPixKeyListViewModel
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun SettingsPixKeyListScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  settingsPixKeyListViewModel: SettingsPixKeyListViewModel
) {
  val navigationActions = NavigationActions(navController = navController)

  val settingsPixKeyListState = settingsPixKeyListViewModel.state.collectAsState().value

  val pullRefreshState = rememberPullRefreshState(
    refreshing = settingsPixKeyListState.isLoading,
    onRefresh = { settingsPixKeyListViewModel.getUserPixesWithLoading() }
  )

  val (currentPixData, setCurrentPixData) = remember { mutableStateOf<UserPixData?>(null) }

  val coroutineScope = rememberCoroutineScope()
  val modalState = rememberModalBottomSheetState(initialValue = ModalBottomSheetValue.Hidden)

  val containerPadding = 20.dp

  fun onOpenPixDataModal(pixData: UserPixData) {
    setCurrentPixData(pixData)

    coroutineScope.launch {
      modalState.show()
    }
  }

  fun onClosePixDataModal() {
    setCurrentPixData(null)

    coroutineScope.launch {
      modalState.hide()
    }
  }

  BackHandler {
    navigationActions.goBack()

    settingsPixKeyListViewModel.resetState()
  }

  LaunchedEffect(key1 = Unit) {
    settingsPixKeyListViewModel.getUserPixesWithLoading()
  }

  Modal(
    modalState = modalState,
    modalContent = {
      if (currentPixData != null) {
        PixDataModal(
          navigationActions = navigationActions,
          pixData = currentPixData,
          onCloseModal = { onClosePixDataModal() },
          onDeletePixData = { settingsPixKeyListViewModel.deleteUserPixData(pixDataId = currentPixData.id) }
        )
      }
    }
  ) {
    DefaultLayout(
      functions = mutableMapOf("onClickFloatingButton" to { navigationActions.navigateToSettingsPixKeyCreate() }),
      navController = navController,
      authenticationViewModel = authenticationViewModel,
    ) {
      val pixesIsEmpty = settingsPixKeyListState.pixes.isEmpty()

      Column(
        modifier = if (pixesIsEmpty) Modifier.fillMaxSize().padding(all = containerPadding)
        else Modifier
          .fillMaxSize()
          .pullRefresh(pullRefreshState)
          .verticalScroll(rememberScrollState())
          .padding(all = containerPadding),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = if (pixesIsEmpty) Arrangement.Center else Arrangement.Top
      ) {
        if (settingsPixKeyListState.isLoading) {
          PixesLoader()
        } else if (pixesIsEmpty) {
          PixesEmpty()
        } else {
          PixesList(
            settingsPixKeyListState = settingsPixKeyListState,
            onOpenPixDataModal = { onOpenPixDataModal(it) }
          )

          PullRefreshIndicator(
            refreshing = settingsPixKeyListState.isLoading,
            state = pullRefreshState
          )
        }
      }
    }
  }
}

@Composable
private fun PixesLoader() {
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
private fun PixesEmpty() {
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
      imageVector = Icons.UIActions.Outlined.Key,
      contentDescription = null,
      tint = iconColor
    )

    Text(
      text = "Nenhum chave\ncadastrada!",
      style = MaterialTheme.typography.titleLarge.copy(textAlign = TextAlign.Center)
    )

    Spacer(modifier = Modifier.height(containerGap))

    Text(
      text = "Cadastre uma nova chave\nclicando no botão \"+\" abaixo.",
      style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center)
    )
  }
}

@Composable
private fun PixesList(
  settingsPixKeyListState: SettingsPixKeyListState,
  onOpenPixDataModal: (pixData: UserPixData) -> Unit,
) {
  val mainGap = 20.dp

  Column(
    modifier = Modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Text(
      text = "Chaves Pix cadastradas",
      style = MaterialTheme.typography.bodyLarge
    )

    Column(
      modifier = Modifier.fillMaxSize(),
      verticalArrangement = Arrangement.spacedBy(mainGap)
    ) {
      for (pixData in settingsPixKeyListState.pixes) {
        PixDataCard(
          pixData = pixData,
          onClick = { onOpenPixDataModal(pixData) }
        )
      }
    }
  }
}

@Composable
private fun PixDataCard(
  pixData: UserPixData,
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
        imageVector = Icons.UIActions.Outlined.Key,
        modifier = Modifier.size(iconSize),
        tint = iconColor,
        contentDescription = null
      )

      Column {
        Text(
          text = when (pixData.keyType) {
            "cpf" -> "CPF"
            "phone" -> "Celular"
            "email" -> "E-mail"
            "random_key" -> "Chave aleatória"
            else -> ""
          },
          style = MaterialTheme.typography.bodyLarge.copy(color = titleColor)
        )

        Text(
          text = pixData.key,
          maxLines = 1,
          overflow = TextOverflow.Ellipsis,
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
private fun PixDataModal(
  navigationActions: NavigationActions,
  pixData: UserPixData,
  onCloseModal: () -> Any? = { null },
  onDeletePixData: () -> Any,
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
        text = "Deseja mesmo deletar a chave \"${pixData.key}\"?",
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
            onDeletePixData()

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
          text = when (pixData.keyType) {
            "cpf" -> "CPF"
            "phone" -> "Celular"
            "email" -> "E-mail"
            "random_key" -> "Chave aleatória"
            else -> ""
          },
          style = MaterialTheme.typography.titleLarge.copy(color = titleColor)
        )

        Text(
          text = pixData.key,
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

            navigationActions.navigateToSettingsPixEdit(pixDataId = pixData.id)
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