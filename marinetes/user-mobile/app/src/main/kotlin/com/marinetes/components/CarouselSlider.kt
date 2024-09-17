package com.marinetes.components

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.google.accompanist.pager.ExperimentalPagerApi
import com.google.accompanist.pager.HorizontalPager
import com.google.accompanist.pager.rememberPagerState
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@OptIn(ExperimentalPagerApi::class)
@Composable
fun CarouselSlider(
  modifier: Modifier = Modifier,
  autoplay: Boolean = false,
  delayBetweenSlides: Long = 3000,
  images: List<Int>,
) {
  val coroutineScope = rememberCoroutineScope()

  val pageState = rememberPagerState(
    pageCount = images.size,
    initialOffscreenLimit = 2,
    infiniteLoop = false,
    initialPage = 0
  )

  LaunchedEffect(key1 = pageState.currentPage) {
    if (autoplay) {
      delay(delayBetweenSlides)

      var newPosition = pageState.currentPage + 1

      if (newPosition > images.size - 1) newPosition = 0

      pageState.scrollToPage(newPosition)
    }
  }

  Column(
    modifier = modifier.fillMaxWidth(),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    val slideHeight = 130.dp

    HorizontalPager(
      modifier = Modifier.height(slideHeight),
      state = pageState,
      itemSpacing = 10.dp
    ) { page ->
      Image(
        modifier = Modifier
          .fillMaxSize()
          .clip(shape = RoundedCornerShape(10.dp)),
        painter = painterResource(images[page]),
        contentDescription = "$page"
      )
    }

    CarouselIndicator(
      pagesSize = images.size,
      currentPage = pageState.currentPage,
      onScrollToPage = {
        coroutineScope.launch {
          pageState.animateScrollToPage(it)
        }
      }
    )
  }
}

@Composable
private fun CarouselIndicator(
  pagesSize: Int,
  currentPage: Int,
  onScrollToPage: (currentPageIndex: Int) -> Unit
) {
  Row(horizontalArrangement = Arrangement.SpaceBetween) {
    repeat(pagesSize) {
      val isSelected = it == currentPage

      val boxPadding = 4.dp
      val boxWidth = animateDpAsState(targetValue = if (isSelected) 40.dp else 10.dp)
      val boxHeight = 10.dp
      val boxBackgroundColor = if (isSelected) Colors.GREEN_300 else Colors.GRAY_300

      Box(
        modifier = Modifier
          .padding(boxPadding)
          .height(boxHeight)
          .width(boxWidth.value)
          .clip(CircleShape)
          .background(color = boxBackgroundColor)
          .clickable {
            onScrollToPage(it)
          }
      )
    }
  }
}