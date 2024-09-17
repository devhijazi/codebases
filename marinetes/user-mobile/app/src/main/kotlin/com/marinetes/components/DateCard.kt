package com.marinetes.components

import android.annotation.SuppressLint
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.utils.DayData
import com.marinetes.utils.TimeUtils
import com.marinetes.viewmodels.SolicitationState
import com.marinetes.viewmodels.SolicitationViewModel
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

@SuppressLint("UnrememberedMutableState")
@Composable
fun DateCard(
  solicitationState: SolicitationState,
  solicitationViewModel: SolicitationViewModel,
) {
  val days = TimeUtils.getAllDaysOfTheYearStartingFromToday()
  val daysLazyRowState = rememberLazyListState()

  val currentDateOfYear = Calendar.getInstance()
  val defaultDate = DayData(
    dayShortName = TimeUtils.dayShortName(currentDateOfYear.get(Calendar.DAY_OF_WEEK)),
    displayDate = currentDateOfYear.get(Calendar.DAY_OF_MONTH).toString(),
    fullDate = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(currentDateOfYear.time),
    monthShortName = TimeUtils.monthShortName(currentDateOfYear.get(Calendar.MONTH)),
    year = currentDateOfYear.get(Calendar.YEAR).toString(),
    iso = solicitationState.date
  )

  val currentDay = remember { mutableStateOf<DayData>(defaultDate) }
  val currentDayIndex = remember { mutableStateOf(0) }
  val currentMonthAndYear = remember { mutableStateOf<String>(
    "${
      defaultDate.monthShortName.replace(".", "").uppercase()
    } ${defaultDate.year}"
  )}

  LaunchedEffect(key1 = currentDay.value) {
    solicitationViewModel.setDate(currentDay.value.iso)
  }

  Column(
    verticalArrangement = Arrangement.spacedBy(10.dp)
  ) {
    DateSelectorMonthHeader(days, daysLazyRowState, currentDay, currentDayIndex, currentMonthAndYear)
    DateSelectorDayList(days, daysLazyRowState, currentDay, currentDayIndex, currentMonthAndYear,solicitationState)
  }
}

@Composable
private fun DateSelectorMonthHeader(
  days: MutableList<DayData>,
  daysLazyRowState: LazyListState,
  currentDay: MutableState<DayData>,
  currentDayIndex: MutableState<Int>,
  currentMonthAndYear: MutableState<String>
) {
  val coroutineScope = rememberCoroutineScope()

  val iconColorNormal = Colors.GREEN_300
  val iconColorDisabled = Colors.GRAY_300

  Row(
    modifier = Modifier.fillMaxWidth(),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.Center
  ) {
    IconButton(
      enabled = currentDayIndex.value > 0,
      onClick = {
        coroutineScope.launch {
          val index = currentDayIndex.value - 1

          currentDayIndex.value = index

          currentDay.value = days[index]

          daysLazyRowState.scrollToItem(index, -300)
        }
      }
    ) {
      Icon(
        imageVector = Icons.UIActions.Outlined.ArrowBackIos,
        modifier = Modifier.size(24.dp),
        tint = if (currentDayIndex.value > 0) iconColorNormal else iconColorDisabled,
        contentDescription = null,
      )
    }

    Text(
      text = currentMonthAndYear.value,
      style = MaterialTheme.typography.titleLarge.copy(
        fontSize = 24.sp,
        color = Colors.GREEN_300
      )
    )

    IconButton(
      enabled = currentDayIndex.value < days.size - 1,
      onClick = {
        coroutineScope.launch {
          val index = currentDayIndex.value + 1

          currentDayIndex.value = index

          currentDay.value = days[index]

          daysLazyRowState.scrollToItem(index, -300)
        }
      }
    ) {
      Icon(
        imageVector = Icons.UIActions.Outlined.ArrowForwardIos,
        modifier = Modifier.size(24.dp),
        tint = if (currentDayIndex.value < days.size - 1) iconColorNormal else iconColorDisabled,
        contentDescription = null,
      )
    }
  }
}

@Composable
private fun DateSelectorDayList(
  days: MutableList<DayData>,
  daysLazyRowState: LazyListState,
  currentDay: MutableState<DayData>,
  currentDayIndex: MutableState<Int>,
  currentMonthAndYear: MutableState<String>,
  solicitationState: SolicitationState
) {
  Column {
    LazyRow(
      state = daysLazyRowState,
      modifier = Modifier.fillMaxWidth(),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      items(days) { day ->
        val index = days.indexOf(day)

        if (daysLazyRowState.firstVisibleItemIndex == index) {
          currentMonthAndYear.value =
            "${day.monthShortName.replace(".", "").uppercase()} ${day.year}"
        }

        DateSelectorDayContent(
          day = day,
          index = index,
          firstIndex = 0,
          lastIndex = days.size - 1,
          isSelected = { fullDate -> days[currentDayIndex.value].fullDate == fullDate },
          onClick = { dayData ->
            currentDayIndex.value = index

            currentDay.value = dayData
          }
        )
      }
    }

    if (solicitationState.dateError != null) {
      Text(
        text = solicitationState.dateError,
        modifier = Modifier.align(alignment = Alignment.End).padding(20.dp),
        style = MaterialTheme.typography.bodySmall.copy(color = Colors.RED_400)
      )
    }
  }
}

@Composable
private fun DateSelectorDayContent(
  day: DayData,
  index: Int,
  firstIndex: Int,
  lastIndex: Int,
  isSelected: (String) -> Boolean,
  onClick: (DayData) -> Unit = {}
) {
  val containerPaddingStart = when (index) {
    firstIndex -> 20.dp
    else -> 0.dp
  }

  val containerPaddingEnd = when (index) {
    lastIndex -> 20.dp
    else -> 0.dp
  }

  val containerBorderRadius = 10.dp
  val containerShape = RoundedCornerShape(containerBorderRadius)

  val dayWeekTextColorNormal = Colors.GRAY_400
  val dayWeekNumberTextColorNormal = Colors.GREEN_300
  val containerBackgroundColorNormal = Colors.WHITE

  val dayWeekTextColorSelected = Colors.WHITE
  val dayWeekNumberTextColorSelected = Colors.WHITE
  val containerBackgroundColorSelected = Colors.GREEN_300

  val dayWeekTextColor =
    if (isSelected(day.fullDate)) dayWeekTextColorSelected else dayWeekTextColorNormal
  val dayWeekNumberTextColor =
    if (isSelected(day.fullDate)) dayWeekNumberTextColorSelected else dayWeekNumberTextColorNormal
  val containerBackgroundColor =
    if (isSelected(day.fullDate)) containerBackgroundColorSelected else containerBackgroundColorNormal

  Column(
    modifier = Modifier
      .padding(
        start = containerPaddingStart,
        end = containerPaddingEnd
      )
      .clip(shape = containerShape)
      .clickable { onClick(day) }
      .background(color = containerBackgroundColor, shape = containerShape)
      .padding(10.dp),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Text(
      text = day.dayShortName.replace(".", "").uppercase(),
      textAlign = TextAlign.Center,
      style = MaterialTheme.typography.bodyLarge.copy(fontSize = 12.sp),
      maxLines = 1,
      color = dayWeekTextColor
    )

    Text(
      text = day.displayDate,
      textAlign = TextAlign.Center,
      style = MaterialTheme.typography.bodyLarge.copy(fontSize = 20.sp),
      maxLines = 1,
      color = dayWeekNumberTextColor
    )
  }
}