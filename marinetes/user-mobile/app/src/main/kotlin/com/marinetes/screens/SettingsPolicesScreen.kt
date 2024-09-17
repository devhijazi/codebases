package com.marinetes.screens

import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.marinetes.components.LinkText
import com.marinetes.components.LinkTextData
import com.marinetes.config.MarinetesConfig
import com.marinetes.layouts.DefaultLayout
import com.marinetes.viewmodels.AuthenticationViewModel

@Composable
fun SettingsPolicesScreen(
  navController: NavHostController,
  authenticationViewModel: AuthenticationViewModel,
) {
  val context = LocalContext.current

  val containerPadding = 20.dp
  val containerGap = 10.dp

  DefaultLayout(
    navController = navController,
    authenticationViewModel = authenticationViewModel,
  ) {
    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(all = containerPadding),
      verticalArrangement = Arrangement.spacedBy(containerGap)
    ) {
      Text(
        text = "Política de privacidade e Termos de Uso",
        style = MaterialTheme.typography.bodyLarge
      )

      Text(
        text = "Este aplicativo é mantido e operado por Marinete's Clean House. Nós coletamos e " +
          "utilizamos alguns dados pessoais que pertencem àqueles que utilizam nosso aplicativo. Ao " +
          "fazê-lo, agimos na qualidade de controlador desses dados e estamos sujeitos às disposições" +
          " da Lei Federal n. 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD). Nós " +
          "cuidamos da proteção de seus dados pessoais e, por isso, disponibilizamos esta política " +
          "de privacidade, que contém informações importantes sobre: - Quem deve utilizar nosso " +
          "aplicativo - Quais dados coletamos e o que fazemos com eles; - Seus direitos em relação " +
          "aos seus dados pessoais; e - Como entrar em contato conosco.",
        style = MaterialTheme.typography.bodySmall,
        textAlign = TextAlign.Justify,
      )

      LinkText(
        linkTextData = listOf(
          LinkTextData(text = "Leia mais no "),
          LinkTextData(
            text = "site oficial do Marinete's",
            tag = "privacy_policy",
            annotation = MarinetesConfig.MARINETES_POLICES_URL,
            onClick = {
              CustomTabsIntent
                .Builder()
                .setShareState(CustomTabsIntent.SHARE_STATE_OFF)
                .build().launchUrl(context, Uri.parse(it.item))
            },
          ),
          LinkTextData(text = "."),
        ),
      )
    }
  }
}