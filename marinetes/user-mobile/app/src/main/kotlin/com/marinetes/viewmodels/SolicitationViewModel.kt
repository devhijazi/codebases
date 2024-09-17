package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.config.MarinetesConfig
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.caller.MarinetesCallerServiceQueuesEndpoint
import com.marinetes.network.endpoints.marinetes.caller.MarinetesCallerServiceSchedulesEndpoint
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiServicesEndpoint
import com.marinetes.network.getSuccessValue
import com.marinetes.network.serializations.marinetes.caller.requests.AddUserToQueueRequest
import com.marinetes.network.serializations.marinetes.caller.requests.RemoveUserFromQueueRequest
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleConfirmRequest
import com.marinetes.network.serializations.marinetes.user.api.Diarist
import com.marinetes.network.serializations.marinetes.user.api.Schedule
import com.marinetes.network.serializations.marinetes.user.api.Service
import com.marinetes.network.serializations.marinetes.user.api.UserAddress
import com.marinetes.network.serializations.marinetes.user.api.UserBudget
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserBudgetRequest
import com.marinetes.utils.TimeUtils
import dagger.hilt.android.lifecycle.HiltViewModel
import io.socket.client.IO
import io.socket.client.Socket
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.json.JSONObject
import javax.inject.Inject

@HiltViewModel
class SolicitationViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<SolicitationState>(SolicitationState()) }

  val event by lazy { MutableSharedFlow<SolicitationEvent>() }

  fun resetState() {
    setSelectedServices(mutableListOf())
    setBudget(null)
    setDate(TimeUtils.currentDateToISO())
    setStatus(SolicitationStatus.CREATING)
    setAddresses(mutableListOf())
    setAddress(null)
    updateAddressError(null)
    setServices(mutableListOf())
    setEstimatedValue(0)
  }

  fun setModal(modal: SolicitationModal) {
    state.update { it.copy(modal = modal) }
  }

  private fun setIsLoadingToGetUserAddresses(isLoadingToGetUserAddresses: Boolean) {
    state.update { it.copy(isLoadingToGetUserAddresses = isLoadingToGetUserAddresses) }
  }

  private fun setIsLoadingToGetServices(isLoadingToGetServices: Boolean) {
    state.update { it.copy(isLoadingToGetServices = isLoadingToGetServices) }
  }

  private fun setIsLoadingToCreateBudget(isLoadingToCreateBudget: Boolean) {
    state.update { it.copy(isLoadingToCreateBudget = isLoadingToCreateBudget) }
  }

  fun setSelectedServices(selectedServices: MutableList<Service>) {
    state.update { it.copy(selectedServices = selectedServices) }
  }

  fun setBudget(budget: UserBudget?) {
    state.update { it.copy(budget = budget) }
  }

  fun setDate(date: String) {
    state.update { it.copy(date = date) }

    updateDateError(null)
  }

  fun updateDateError(dateError: String?) {
    state.update { it.copy(dateError = dateError) }
  }

  fun setStatus(status: SolicitationStatus) {
    state.update { it.copy(status = status) }
  }

  fun setAddress(address: UserAddress?) {
    state.update { it.copy(address = address) }

    validateAddress(address = address)
  }

  fun updateAddressError(addressError: String?) {
    state.update { it.copy(addressError = addressError) }
  }

  private fun validateAddress(address: UserAddress?): Boolean {
    val addressIsRequired = address == null

    if (addressIsRequired) {
      updateAddressError("O local é obrigatório")

      return true
    }

    updateAddressError(null)

    return false
  }

  fun setEstimatedValue(estimatedValue: Int) {
    state.update { it.copy(estimatedValue = estimatedValue) }
  }

  private fun setAddresses(addresses: MutableList<UserAddress>) {
    state.update { it.copy(addresses = addresses) }
  }

  private fun setServices(services: MutableList<Service>) {
    state.update { it.copy(services = services) }
  }

  private fun setDiarist(diarist: Diarist) {
    state.update { it.copy(diarist = diarist) }
  }

  fun isSelectedService(service: Service): Boolean {
    return state.value.selectedServices.find { it.title == service.title } != null
  }

  fun addServiceAsSelected(service: Service) {
    state.update { currentState ->
      val newServices = currentState.selectedServices.toMutableList()

      newServices.add(service)

      currentState.copy(selectedServices = newServices)
    }
  }

  fun removeServiceAsSelected(service: Service) {
    if (state.value.selectedServices.size == 1) {
      return
    }

    state.update { currentState ->
      val newServices = currentState.selectedServices.toMutableList()

      newServices.remove(service)

      currentState.copy(selectedServices = newServices)
    }
  }

  private fun setCallerWebocket(callerWebsocket: Socket?) {
    state.update { it.copy(callerWebsocket = callerWebsocket) }
  }

  fun connectCallerWebsocket(userId: String) {
    viewModelScope.launch {
      val callerServiceSocket = state.value.callerWebsocket;

      if (callerServiceSocket == null) {
        val callerWebsocket = IO.socket(
          MarinetesConfig.MARINETES_CALLER_SERVICE_WEBSOCKET_URL,
          IO.Options.builder()
            .setQuery("entityType=user&entityId=$userId")
            .build()
        )

        setCallerWebocket(callerWebsocket)

        callerWebsocket.connect()
      }
    }
  }

  fun listenerScheduleEvents() {
    viewModelScope.launch {
      val callerServiceSocket = state.value.callerWebsocket;

      if (callerServiceSocket != null) {
        callerServiceSocket.on("scheduleWaitingConfirmation") { args ->
          val dataJson = args[0] as JSONObject

          val scheduleJson = dataJson.getJSONObject("schedule")
          val diaristJson = dataJson.getJSONObject("diarist")

          val diarist = Diarist(
            id = diaristJson.getString("id"),
            fullName = diaristJson.getString("full_name"),
            birthdate = diaristJson.getString("birthdate"),
            document = diaristJson.getString("document"),
            generalRegister = diaristJson.getString("general_register"),
            phone = diaristJson.getString("phone"),
            email = diaristJson.getString("email"),
            acceptingServices = diaristJson.getBoolean("accepting_services"),
            avatar = diaristJson.getString("avatar"),
            createdAt = diaristJson.getString("created_at"),
            updatedAt = diaristJson.getString("updated_at"),
          )

          setDiarist(diarist)

          viewModelScope.launch {
            event.emit(
              SolicitationEvent.ScheduleFounded(
                diarist = diarist,
                scheduleId = scheduleJson.getString("id")
              )
            )
          }
        }

        callerServiceSocket.on("scheduleCanceled") { args ->
          val dataJson = args[0] as JSONObject

          val diaristJson = dataJson.getJSONObject("diarist")

          viewModelScope.launch {
            event.emit(SolicitationEvent.ScheduleCanceled(message = "A diarista ${diaristJson.getString("full_name")} cancelou o agendamento."))
          }
        }

        callerServiceSocket.on("scheduleDoned") { args ->
          val dataJson = args[0] as JSONObject

          val diaristJson = dataJson.getJSONObject("diarist")

          viewModelScope.launch {
            event.emit(SolicitationEvent.ScheduleDone(message = "A diarista ${diaristJson.getString("full_name")} finalizou o serviço."))
          }
        }
      }
    }
  }

  fun confirmSchedule(userId: String, scheduleId: String) {
    viewModelScope.launch {
      val response = MarinetesCallerServiceSchedulesEndpoint.userConfirmSchedule(
        request = UserScheduleConfirmRequest(
          userId = userId,
          scheduleId = scheduleId
        )
      )

      when (response) {
        is NetworkResponse.Success -> {
          event.emit(SolicitationEvent.ScheduleConfirmed)
        }

        is NetworkResponse.Error -> {

        }
      }
    }
  }

  fun listenerSolicitationsEvents() {
    viewModelScope.launch {
      val callerServiceSocket = state.value.callerWebsocket;

      if (callerServiceSocket != null) {
        callerServiceSocket.on("solicitationAccepted") { args ->
          val dataJson = args[0] as JSONObject

          val diaristJson = dataJson.getJSONObject("diarist")

          val diarist = Diarist(
            id = diaristJson.getString("id"),
            fullName = diaristJson.getString("full_name"),
            birthdate = diaristJson.getString("birthdate"),
            document = diaristJson.getString("document"),
            generalRegister = diaristJson.getString("general_register"),
            phone = diaristJson.getString("phone"),
            email = diaristJson.getString("email"),
            acceptingServices = diaristJson.getBoolean("accepting_services"),
            avatar = diaristJson.getString("avatar"),
            createdAt = diaristJson.getString("created_at"),
            updatedAt = diaristJson.getString("updated_at"),
          )

          setDiarist(diarist)
          setStatus(SolicitationStatus.ACCEPTED)

          viewModelScope.launch {
            event.emit(SolicitationEvent.SolicitationAccepted(diarist = diarist))
          }
        }
      }
    }
  }

  fun getUserAddresses() {
    viewModelScope.launch {
      setIsLoadingToGetUserAddresses(true)

      val response = MarinetesUserApiMeEndpoint.getUserAddresses(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val addresses = response.body

          setAddresses(addresses.toMutableList())
          setIsLoadingToGetUserAddresses(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun getServices() {
    viewModelScope.launch {
      setIsLoadingToGetServices(true)

      val response = MarinetesUserApiServicesEndpoint.getServices(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val services = response.body.toMutableList()

          services.sortWith(
            compareBy(
              { it.title != "cleaning" },
              { it.title != "cook" },
              { it.title != "wash-clothes" },
              { it.title }
            )
          )

          setServices(services)

          services.find { it.title == "cleaning" }?.let {
            addServiceAsSelected(it)
          }

          setIsLoadingToGetServices(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun validateAddressAndServicesAndDate() {
    viewModelScope.launch {
      val addressValue = state.value.address

      val addressValidationHasError = validateAddress(addressValue)

      val validationHasError = listOf(
        addressValidationHasError
      ).any { it }

      if (validationHasError) {
        return@launch
      }

      event.emit(SolicitationEvent.AddressAndServicesAndDateValidated)
    }
  }

  fun createBudget() {
    viewModelScope.launch {
      val addressValue = state.value.address
      val estimatedValueValue = state.value.estimatedValue
      val dateValue = state.value.date
      val selectedServicesValue = state.value.selectedServices

      setIsLoadingToCreateBudget(true)

      val response = MarinetesUserApiMeEndpoint.createUserBudget(
        request = CreateUserBudgetRequest(
          price = estimatedValueValue,
          services = selectedServicesValue.map { it.id },
          date = dateValue,
          addressId = addressValue?.id.toString(),
        ),
        context
      )

      when (response) {
        is NetworkResponse.Success -> {
          setIsLoadingToCreateBudget(false)

          setBudget(response.body)
          setStatus(SolicitationStatus.CONFIRMING_CREATION)

          event.emit(SolicitationEvent.BudgetCreated(budgetId = response.body.id))
        }

        is NetworkResponse.Error -> {
          setIsLoadingToCreateBudget(false)

          event.emit(SolicitationEvent.BudgetError(code = response.code))
        }
      }
    }
  }

  fun hasUserOnQueue(userId: String) {
    viewModelScope.launch {
      when (val response = MarinetesCallerServiceQueuesEndpoint.getAllUsersQueue()) {
        is NetworkResponse.Success -> {
          val userQueue = response.body.usersInQueue.find { it.userId == userId }

          if (userQueue == null) {
            event.emit(SolicitationEvent.SolicitationNotFound)

            return@launch
          }

          val userBudgets = MarinetesUserApiMeEndpoint.getUserBudgets(context).getSuccessValue()

          if (!userBudgets.isNullOrEmpty()) {
            val budget = userBudgets.first()

            setBudget(budget)
            setStatus(SolicitationStatus.SEARCHING)
            setSelectedServices(budget.services.toMutableList())
            setAddress(budget.address)

            event.emit(SolicitationEvent.SolicitationFounded(budgetId = budget.id))
          }
        }

        is NetworkResponse.Error -> {

        }
      }
    }
  }

  fun createSolicitation(
    userId: String,
    budgetId: String,
  ) {
    viewModelScope.launch {
      val response = MarinetesCallerServiceQueuesEndpoint.addUserToQueue(
        request = AddUserToQueueRequest(
          userId = userId,
          budgetId = budgetId
        )
      )

      when (response) {
        is NetworkResponse.Success -> {
          setStatus(SolicitationStatus.SEARCHING)

          event.emit(SolicitationEvent.SearchingDiarist)
        }

        is NetworkResponse.Error -> {

        }
      }
    }
  }

  fun cancelSolicitation(userId: String, emitEvent: Boolean = true) {
    viewModelScope.launch {
      val response = MarinetesCallerServiceQueuesEndpoint.removeUserFromQueue(
        request = RemoveUserFromQueueRequest(
          userId = userId
        )
      )

      when (response) {
        is NetworkResponse.Success -> {
          if (emitEvent) {

            event.emit(SolicitationEvent.CancelSolicitationDiarist)
          }
        }

        is NetworkResponse.Error -> {
          if (emitEvent) {
            event.emit(SolicitationEvent.CancelSolicitationDiaristError)
          }
        }
      }
    }
  }
}

enum class SolicitationModal {
  SELECT_ADDRESS
}

enum class SolicitationStatus {
  CREATING,
  CONFIRMING_CREATION,
  SEARCHING,
  ACCEPTED
}

data class SolicitationState(
  val modal: SolicitationModal? = null,

  val addresses: MutableList<UserAddress> = mutableListOf(),
  val services: MutableList<Service> = mutableListOf(),
  val budget: UserBudget? = null,
  val status: SolicitationStatus = SolicitationStatus.CREATING,

  val callerWebsocket: Socket? = null,
  val diarist: Diarist? = null,
  val schedule: Schedule? = null,

  val selectedServices: MutableList<Service> = mutableListOf(),
  val address: UserAddress? = null,
  val addressError: String? = null,
  val estimatedValue: Int = 0,
  val date: String = TimeUtils.currentDateToISO(),
  val dateError: String? = null,

  val isLoadingToGetUserAddresses: Boolean = false,
  val isLoadingToGetServices: Boolean = false,
  val isLoadingToCreateBudget: Boolean = false,
)

sealed class SolicitationEvent {
  object AddressAndServicesAndDateValidated : SolicitationEvent()
  data class BudgetError(val code: String) : SolicitationEvent()
  data class BudgetCreated(val budgetId: String) : SolicitationEvent()
  object CancelSolicitationDiarist : SolicitationEvent()
  object CancelSolicitationDiaristError : SolicitationEvent()
  object SearchingDiarist : SolicitationEvent()
  data class SolicitationFounded(val budgetId: String) : SolicitationEvent()
  object SolicitationNotFound : SolicitationEvent()
  data class SolicitationAccepted(val diarist: Diarist) : SolicitationEvent()
  data class ScheduleFounded(val diarist: Diarist, val scheduleId: String) : SolicitationEvent()
  object ScheduleConfirmed : SolicitationEvent()
  data class ScheduleDone(val message: String) : SolicitationEvent()
  data class ScheduleCanceled(val message: String) : SolicitationEvent()
}