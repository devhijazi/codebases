package com.marinetes.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors
import com.marinetes.theme.MarinetesTheme
import com.marinetes.theme.noRippleClickable
import androidx.compose.material3.Checkbox as ComposeCheckbox

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CheckBox(
  label: String,
  checked: Boolean,
  checkedColor: Color = Colors.GREEN_400,
  uncheckedColor: Color = Colors.GREEN_400,
  textColor: Color = Colors.GREEN_400,
  modifier: Modifier = Modifier,
  onCheckedChange: ((Boolean) -> Unit),
) {
  Row(
    modifier = modifier.noRippleClickable { onCheckedChange(!checked) },
    verticalAlignment = Alignment.CenterVertically,
    horizontalArrangement = Arrangement.Center,
  ) {
    ComposeCheckbox(
      checked = checked,
      colors = CheckboxDefaults.colors(
        checkedColor = checkedColor,
        uncheckedColor = uncheckedColor
      ),
      onCheckedChange = null
    )

    Spacer(modifier = Modifier.size(6.dp))

    Text(
      text = label,
      style = MaterialTheme.typography.bodyMedium.copy(color = textColor)
    )
  }
}

@Preview(showBackground = true)
@Composable
private fun CheckboxPreview() {
  val (checked, setChecked) = remember { mutableStateOf(false) }

  MarinetesTheme {
    CheckBox(
      label = "Continuar logado",
      checked = checked,
      onCheckedChange = { setChecked(!checked) }
    )
  }
}