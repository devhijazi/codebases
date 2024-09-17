package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.serializations.marinetes.user.api.UserAddress
import com.marinetes.network.serializations.marinetes.user.api.requests.UpdateUserAddressRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AddressEditViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<AddressEditState>(AddressEditState()) }

  val event by lazy { MutableSharedFlow<AddressEditEvent>() }

  fun resetState() {
    state.value = AddressEditState()
  }

  private fun setIsGetAddressLoading(isGetAddressLoading: Boolean) {
    state.update { it.copy(isGetAddressLoading = isGetAddressLoading) }
  }

  private fun setIsUpdateAddressLoading(isUpdateAddressLoading: Boolean) {
    state.update { it.copy(isUpdateAddressLoading = isUpdateAddressLoading) }
  }

  private fun setAddress(address: UserAddress) {
    state.update { it.copy(address = address) }
  }

  fun setTitle(title: String, validate: Boolean = true) {
    state.update { it.copy(title = title) }

    if (validate) {
      validateTitle(title = title)
    }
  }

  fun updateTitleError(titleError: String?) {
    state.update { it.copy(titleError = titleError) }
  }

  private fun validateTitle(title: String): Boolean {
    val titleIsRequired = title.isBlank()

    if (titleIsRequired) {
      updateTitleError("O título é obrigatório.")

      return true
    }

    updateTitleError(null)

    return false
  }

  fun setType(type: AddressEditType) {
    state.update { it.copy(type = type) }
  }

  fun setCategory(category: AddressEditCategory) {
    state.update { it.copy(category = category) }
  }

  fun setSquareMeters(squareMeters: String, validate: Boolean = true) {
    state.update { it.copy(squareMeters = squareMeters) }

    if (validate) {
      validateSquareMeters(squareMeters = squareMeters)
    }
  }

  fun updateSquareMetersError(squareMetersError: String?) {
    state.update { it.copy(squareMetersError = squareMetersError) }
  }

  private fun validateSquareMeters(squareMeters: String): Boolean {
    val squareMetersIsRequired = squareMeters.isBlank()

    if (squareMetersIsRequired) {
      updateSquareMetersError("A metragem é obrigatória.")

      return true
    }

    updateSquareMetersError(null)

    return false
  }

  fun setRooms(rooms: Int) {
    state.update { it.copy(rooms = rooms) }
  }

  fun getUserAddress(addressId: String) {
    viewModelScope.launch {
      val response = MarinetesUserApiMeEndpoint.getUserAddress(
        addressId = addressId,
        context = context
      )

      when (response) {
        is NetworkResponse.Success -> {
          val address = response.body

          setAddress(address)
          setTitle(address.title)
          setType(AddressEditType.findByValue(address.type) as AddressEditType)
          setCategory(AddressEditCategory.findByValue(address.category) as AddressEditCategory)
          setRooms(address.rooms)
          setSquareMeters(address.squareMeters.toString())
          setIsGetAddressLoading(false)
        }

        is NetworkResponse.Error -> {}
      }
    }
  }

  fun updateUserAddress() {
    viewModelScope.launch {
      val addressId = state.value.address?.id ?: ""

      val titleValue = state.value.title
      val squareMetersValue = state.value.squareMeters
      val roomsValue = state.value.rooms
      val typeValue = state.value.type.value
      val categoryValue = state.value.category.value

      val titleValidation = validateTitle(titleValue)
      val squareMetersValidation = validateSquareMeters(squareMetersValue)

      val validationHasError = listOf(
        titleValidation,
        squareMetersValidation
      ).any { it }

      if (validationHasError) {
        return@launch
      }

      setIsUpdateAddressLoading(true)

      val response = MarinetesUserApiMeEndpoint.updateUserAddress(
        addressId = addressId,
        request = UpdateUserAddressRequest(
          category = categoryValue,
          type = typeValue,
          rooms = roomsValue,
          squareMeters = squareMetersValue.toDouble(),
          title = titleValue,
        ),
        context
      )

      when (response) {
        is NetworkResponse.Success -> {
          setIsUpdateAddressLoading(false)

          event.emit(AddressEditEvent.AddressUpdated)
        }

        is NetworkResponse.Error -> {
        }
      }
    }
  }
}

enum class AddressEditType(val value: Int) {
  GROUND_FLOOR(0),
  LOFT(1),
  APARTMENT(2);

  companion object {
    fun findByValue(value: Int): AddressEditType? {
      return AddressEditType.values().find { it.value == value }
    }
  }
}

enum class AddressEditCategory(val value: Int) {
  RESIDENCE(0),
  COMMERCIAL_PLACE(1);

  companion object {
    fun findByValue(value: Int): AddressEditCategory? {
      return values().find { it.value == value }
    }
  }
}

data class AddressEditState(
  val address: UserAddress? = null,

  val title: String = "",
  val type: AddressEditType = AddressEditType.GROUND_FLOOR,
  val category: AddressEditCategory = AddressEditCategory.RESIDENCE,
  val squareMeters: String = "",
  val rooms: Int = 0,

  val titleError: String? = null,
  val squareMetersError: String? = null,

  val isGetAddressLoading: Boolean = false,
  val isUpdateAddressLoading: Boolean = false,
)

sealed class AddressEditEvent {
  object AddressUpdated : AddressEditEvent()
}