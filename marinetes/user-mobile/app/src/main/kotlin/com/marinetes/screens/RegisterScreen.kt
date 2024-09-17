package com.marinetes.screens

import android.net.Uri
import androidx.activity.compose.BackHandler
import androidx.browser.customtabs.CustomTabsIntent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.R
import com.marinetes.components.Button
import com.marinetes.components.Input
import com.marinetes.components.InputType
import com.marinetes.components.LinkText
import com.marinetes.components.LinkTextData
import com.marinetes.config.MarinetesConfig
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
import com.marinetes.viewmodels.RegisterEvent
import com.marinetes.viewmodels.RegisterState
import com.marinetes.viewmodels.RegisterViewModel

@Composable
fun RegisterScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
  registerViewModel: RegisterViewModel
) {
  val navigationActions = NavigationActions(navController = navController)
  val dimensions = DeviceUtils.getCurrentDimension()

  val registerState = registerViewModel.state.collectAsState().value

  val containerPadding = 30.dp
  val containerGap = 20.dp

  val logoSize = when (dimensions) {
    Dimensions.MOBILE_SMALL -> 100.dp
    else -> 120.dp
  }

  BackHandler {
    navigationActions.goBack()

    registerViewModel.resetState()
  }

  LaunchedEffect(key1 = registerState) {
    registerViewModel.event.collect { event ->
      when (event) {
        is RegisterEvent.EmailValidated -> registerViewModel.nextStep(registerState.currentStep)
        is RegisterEvent.CodeValidated -> registerViewModel.nextStep(registerState.currentStep)
        is RegisterEvent.UserDataCreated -> {
          authenticationViewModel.signIn(
            request = CreateUserLoginRequest(
              email = registerState.email,
              password = registerState.password,
              stay = true
            )
          )
        }
        is RegisterEvent.EmailError -> {
          if (event.code == NetworkError.RegisterFoundError.code) {
            registerViewModel.updateEmailError("Este e-mail já está em uso.")
          }
        }
        is RegisterEvent.CodeError -> {
          registerViewModel.updateCodeError("Código de verificação inválido.")
        }
        is RegisterEvent.UserDataError -> {
          if (event.code == NetworkError.RegisterFoundError.code) {
            registerViewModel.updateDocumentError("Este CPF já está em uso.")
          }
        }
      }
    }
  }

  LaunchedEffect(key1 = Unit) {
    authenticationViewModel.event.collect { event ->
      when (event) {
        is AuthenticationEvent.UserLoggedIn -> {
          navigationActions.navigateToSolicitationCreate()

          registerViewModel.resetState()
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
      when (registerState.currentStep) {
        1 -> EmailStep(
          containerPadding = containerPadding,
          containerGap = containerGap,
          logoSize = logoSize,
          navigationActions = navigationActions,
          registerState = registerState,
          registerViewModel = registerViewModel,
        )
        2 -> CodeValidationStep(
          containerPadding = containerPadding,
          containerGap = containerGap,
          logoSize = logoSize,
          registerState = registerState,
          registerViewModel = registerViewModel,
        )
        3 -> UserDataStep(
          containerPadding = containerPadding,
          containerGap = containerGap,
          logoSize = logoSize,
          registerState = registerState,
          registerViewModel = registerViewModel,
        )
      }
    }
  }
}

@Composable
private fun EmailStep(
  containerPadding: Dp,
  containerGap: Dp,
  logoSize: Dp,
  navigationActions: NavigationActions,
  registerState: RegisterState,
  registerViewModel: RegisterViewModel,
) {
  val context = LocalContext.current

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
      text = "Informe seu e-mail para criar sua conta.",
      style = MaterialTheme.typography.bodyLarge.copy(color = Colors.GREEN_300)
    )

    Input(
      type = InputType.EMAIL,
      icon = Icons.Communication.Outlined.AlternateEmail,
      value = registerState.email,
      error = registerState.emailError,
      placeholder = "E-mail",
      onValueChange = { registerViewModel.setEmail(it) }
    )

    Button(
      isLoading = registerState.isLoading,
      onClick = { registerViewModel.validateData() }
    ) {
      Icon(
        modifier = Modifier.size(25.dp),
        imageVector = Icons.UIActions.Outlined.ArrowForwardIos,
        contentDescription = null,
        tint = Colors.WHITE
      )
    }

    Row(
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.Center
    ) {
      Text(
        text = "Já possui uma conta?",
        style = MaterialTheme.typography.bodyMedium.copy(color = Colors.GREEN_400)
      )

      Spacer(modifier = Modifier.size(4.dp))

      Text(
        text = "Entrar",
        modifier = Modifier.noRippleClickable {
          registerViewModel.resetState()

          navigationActions.navigateToLogin()
        },
        style = MaterialTheme.typography.bodyMedium.copy(
          color = Colors.GREEN_400,
          textDecoration = TextDecoration.Underline,
          fontWeight = FontWeight.Medium
        )
      )
    }

    LinkText(
      modifier = Modifier.width(260.dp),
      linkTextData = listOf(
        LinkTextData(
          text = "Ao prosseguir, declaro que concordo com os ",
        ),
        LinkTextData(
          text = "Termos de Serviço",
          tag = "terms_of_use",
          annotation = MarinetesConfig.MARINETES_TERMS_URL,
          onClick = {
            CustomTabsIntent
              .Builder()
              .setShareState(CustomTabsIntent.SHARE_STATE_OFF)
              .build().launchUrl(context, Uri.parse(it.item))
          },
        ),
        LinkTextData(
          text = " e ",
        ),
        LinkTextData(
          text = "Política de Privacidade",
          tag = "privacy_policy",
          annotation = MarinetesConfig.MARINETES_TERMS_URL,
          onClick = {
            CustomTabsIntent
              .Builder()
              .setShareState(CustomTabsIntent.SHARE_STATE_OFF)
              .build().launchUrl(context, Uri.parse(it.item))
          },
        ),
        LinkTextData(
          text = " do Marinete's Clean House.",
        ),
      ),
    )
  }
}

@Composable
private fun CodeValidationStep(
  containerPadding: Dp,
  containerGap: Dp,
  logoSize: Dp,
  registerState: RegisterState,
  registerViewModel: RegisterViewModel,
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
      text = "Insira o código enviado para o e-mail.",
      style = MaterialTheme.typography.bodyLarge.copy(color = Colors.GREEN_300)
    )

    Input(
      length = 5,
      value = registerState.code,
      error = registerState.codeError,
      onValueChange = { registerViewModel.setCode(it) }
    )

    Button(
      text = "Validar código",
      onClick = { registerViewModel.validateData() }
    )
  }
}

@Composable
private fun UserDataStep(
  containerPadding: Dp,
  containerGap: Dp,
  logoSize: Dp,
  registerState: RegisterState,
  registerViewModel: RegisterViewModel,
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
      text = "Precisamos de mais alguns dados!",
      style = MaterialTheme.typography.bodyLarge.copy(color = Colors.GREEN_300)
    )

    Input(
      label = "Nome completo",
      value = registerState.fullName,
      error = registerState.fullNameError,
      placeholder = "Jhon Doe",
      onValueChange = { registerViewModel.setFullName(it) }
    )

    Input(
      type = InputType.CPF,
      label = "CPF",
      value = registerState.document,
      error = registerState.documentError,
      placeholder = "000.000.000-00",
      onValueChange = { registerViewModel.setDocument(it) }
    )

    Input(
      type = InputType.PHONE,
      label = "Celular",
      value = registerState.phone,
      error = registerState.phoneError,
      placeholder = "(00) 9 0000-0000",
      onValueChange = { registerViewModel.setPhone(it) }
    )

    Input(
      type = InputType.PASSWORD,
      label = "Senha",
      value = registerState.password,
      error = registerState.passwordError,
      placeholder = "••••••••••••",
      onValueChange = { registerViewModel.setPassword(it) }
    )

    Input(
      type = InputType.PASSWORD,
      label = "Confirmar senha",
      value = registerState.confirmPassword,
      error = registerState.confirmPasswordError,
      placeholder = "••••••••••••",
      onValueChange = { registerViewModel.setConfirmPassword(it, registerState.password) }
    )

    Button(
      text = "Criar conta",
      onClick = { registerViewModel.validateData() }
    )
  }
}


