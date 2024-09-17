package com.marinetes.navigation

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavType
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.navArgument
import com.marinetes.screens.*
import com.marinetes.screens.RegisterScreen
import com.marinetes.utils.NotificationUtils
import com.marinetes.viewmodels.*
import com.google.accompanist.navigation.animation.AnimatedNavHost
import com.google.accompanist.navigation.animation.composable
import com.google.accompanist.navigation.animation.rememberAnimatedNavController

@OptIn(ExperimentalAnimationApi::class)
@Composable
fun NavigationController() {
  val context = LocalContext.current

  val notificationUtils = NotificationUtils(context)
  val diaristWaitingConfirmationNotificationId = 1
  val scheduleCanceledNotificationId = 2
  val scheduleDoneNotificationId = 3

  val navController = rememberAnimatedNavController()
  val navigationActions = NavigationActions(navController = navController)
  val currentBackStackEntryAsState by navController.currentBackStackEntryAsState()
  val currentRoute = currentBackStackEntryAsState?.destination?.route

  val authenticationViewModel: AuthenticationViewModel = hiltViewModel()
  val loginViewModel: LoginViewModel = hiltViewModel()
  val registerViewModel: RegisterViewModel = hiltViewModel()
  val solicitationViewModel: SolicitationViewModel = hiltViewModel()
  val addressCreateViewModel: AddressCreateViewModel = hiltViewModel()
  val addressListViewModel: AddressListViewModel = hiltViewModel()
  val addressEditViewModel: AddressEditViewModel = hiltViewModel()
  val settingsPixKeyCreateViewModel: SettingsPixKeyCreateViewModel = hiltViewModel()
  val settingsPixKeyListViewModel: SettingsPixKeyListViewModel = hiltViewModel()
  val settingsPixKeyEditViewModel: SettingsPixKeyEditViewModel = hiltViewModel()
  val depositCreateViewModel: DepositCreateViewModel = hiltViewModel()
  val depositListViewModel: DepositListViewModel = hiltViewModel()
  val settingsTransferCreateViewModel: SettingsTransferCreateViewModel = hiltViewModel()
  val settingsTransferListViewModel: SettingsTransferListViewModel = hiltViewModel()
  val scheduleListViewModel: ScheduleListViewModel = hiltViewModel()

  val solicitationState = solicitationViewModel.state.collectAsState().value

  val (hasNotificationPermission, setHasNotificationPermission) = remember {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      mutableStateOf(
        ContextCompat.checkSelfPermission(
          context,
          Manifest.permission.POST_NOTIFICATIONS
        ) == PackageManager.PERMISSION_GRANTED
      )
    } else {
      mutableStateOf(true)
    }
  }

  val launcher = rememberLauncherForActivityResult(
    contract = ActivityResultContracts.RequestPermission(),
    onResult = { isGranted -> setHasNotificationPermission(isGranted) }
  )

  LaunchedEffect(key1 = Unit) {
    if (!hasNotificationPermission && Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      launcher.launch(Manifest.permission.POST_NOTIFICATIONS)
    }
  }

  LaunchedEffect(key1 = solicitationState.callerWebsocket) {
    solicitationViewModel.listenerScheduleEvents()
  }

  LaunchedEffect(key1 = Unit, key2 = currentRoute) {
    solicitationViewModel.event.collect { event ->
      when (event) {
        is SolicitationEvent.ScheduleFounded -> {
          notificationUtils.sendNotification(
            id = diaristWaitingConfirmationNotificationId,
            title = "Atenção dona de casa",
            description = "A diarista ${event.diarist.fullName} solicitou o início do serviço.",
            isSilent = true
          )

          navigationActions.navigateToScheduleStatus(scheduleId = event.scheduleId)
        }

        is SolicitationEvent.ScheduleDone -> {
          notificationUtils.sendNotification(
            id = scheduleDoneNotificationId,
            title = "Serviço finalizado",
            description = event.message,
          )

          if (currentRoute == NavigationRoutes.ScheduleList) {
            scheduleListViewModel.getUserSchedules(showLoading = true)
          }

          Handler(Looper.getMainLooper()).postDelayed({
            authenticationViewModel.retriveUserWallet()

            notificationUtils.clearNotificationById(scheduleDoneNotificationId)
          }, 3000)
        }

        is SolicitationEvent.ScheduleCanceled -> {
          notificationUtils.sendNotification(
            id = scheduleCanceledNotificationId,
            title = "Agendamento cancelado",
            description = event.message,
          )

          if (currentRoute == NavigationRoutes.ScheduleList) {
            scheduleListViewModel.getUserSchedules(showLoading = true)
          }

          Handler(Looper.getMainLooper()).postDelayed({
            authenticationViewModel.retriveUserWallet()

            notificationUtils.clearNotificationById(scheduleCanceledNotificationId)
          }, 3000)
        }

        else -> {}
      }

    }
  }

  AnimatedNavHost(
    navController = navController,
    startDestination = NavigationRoutes.Splash,
  ) {
    composable(route = NavigationRoutes.Splash) {
      SplashScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        solicitationViewModel = solicitationViewModel
      )
    }

    composable(route = NavigationRoutes.Login) {
      LoginScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        loginViewModel = loginViewModel
      )
    }

    composable(route = NavigationRoutes.Register) {
      RegisterScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        registerViewModel = registerViewModel
      )
    }

    composable(route = NavigationRoutes.SolicitationCreate) {
      SolicitationCreateScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        solicitationViewModel = solicitationViewModel,
      )
    }

    composable(
      route = NavigationRoutes.SolicitationStatus,
      arguments = listOf(
        navArgument(name = "budgetId") { type = NavType.StringType },
      )
    ) {
      SolicitationStatusScreen(
        budgetId = it.arguments?.getString("budgetId")!!,
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        solicitationViewModel = solicitationViewModel,
      )
    }

    composable(route = NavigationRoutes.ScheduleList) {
      ScheduleListScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        scheduleListViewModel = scheduleListViewModel
      )
    }

    composable(
      route = NavigationRoutes.ScheduleStatus,
      arguments = listOf(
        navArgument(name = "scheduleId") { type = NavType.StringType },
      )
    ) {
      ScheduleStatusScreen(
        scheduleId = it.arguments?.getString("scheduleId")!!,
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        solicitationViewModel = solicitationViewModel,
      )
    }

    composable(route = NavigationRoutes.Notifications) {
      NotificationsScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }

    composable(route = NavigationRoutes.AddressList) {
      AddressListScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        addressListViewModel = addressListViewModel
      )
    }

    composable(route = NavigationRoutes.AddressCreate) {
      AddressCreateScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        addressCreateViewModel = addressCreateViewModel
      )
    }

    composable(
      route = NavigationRoutes.AddressEdit,
      arguments = listOf(
        navArgument(name = "addressId") { type = NavType.StringType },
      )
    ) {
      AddressEditScreen(
        addressId = it.arguments?.getString("addressId")!!,
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        addressEditViewModel = addressEditViewModel
      )
    }

    composable(route = NavigationRoutes.DepositList) {
      DepositListScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        depositListViewModel = depositListViewModel
      )
    }

    composable(route = NavigationRoutes.DepositCreate) {
      DepositCreateScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        depositCreateViewModel = depositCreateViewModel
      )
    }

    composable(route = NavigationRoutes.SettingsTransferList) {
      SettingsTransferListScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        settingsTransferListViewModel = settingsTransferListViewModel
      )
    }

    composable(route = NavigationRoutes.SettingsTransferCreate) {
      SettingsTransferCreateScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        settingsTransferCreateViewModel = settingsTransferCreateViewModel
      )
    }

    composable(route = NavigationRoutes.SettingsList) {
      SettingsListScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }

    composable(route = NavigationRoutes.SettingsProfile) {
      SettingsProfileScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }

    composable(route = NavigationRoutes.SettingsPixKeyList) {
      SettingsPixKeyListScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        settingsPixKeyListViewModel = settingsPixKeyListViewModel
      )
    }

    composable(route = NavigationRoutes.SettingsPixKeyCreate) {
      SettingsPixKeyCreateScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        settingsPixKeyCreateViewModel = settingsPixKeyCreateViewModel,
      )
    }

    composable(
      route = NavigationRoutes.SettingsPixKeyEdit,
      arguments = listOf(
        navArgument(name = "pixDataId") { type = NavType.StringType },
      )
    ) {
      SettingsPixKeyEditScreen(
        pixDataId = it.arguments?.getString("pixDataId")!!,
        navController = navController,
        authenticationViewModel = authenticationViewModel,
        settingsPixKeyEditViewModel = settingsPixKeyEditViewModel
      )
    }

    composable(route = NavigationRoutes.SettingsSecurity) {
      SettingsSecurityScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }

    composable(route = NavigationRoutes.SettingsSecurityValidation) {
      SettingsSecurityValidationScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }

    composable(route = NavigationRoutes.SettingsSecurityUpdate) {
      SettingsSecurityUpdateScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }

    composable(route = NavigationRoutes.SettingsPolices) {
      SettingsPolicesScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }

    composable(route = NavigationRoutes.SettingsSupport) {
      SettingsSupportScreen(
        navController = navController,
        authenticationViewModel = authenticationViewModel,
      )
    }
  }
}

