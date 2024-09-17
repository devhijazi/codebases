package com.marinetes.navigation

import androidx.navigation.NavHostController

class NavigationActions(private val navController: NavHostController) {
  fun goBack() { navController.navigateUp() }

  fun navigateToLogin() { navController.navigate(NavigationRoutes.Login) }
  fun navigateToRegister() { navController.navigate(NavigationRoutes.Register) }

  fun navigateToSolicitationCreate() { navController.navigate(NavigationRoutes.SolicitationCreate) }
  fun navigateToSolicitationStatus(budgetId: String) { navController.navigate(NavigationRoutes.SolicitationStatus.replace("{budgetId}", budgetId)) }

  fun navigateToScheduleList() { navController.navigate(NavigationRoutes.ScheduleList) }
  fun navigateToScheduleStatus(scheduleId: String) { navController.navigate(NavigationRoutes.ScheduleStatus.replace("{scheduleId}", scheduleId)) }

  fun navigateToNotifications() { navController.navigate(NavigationRoutes.Notifications) }

  fun navigateToAddressList() { navController.navigate(NavigationRoutes.AddressList) }
  fun navigateToAddressAdd() { navController.navigate(NavigationRoutes.AddressCreate) }
  fun navigateToAddressEdit(addressId: String) { navController.navigate(NavigationRoutes.AddressEdit.replace("{addressId}", addressId)) }

  fun navigateToDepositList() { navController.navigate(NavigationRoutes.DepositList) }
  fun navigateToDepositCreate() { navController.navigate(NavigationRoutes.DepositCreate) }

  fun navigateToSettingsList() { navController.navigate(NavigationRoutes.SettingsList) }
  fun navigateToSettingsProfile() { navController.navigate(NavigationRoutes.SettingsProfile) }
  fun navigateToSettingsTransferList() { navController.navigate(NavigationRoutes.SettingsTransferList) }
  fun navigateToSettingsTransferCreate() { navController.navigate(NavigationRoutes.SettingsTransferCreate) }
  fun navigateToSettingsPixKeyList() { navController.navigate(NavigationRoutes.SettingsPixKeyList) }
  fun navigateToSettingsPixKeyCreate() { navController.navigate(NavigationRoutes.SettingsPixKeyCreate) }
  fun navigateToSettingsPixEdit(pixDataId: String) { navController.navigate(NavigationRoutes.SettingsPixKeyEdit.replace("{pixDataId}", pixDataId)) }
  fun navigateToSettingsSecurity() { navController.navigate(NavigationRoutes.SettingsSecurity) }
  fun navigateToSettingsSecurityValidation() { navController.navigate(NavigationRoutes.SettingsSecurityValidation) }
  fun navigateToSettingsSecurityUpdate() { navController.navigate(NavigationRoutes.SettingsSecurityUpdate) }
  fun navigateToSettingsPolices() { navController.navigate(NavigationRoutes.SettingsPolices) }

  fun navigateToSupport() { navController.navigate(NavigationRoutes.SettingsSupport) }
}
