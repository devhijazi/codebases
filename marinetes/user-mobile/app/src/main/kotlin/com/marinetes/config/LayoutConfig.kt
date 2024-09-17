package com.marinetes.config

import com.marinetes.navigation.NavigationRoutes

object LayoutConfig {
  val routesWithDrawerHeader = listOf<String>(
    NavigationRoutes.SolicitationCreate,
    NavigationRoutes.ScheduleList,
    NavigationRoutes.AddressList,
    NavigationRoutes.DepositList,
    NavigationRoutes.SettingsList,
  )

  val routesWithBackHeader = listOf<String>(
    NavigationRoutes.Notifications,
    NavigationRoutes.ScheduleStatus,
    NavigationRoutes.SolicitationStatus,
    NavigationRoutes.AddressCreate,
    NavigationRoutes.AddressEdit,
    NavigationRoutes.DepositCreate,
    NavigationRoutes.SettingsProfile,
    NavigationRoutes.SettingsTransferList,
    NavigationRoutes.SettingsTransferCreate,
    NavigationRoutes.SettingsPixKeyList,
    NavigationRoutes.SettingsPixKeyCreate,
    NavigationRoutes.SettingsPixKeyEdit,
    NavigationRoutes.SettingsSecurity,
    NavigationRoutes.SettingsSupport,
    NavigationRoutes.SettingsSecurityUpdate,
    NavigationRoutes.SettingsSecurityValidation,
    NavigationRoutes.SettingsPolices,
  )

  val routesWithSolicitationFooter = listOf<String>(
    NavigationRoutes.SolicitationCreate,
  )

  val routesWithFloatingButton = listOf<String>(
    NavigationRoutes.AddressList,
    NavigationRoutes.SettingsTransferList,
    NavigationRoutes.SettingsPixKeyList,
  )

  val routesWithNavigationFooter = listOf<String>(
    NavigationRoutes.ScheduleList,
  )

  val routesWithServiceChatFooter = listOf<String>(
    NavigationRoutes.SolicitationCreate,
  )
}