package com.marinetes.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.marinetes.network.NetworkResponse
import com.marinetes.network.endpoints.brasilapi.BrasilApiCepEndpoint
import com.marinetes.network.endpoints.marinetes.user.api.MarinetesUserApiMeEndpoint
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserAddressRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AddressCreateViewModel @Inject constructor(
  private val context: Context,
) : ViewModel() {
  val state by lazy { MutableStateFlow<AddressCreateState>(AddressCreateState()) }

  val event by lazy { MutableSharedFlow<AddressAddEvent>() }

  fun resetState() {
    state.value = AddressCreateState()
  }

  fun setLoading(isLoading: Boolean) {
    state.update { it.copy(isLoading = isLoading) }
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

  fun setType(type: AddressCreateType) {
    state.update { it.copy(type = type) }
  }

  fun setCategory(category: AddressCreateCategory) {
    state.update { it.copy(category = category) }
  }

  suspend fun setZipCode(zipCode: String, validate: Boolean = true, fetchCep: Boolean = true) {
    state.update { it.copy(zipCode = zipCode) }

    if (validate) {
      validateZipCode(zipCode = zipCode, fetchCep = fetchCep)
    }
  }

  fun updateZipCodeError(zipCodeError: String?) {
    state.update { it.copy(zipCodeError = zipCodeError) }
  }

  private suspend fun validateZipCode(zipCode: String, fetchCep: Boolean = false): Boolean {
    val zipCodeIsRequired = zipCode.isBlank()
    val zipCodeIsValid = !Regex("^[0-9]{8}\$").matches(zipCode)

    if (zipCodeIsRequired) {
      updateZipCodeError("O CEP é obrigatório.")

      return true
    }

    if (zipCodeIsValid) {
      updateZipCodeError("Insira um CEP válido.")

      return true
    }

    if (fetchCep) {
      event.emit(AddressAddEvent.GetCep(cep = zipCode))
    }

    updateZipCodeError(null)

    return false
  }

  fun fetchCep(cep: String) {
    viewModelScope.launch {
      when (val response = BrasilApiCepEndpoint.getCep(cep)) {
        is NetworkResponse.Success -> {
          val cep = response.body

          setUf(cep.state)
          setNeighborhood(cep.neighborhood)
          setStreet(cep.street)
          setCity(cep.city)

          event.emit(AddressAddEvent.CepFetched)
        }

        is NetworkResponse.Error -> {
          event.emit(AddressAddEvent.CepFetched)
        }
      }
    }
  }

  fun setNumber(number: String, validate: Boolean = true) {
    state.update { it.copy(number = number) }

    if (validate) {
      validateNumber(number = number)
    }
  }

  fun updateNumberError(numberError: String?) {
    state.update { it.copy(numberError = numberError) }
  }

  private fun validateNumber(number: String): Boolean {
    val numberIsRequired = number.isBlank()
    val numberIsNoNumber = number == "S/N"
    val numberIsInteger = !numberIsNoNumber && !Regex("^[+-]?\\d+\$").matches(number.toString())

    if (numberIsRequired) {
      updateNumberError("O número é obrigatório.")

      return true
    }

    if (numberIsInteger) {
      updateNumberError("Insira um número válido.")

      return true
    }

    updateNumberError(null)

    return false
  }

  fun setIsNoNumber(isNoNumber: Boolean) {
    state.update {
      it.copy(
        number = if (isNoNumber) "S/N" else "",
        isNoNumber = isNoNumber
      )
    }
  }

  fun setComplement(complement: String) {
    state.update { it.copy(complement = complement) }
  }

  fun setUf(uf: String) {
    state.update { it.copy(uf = uf) }
  }

  fun setCity(city: String) {
    state.update { it.copy(city = city) }
  }

  fun setNeighborhood(neighborhood: String) {
    state.update { it.copy(neighborhood = neighborhood) }
  }

  fun setStreet(street: String) {
    state.update { it.copy(street = street) }
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

  fun createAddress() {
    viewModelScope.launch {
      val titleValue = state.value.title
      val squareMetersValue = state.value.squareMeters
      val zipCodeValue = state.value.zipCode
      val numberValue = state.value.number
      val typeValue = state.value.type.value
      val categoryValue = state.value.category.value
      val roomsValue = state.value.rooms
      val ufValue = state.value.uf
      val cityValue = state.value.city
      val neighborhoodValue = state.value.neighborhood
      val streetValue = state.value.street
      val complementValue = state.value.complement

      val titleValidation = validateTitle(titleValue)
      val zipCodeValidation = validateZipCode(zipCodeValue)
      val numberValidation = validateNumber(numberValue)
      val squareMetersValidation = validateSquareMeters(squareMetersValue)

      val validationHasError = listOf(
        titleValidation,
        zipCodeValidation,
        numberValidation,
        squareMetersValidation
      ).any { it }

      if (validationHasError) {
        return@launch
      }

      setLoading(true)

      val response = MarinetesUserApiMeEndpoint.createUserAddress(
        request = CreateUserAddressRequest(
          category = categoryValue,
          type = typeValue,
          city = cityValue,
          neighborhood = neighborhoodValue,
          number = numberValue,
          complement = complementValue,
          rooms = roomsValue,
          squareMeters = squareMetersValue.toDouble(),
          state = ufValue,
          street = streetValue,
          title = titleValue,
          zipCode = zipCodeValue,
        ),
        context
      )

      when (response) {
        is NetworkResponse.Success -> {
          setLoading(false)

          event.emit(AddressAddEvent.AddressCreated)
        }

        is NetworkResponse.Error -> {
        }
      }
    }
  }
}

enum class AddressCreateType(val value: Int) {
  GROUND_FLOOR(0),
  LOFT(1),
  APARTMENT(2),
}

enum class AddressCreateCategory(val value: Int) {
  RESIDENCE(0),
  COMMERCIAL_PLACE(1),
}

data class AddressCreateState(
  val title: String = "",
  val type: AddressCreateType = AddressCreateType.GROUND_FLOOR,
  val category: AddressCreateCategory = AddressCreateCategory.RESIDENCE,
  val squareMeters: String = "",
  val zipCode: String = "",
  val rooms: Int = 0,
  val number: String = "",
  val isNoNumber: Boolean = false,
  val uf: String = "",
  val city: String = "",
  val neighborhood: String = "",
  val street: String = "",
  val complement: String = "",

  val titleError: String? = null,
  val squareMetersError: String? = null,
  val zipCodeError: String? = null,
  val numberError: String? = null,

  val isLoading: Boolean = false,
)

sealed class AddressAddEvent {
  data class GetCep(val cep: String) : AddressAddEvent()
  object CepFetched : AddressAddEvent()
  object CepError : AddressAddEvent()
  object AddressCreated : AddressAddEvent()
}