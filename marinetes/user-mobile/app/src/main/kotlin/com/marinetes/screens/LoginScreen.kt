package com.marinetes.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.R
import com.marinetes.components.Button
import com.marinetes.components.CheckBox
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.layouts.DefaultLayout
import com.marinetes.navigation.NavigationActions
import com.marinetes.network.NetworkError
import com.marinetes.network.serializations.marinetes.user.api.requests.CreateUserLoginRequest
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable
import com.marinetes.utils.DeviceUtils
import com.marinetes.utils.Dimensions
import com.marinetes.viewmodels.AuthenticationEvent
import com.marinetes.viewmodels.AuthenticationViewModel
import com.marinetes.viewmodels.LoginEvent
import com.marinetes.viewmodels.LoginViewModel

@Composable
fun LoginScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  loginViewModel: LoginViewModel
) {
  val navigationActions = NavigationActions(navController = navController)
  val dimensions = DeviceUtils.getCurrentDimension()

  val authentication = authenticationViewModel.state.collectAsState().value
  val login = loginViewModel.state.collectAsState().value

  val containerPadding = 30.dp
  val containerGap = 20.dp

  val logoSize = when (dimensions) {
    Dimensions.MOBILE_SMALL -> 100.dp
    else -> 120.dp
  }

  BackHandler {}

  LaunchedEffect(key1 = login) {
    loginViewModel.event.collect { event ->
      when (event) {
        is LoginEvent.DataValidated -> {
          authenticationViewModel.signIn(
            request = CreateUserLoginRequest(
              email = login.email,
              password = login.password,
              stay = login.stay
            )
          )
        }
      }
    }
  }

  LaunchedEffect(key1 = Unit) {
    authenticationViewModel.event.collect { event ->
      when (event) {
        is AuthenticationEvent.UserLoggedIn -> {
          navigationActions.navigateToSolicitationCreate()

          loginViewModel.resetState()
        }
        is AuthenticationEvent.Error -> {
          if (event.code == NetworkError.RegisterNotFoundError.code || event.code == NetworkError.PasswordError.code) {
            loginViewModel.updateEmailError("E-mail ou senha inválidos.")
            loginViewModel.updatePasswordError("E-mail ou senha inválidos.")
          }
        }
        else -> {}
      }
    }
  }

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel,
    surfaceModifer = Modifier
      .fillMaxSize()
      .verticalScroll(rememberScrollState())
  ) {
    Column(
      modifier = Modifier.fillMaxSize(),
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.Center
    ) {
      Column(
        modifier = Modifier
          .fillMaxSize()
          .padding(containerPadding),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(containerGap)
      ) {
        Image(
          painter = painterResource(R.drawable.logo_green),
          modifier = Modifier.size(logoSize),
          contentDescription = "logo",
          contentScale = ContentScale.Fit
        )

        Text(
          text = "Acessar conta",
          style = MaterialTheme.typography.bodyLarge.copy(color = Colors.GREEN_300)
        )

        Input(
          type = InputType.EMAIL,
          icon = Icons.Communication.Outlined.AlternateEmail,
          value = login.email,
          error = login.emailError,
          placeholder = "jhondoe@example.com",
          onValueChange = { loginViewModel.setEmail(it) }
        )

        Input(
          type = InputType.PASSWORD,
          icon = Icons.CommonActions.Outlined.Lock,
          value = login.password,
          error = login.passwordError,
          placeholder = "••••••••",
          onValueChange = { loginViewModel.setPassword(it) }
        )

        Row(
          modifier = Modifier.fillMaxWidth(),
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          CheckBox(
            label = "Continuar logado",
            checked = login.stay,
            onCheckedChange = { loginViewModel.setStay(it) }
          )

          Text(
            text = "Esqueceu a senha?",
            modifier = Modifier.noRippleClickable {
              loginViewModel.resetState()

              navigationActions.navigateToLogin()
            },
            style = MaterialTheme.typography.bodySmall.copy(
              color = Colors.GREEN_400,
              textDecoration = TextDecoration.Underline,
            )
          )
        }

        Button(
          text = "Acessar",
          isLoading = authentication.isLoading,
          onClick = {
            loginViewModel.validateData()
          }
        )

        Row(
          modifier = Modifier.fillMaxWidth(),
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.Center
        ) {
          Text(
            text = "É novo por aqui?",
            style = MaterialTheme.typography.bodyMedium.copy(color = Colors.GREEN_400)
          )

          Spacer(modifier = Modifier.size(4.dp))

          Text(
            text = "Criar conta",
            modifier = Modifier.noRippleClickable {
              loginViewModel.resetState()

              navigationActions.navigateToRegister()
            },
            style = MaterialTheme.typography.bodyMedium.copy(
              color = Colors.GREEN_400,
              textDecoration = TextDecoration.Underline,
              fontWeight = FontWeight.Medium
            )
          )
        }
      }
    }
  }
}
