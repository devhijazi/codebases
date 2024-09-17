package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.serializations.marinetes.user.api.UserAddress
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AddressListViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<AddressListState>(AddressListState()) }

  fun resetState() {
    state.value = AddressListState()
  }

  private fun setAddresses(addresses: MutableList<UserAddress>) {
    state.update { it.copy(addresses = addresses) }
  }

  private fun setLoading(loading: Boolean) {
    state.update { it.copy(isLoading = loading) }
  }

  fun deleteUserAddress(addressId: String) {
    viewModelScope.launch {
      val response = MarinetesUserApiMeEndpoint.deleteUserAddress(
        addressId = addressId,
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          getUserAddresses()
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  private fun getUserAddresses() {
    viewModelScope.launch {
      val response = MarinetesUserApiMeEndpoint.getUserAddresses(
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val addresses = response.body

          setAddresses(addresses.toMutableList())
          setLoading(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun getUserAddressesWithLoading() {
    viewModelScope.launch {
      setLoading(true)

      getUserAddresses()
    }
  }
}

data class AddressListState(
  val addresses: MutableList<UserAddress> = mutableListOf(),

  val isLoading: Boolean = false,
)