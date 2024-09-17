package com.marinetes.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.noRippleClickable

const val MIN_VALUE = 0
const val MAX_VALUE = 8

@Composable
fun Counter(
  value: Int = 0,
  minValue: Int = MIN_VALUE,
  maxValue: Int = MAX_VALUE,
  onIncrement: (counter: Int) -> Unit? = { null },
  onDecrement: (counter: Int) -> Unit? = { null },
) {
  val (counter, updateCounter) = remember { mutableStateOf(value) }

  val decrementIsDisabled = counter <= minValue
  val incrementIsDisabled = counter >= maxValue

  val containerBorderRadius = 10.dp
  val containerBackgroundColor = Colors.INPUT

  val iconSize = 30.dp
  val iconDecrementColor = if (decrementIsDisabled) Colors.GRAY_400 else Colors.GREEN_400
  val iconIncrementColor = if (incrementIsDisabled) Colors.GRAY_400 else Colors.GREEN_400

  val textColor = Colors.GRAY_500

  fun handleIncrement() {
    if (incrementIsDisabled) {
      updateCounter(maxValue);
      onIncrement(maxValue);

      return;
    }

    updateCounter(counter + 1);
    onIncrement(counter + 1);
  }

  fun handleDecrement() {
    if (decrementIsDisabled) {
      updateCounter(minValue);
      onDecrement(minValue);

      return;
    }

    updateCounter(counter - 1);
    onDecrement(counter - 1);
  }

  Row(
    modifier = Modifier
      .defaultMinSize(minWidth = 120.dp)
      .clip(shape = RoundedCornerShape(containerBorderRadius))
      .background(color = containerBackgroundColor)
      .padding(10.dp),
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.SpaceBetween,
  ) {
    Icon(
      imageVector = Icons.UIActions.Outlined.RemoveCircleOutline,
      modifier = Modifier
        .size(iconSize)
        .noRippleClickable { handleDecrement() },
      tint = iconDecrementColor,
      contentDescription = null
    )

    Text(
      text = counter.toString(),
      style = MaterialTheme.typography.titleLarge.copy(color = textColor)
    )

    Icon(
      imageVector = Icons.UIActions.Outlined.AddCircleOutline,
      modifier = Modifier
        .size(iconSize)
        .noRippleClickable { handleIncrement() },
      tint = iconIncrementColor,
      contentDescription = null
    )
  }
}

@Preview
@Composable
private fun CounterPreview() {
  MaterialTheme {
    Counter()
  }
}