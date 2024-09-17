package com.marinetes.components

import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.ClickableText
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.marinetes.config.MarinetesConfig
import com.marinetes.theme.Colors
import com.marinetes.theme.Fonts

@Composable
fun LinkText(
  linkTextData: List<LinkTextData>,
  modifier: Modifier = Modifier,
) {
  val annotatedString = createAnnotatedString(linkTextData)

  ClickableText(
    text = annotatedString,
    style = MaterialTheme.typography.bodyMedium.copy(textAlign = TextAlign.Center),
    modifier = modifier.fillMaxWidth(),
    onClick = { offset ->
      linkTextData.forEach { annotatedStringData ->
        if (annotatedStringData.tag != null && annotatedStringData.annotation != null) {
          annotatedString.getStringAnnotations(
            tag = annotatedStringData.tag,
            start = offset,
            end = offset,
          ).firstOrNull()?.let {
            annotatedStringData.onClick?.invoke(it)
          }
        }
      }
    },
  )
}

@Preview
@Composable
private fun LinkTextPreview() {
  val context = LocalContext.current

  MaterialTheme {
    LinkText(
      linkTextData = listOf(
        LinkTextData(
          text = "Ao se cadastrar, você concorda com nossos, ",
        ),
        LinkTextData(
          text = "termos de privacidade",
          tag = "privacy_policy",
          annotation = MarinetesConfig.MARINETES_POLICES_URL,
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
          text = "termos de uso",
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
          text = ".",
        ),
      ),
    )
  }
}

@Composable
private fun createAnnotatedString(data: List<LinkTextData>): AnnotatedString {
  return buildAnnotatedString {
    data.forEach { linkTextData ->
      if (linkTextData.tag != null && linkTextData.annotation != null) {
        pushStringAnnotation(
          tag = linkTextData.tag,
          annotation = linkTextData.annotation,
        )

        withStyle(
          style = SpanStyle(
            fontFamily = Fonts.Roboto,
            fontWeight = FontWeight.Normal,
            fontSize = 12.sp,
            color = Colors.GREEN_400,
            textDecoration = TextDecoration.Underline,

          ),
        ) {
          append(linkTextData.text)
        }

        pop()
      } else {
        withStyle(
          style = SpanStyle(
            fontFamily = Fonts.Roboto,
            fontWeight = FontWeight.Normal,
            fontSize = 12.sp,
            color = Colors.GRAY_500,
          ),
        ) {
          append(linkTextData.text)
        }
      }
    }
  }
}

data class LinkTextData(
  val text: String,
  val tag: String? = null,
  val annotation: String? = null,
  val onClick: ((str: AnnotatedString.Range<String>) -> Unit)? = null,
)