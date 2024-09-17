package com.marinetes.components

import androidx.compose.foundation.Image as ComposeImage
import androidx.compose.foundation.clickable
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalInspectionMode
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import com.marinetes.R
import com.marinetes.theme.MarinetesTheme
import coil.compose.AsyncImage
import coil.decode.SvgDecoder
import coil.request.ImageRequest

@Composable
fun Image(
  url: String? = null,
  onClick: () -> Unit = {},
  modifier: Modifier = Modifier.clickable { onClick() },
) {
  if (url == null || LocalInspectionMode.current) {
    ComposeImage(
      painter = painterResource(R.drawable.lulu_mil_grau),
      modifier = modifier,
      contentDescription = "image",
      contentScale = ContentScale.Crop,
    )
  } else {
    AsyncImage(
      model = ImageRequest.Builder(LocalContext.current)
        .decoderFactory(SvgDecoder.Factory())
        .data(url)
        .crossfade(true)
        .build(),
      modifier = modifier,
      contentDescription = "image",
      contentScale = ContentScale.Crop,
    )
  }
}

@Preview
@Composable
private fun ImagePreview() {
  MarinetesTheme {
    Image()
  }
}