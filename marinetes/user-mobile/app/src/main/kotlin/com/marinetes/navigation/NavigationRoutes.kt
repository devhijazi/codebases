package com.marinetes.navigation

object NavigationRoutes {
  const val Splash = "splash"

  const val Login = "login"
  const val Register = "register"

  const val SolicitationCreate = "solicitations/create"
  const val SolicitationStatus = "solicitations/budgets/{budgetId}/status"

  const val ScheduleList = "schedules/list"
  const val ScheduleStatus = "schedules/{scheduleId}/status"

  const val Notifications = "notifications"

  const val DepositList = "deposits/list"
  const val DepositCreate = "deposits/create"

  const val AddressList = "adresses/list"
  const val AddressCreate = "adresses/create"
  const val AddressEdit = "adresses/{addressId}/edit"

  const val SettingsList = "settings/list"
  const val SettingsProfile = "settings/profile"
  const val SettingsTransferList = "settings/transfers/list"
  const val SettingsTransferCreate = "settings/transfers/create"
  const val SettingsPixKeyList = "settings/pixes/list"
  const val SettingsPixKeyCreate = "settings/pixes/create"
  const val SettingsPixKeyEdit = "settings/pixes/{pixDataId}/edit"
  const val SettingsSupport = "settings/support"
  const val SettingsSecurity = "settings/security"
  const val SettingsSecurityValidation = "settings/security/validation"
  const val SettingsSecurityUpdate = "settings/security/update"
  const val SettingsPolices = "settings/polices"
}