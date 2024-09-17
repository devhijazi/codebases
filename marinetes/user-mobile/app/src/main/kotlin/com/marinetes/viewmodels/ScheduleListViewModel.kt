package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.caller.MarinetesCallerServiceSchedulesEndpoint
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleCanceledRequest
import com.marinetes.network.serializations.marinetes.caller.requests.UserScheduleDonedRequest
import com.marinetes.network.serializations.marinetes.user.api.Schedule
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ScheduleListViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<ScheduleListState>(ScheduleListState()) }

  val event by lazy { MutableSharedFlow<ScheduleListEvent>() }

  fun resetState() {
    state.value = ScheduleListState()
  }

  private fun setSchedules(schedules: MutableList<Schedule>) {
    state.update { it.copy(schedules = schedules) }
  }

  private fun setIsGetUserSchedulesListLoading(isGetUserSchedulesListLoading: Boolean) {
    state.update { it.copy(isGetUserSchedulesListLoading = isGetUserSchedulesListLoading) }
  }

  fun doneSchedule(request: UserScheduleDonedRequest) {
    viewModelScope.launch {
      val response = MarinetesCallerServiceSchedulesEndpoint.userDoneSchedule(
        request = request
      )

      when (response) {
        is NetworkResponse.Success -> {
          getUserSchedules(showLoading = true)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun cancelSchedule(request: UserScheduleCanceledRequest) {
    viewModelScope.launch {
      val response = MarinetesCallerServiceSchedulesEndpoint.userCancelSchedule(
        request = request
      )

      when (response) {
        is NetworkResponse.Success -> {
          getUserSchedules(showLoading = true)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun getUserSchedules(showLoading: Boolean = false) {
    viewModelScope.launch {
      if (showLoading) {
        setIsGetUserSchedulesListLoading(true)
      }

      val response = MarinetesUserApiMeEndpoint.getUserSchedules(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val schedules = response.body

          setSchedules(schedules.toMutableList())
          setIsGetUserSchedulesListLoading(false)

          event.emit(ScheduleListEvent.SchedulesFetched)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }
}

data class ScheduleListState(
  val schedules: MutableList<Schedule> = mutableListOf(),

  val isGetUserSchedulesListLoading: Boolean = true,
)

sealed class ScheduleListEvent {
  object SchedulesFetched : ScheduleListEvent()
}