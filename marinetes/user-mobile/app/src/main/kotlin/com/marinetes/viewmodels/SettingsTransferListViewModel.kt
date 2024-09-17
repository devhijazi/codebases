package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiTransfersEndpoint
import com.marinetes.network.serializations.marinetes.user.api.Transfer
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsTransferListViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<SettingsTransferListState>(SettingsTransferListState()) }

  fun resetState() {
    state.value = SettingsTransferListState()
  }

  private fun setTransfers(transfers: MutableList<Transfer>) {
    state.update { it.copy(transfers = transfers) }
  }

  private fun setLoading(loading: Boolean) {
    state.update { it.copy(isLoading = loading) }
  }

  fun getTrasnsfers() {
    viewModelScope.launch {
      setLoading(true)

      val response = MarinetesUserApiTransfersEndpoint.getTransfers(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val payments = response.body

          setTransfers(payments.toMutableList())
          setLoading(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }
}

data class SettingsTransferListState(
  val transfers: MutableList<Transfer> = mutableListOf(),

  val isLoading: Boolean = false,
)