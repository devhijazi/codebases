package com.marinetes.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.TextRange
import androidx.compose.ui.text.input.*
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.marinetes.theme.Colors
import com.marinetes.theme.Icons
import com.marinetes.theme.MarinetesTheme
import com.marinetes.theme.noRippleClickable
import kotlin.math.absoluteValue
import java.lang.Integer.max
import java.text.DecimalFormat

enum class InputVariant {
  LABEL,
  ICON,
  OTP,
}

enum class InputType {
  TEXT,
  EMAIL,
  PASSWORD,
  PHONE,
  CPF,
  CEP,
  CURRENCY
}

@Composable
fun Input(
  variant: InputVariant = InputVariant.LABEL,
  type: InputType = InputType.TEXT,
  label: String,
  value: String,
  error: String? = null,
  placeholder: String = "",
  containerModifier: Modifier = Modifier,
  inputModifier: Modifier = Modifier,
  errorModifier: Modifier = Modifier,
  isReadOnly: Boolean = false,
  isDisabled: Boolean = false,
  onClick: () -> Any? = { null },
  onValueChange: (String) -> Unit,
  customIcon: @Composable () -> Unit? = { null },
) {
  val (isShowPassword, setShowPassword) = remember { mutableStateOf(false) }

  val mainGap = 5.dp

  val inputHeight = 60.dp
  val inputPaddingVertical = 10.dp
  val inputPaddingHorizontal = 15.dp
  val inputBackgroundColor = if (isDisabled) Colors.INPUT_DISABLED else Colors.INPUT
  val inputBorderRadius = 10.dp

  val inputContentGap = 5.dp
  val inputContentWeight = 1F

  val labelColor = Colors.GRAY_500

  val textColor = Colors.GRAY_400
  val textPlaceholderColor = if (isDisabled) Colors.GRAY_200 else Colors.GRAY_300
  val textStyle = MaterialTheme.typography.bodyMedium.copy(color = textColor)

  val passwordIconColor = Colors.GRAY_500

  Column(
    modifier = containerModifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Row(
      modifier = inputModifier
        .fillMaxWidth()
        .height(inputHeight)
        .noRippleClickable { onClick() }
        .background(
          color = inputBackgroundColor,
          shape = RoundedCornerShape(size = inputBorderRadius)
        )
        .padding(
          vertical = inputPaddingVertical,
          horizontal = inputPaddingHorizontal
        ),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(inputContentGap)
    ) {
      Column(
        modifier = Modifier.weight(inputContentWeight)
      ) {
        if (label.isNotBlank()) {
          Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium.copy(color = labelColor),
            modifier = Modifier.noRippleClickable { onClick() }
          )
        }

        val interactionSource = remember { MutableInteractionSource() }
        val isPressed: Boolean by interactionSource.collectIsPressedAsState()

        LaunchedEffect(key1 = isPressed) {
          if (isPressed) {
            onClick()
          }
        }

        BasicTextField(
          value = value,
          maxLines = 1,
          singleLine = true,
          modifier = Modifier.fillMaxWidth(),
          textStyle = textStyle,
          readOnly = isDisabled || isReadOnly,
          visualTransformation = getVisualTransformationPerType(type, isShowPassword),
          keyboardOptions = KeyboardOptions(keyboardType = getKeyboardType(type)),
          interactionSource = interactionSource,
          decorationBox = { innerTextField ->
            Row(modifier = Modifier.fillMaxWidth()) {
              if (value.isEmpty()) Text(
                text = placeholder,
                style = textStyle.copy(color = textPlaceholderColor)
              )
            }

            innerTextField()
          },
          onValueChange = { inputValue ->
            if (!isDisabled) {
              if (type in listOf(InputType.TEXT, InputType.EMAIL, InputType.PASSWORD)) {
                onValueChange(inputValue)
              } else {
                val maxLength = when (type) {
                  InputType.PHONE -> InputMaskLength.PHONE
                  InputType.CPF -> InputMaskLength.CPF
                  InputType.CEP -> InputMaskLength.CEP
                  else -> Int.MAX_VALUE
                }

                val filteredValue = inputValue.filter { it.isDigit() }

                if (filteredValue.length <= maxLength) {
                  onValueChange(filteredValue)
                }
              }
            }
          },
        )
      }

      if (!isDisabled && type != InputType.PASSWORD) {
        customIcon()
      }

      if (!isDisabled && type == InputType.PASSWORD && value != "") {
        Icon(
          modifier = Modifier.clickable { setShowPassword(!isShowPassword) },
          imageVector = if (isShowPassword) Icons.CommonActions.Outlined.VisibilityOff
          else Icons.CommonActions.Outlined.Visibility,
          contentDescription = null,
          tint = passwordIconColor
        )
      }
    }

    if (error != null) {
      Text(
        text = error,
        modifier = errorModifier.align(alignment = Alignment.End),
        style = MaterialTheme.typography.bodySmall.copy(color = Colors.RED_400)
      )
    }
  }
}

@Preview()
@Composable
private fun InputLabelPreview() {
  MarinetesTheme {
    Column(
      modifier = Modifier
        .background(color = Colors.WHITE)
        .padding(10.dp),
      verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      Input(
        type = InputType.EMAIL,
        label = "E-mail",
        value = "user@example.com",
        error = null,
        placeholder = "user@example.com",
        onValueChange = {}
      )

      Input(
        type = InputType.EMAIL,
        label = "E-mail",
        value = "user@example.com",
        error = null,
        placeholder = "user@example.com",
        isDisabled = true,
        onValueChange = {}
      )

      Input(
        type = InputType.EMAIL,
        label = "",
        value = "user@example.com",
        error = null,
        placeholder = "user@example.com",
        onValueChange = {}
      )

      Input(
        type = InputType.PASSWORD,
        label = "Senha",
        value = "1234567",
        error = null,
        placeholder = "••••••••••••",
        onValueChange = {}
      )

      Input(
        type = InputType.CPF,
        label = "CPF",
        value = "00000000000",
        error = null,
        placeholder = "example",
        onValueChange = {}
      )

      Input(
        label = "Nome completo",
        value = "",
        error = null,
        placeholder = "Jhon Doe",
        onValueChange = {}
      )

      Input(
        label = "Nome completo",
        value = "M1 name 1s giovann1 g1orgio",
        error = "Invalid value",
        placeholder = "Jhon Doe",
        onValueChange = {}
      )
    }
  }
}

@Composable
fun Input(
  variant: InputVariant = InputVariant.ICON,
  type: InputType = InputType.TEXT,
  icon: ImageVector,
  value: String,
  error: String? = null,
  placeholder: String = "",
  containerModifier: Modifier = Modifier,
  onValueChange: (String) -> Unit
) {
  var showPassword by remember { mutableStateOf(false) }

  val mainGap = 5.dp

  val inputHeight = 60.dp
  val inputPaddingVertical = 10.dp
  val inputPaddingHorizontal = 15.dp
  val inputBackgroundColor = Colors.INPUT
  val inputBorderRadius = 10.dp

  val inputContentGap = 10.dp
  val inputContentWeight = 1F

  val textColor = Colors.GRAY_400
  val textPlaceholderColor = Colors.GRAY_300
  val textSize = 16.sp
  val textStyle = MaterialTheme.typography.bodyMedium.copy(
    color = textColor,
    fontSize = textSize,
  )

  val iconColor = Colors.GREEN_300
  val passwordIconColor = Colors.GRAY_500

  val iconSize = 30.dp

  Column(
    modifier = containerModifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(mainGap)
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .height(inputHeight)
        .background(
          color = inputBackgroundColor,
          shape = RoundedCornerShape(size = inputBorderRadius)
        )
        .padding(
          vertical = inputPaddingVertical,
          horizontal = inputPaddingHorizontal
        ),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.spacedBy(inputContentGap)
    ) {
      Row(
        modifier = Modifier.weight(inputContentWeight),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(inputContentGap)
      ) {
        Icon(
          modifier = Modifier.size(iconSize),
          imageVector = icon,
          contentDescription = null,
          tint = iconColor
        )

        BasicTextField(
          value = value,
          maxLines = 1,
          singleLine = true,
          modifier = Modifier.fillMaxWidth(),
          textStyle = textStyle,
          visualTransformation = getVisualTransformationPerType(type, showPassword),
          keyboardOptions = KeyboardOptions(keyboardType = getKeyboardType(type)),
          decorationBox = { innerTextField ->
            Row(modifier = Modifier.fillMaxWidth()) {
              if (value.isEmpty()) Text(
                text = placeholder,
                style = textStyle.copy(color = textPlaceholderColor)
              )
            }

            innerTextField()
          },
          onValueChange = {
            if (
              (type == InputType.PHONE && it.length <= InputMaskLength.PHONE) ||
              (type == InputType.CPF && it.length <= InputMaskLength.CPF)
            ) {
              onValueChange(it.filter { it.isDigit() })
            } else {
              onValueChange(it)
            }
          },
        )
      }

      if (type == InputType.PASSWORD && value != "") {
        Icon(
          modifier = Modifier.clickable { showPassword = !showPassword },
          imageVector = if (showPassword) Icons.CommonActions.Outlined.VisibilityOff
          else Icons.CommonActions.Outlined.Visibility,
          contentDescription = null,
          tint = passwordIconColor
        )
      }
    }

    if (error != null) {
      Text(
        text = error,
        modifier = Modifier.align(alignment = Alignment.End),
        style = MaterialTheme.typography.bodySmall.copy(color = Colors.RED_400)
      )
    }
  }
}

@Preview
@Composable
private fun InputIconPreview() {
  MarinetesTheme {
    Column(
      modifier = Modifier
        .background(color = Colors.WHITE)
        .padding(10.dp),
      verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      Input(
        icon = Icons.Social.Outlined.Person,
        value = "",
        error = null,
        placeholder = "Placeholder",
        onValueChange = {}
      )

      Input(
        type = InputType.EMAIL,
        icon = Icons.Communication.Outlined.AlternateEmail,
        value = "user@example.com",
        error = null,
        placeholder = "E-mail",
        onValueChange = {}
      )

      Input(
        type = InputType.PASSWORD,
        icon = Icons.CommonActions.Outlined.Lock,
        value = "12345678",
        error = null,
        placeholder = "Senha",
        onValueChange = {}
      )

      Input(
        icon = Icons.Social.Outlined.Person,
        value = "M1 name 1s giovann1 g1orgio",
        error = "Invalid value",
        placeholder = "Jhon Doe",
        onValueChange = {}
      )
    }
  }
}

@Composable
fun Input(
  variant: InputVariant = InputVariant.OTP,
  length: Int,
  value: String = "",
  error: String? = null,
  modifier: Modifier = Modifier,
  onValueChange: (String) -> Unit
) {
  val containerGap = 5.dp

  Column(
    modifier = modifier.fillMaxWidth(),
    verticalArrangement = Arrangement.spacedBy(containerGap)
  ) {
    LaunchedEffect(Unit) {
      if (value.length > length) {
        throw IllegalArgumentException("Otp text value must not have more than otpCount: $length characters")
      }
    }

    BasicTextField(
      value = TextFieldValue(value, selection = TextRange(value.length)),
      onValueChange = {
        if (it.text.length <= length) {
          onValueChange.invoke(it.text)
        }
      },
      keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
      decorationBox = {
        Row(horizontalArrangement = Arrangement.Center) {
          repeat(length) { index ->
            OtpItem(
              index = index,
              text = value,
              modifier = Modifier.weight(1f)
            )

            Spacer(modifier = Modifier.width(8.dp))
          }
        }
      }
    )

    if (error != null) {
      Text(
        text = error,
        modifier = Modifier.align(alignment = Alignment.End),
        style = MaterialTheme.typography.bodySmall.copy(color = Colors.RED_400)
      )
    }
  }
}

@Preview
@Composable
private fun InputCodePreview() {
  MarinetesTheme {
    Column(
      modifier = Modifier
        .background(color = Colors.WHITE)
        .padding(10.dp),
      verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
      Input(
        length = 5,
        value = "12345",
        error = null,
        onValueChange = {}
      )

      Input(
        length = 5,
        value = "123",
        error = "Invalid value",
        onValueChange = {}
      )
    }
  }
}

@Composable
private fun OtpItem(
  modifier: Modifier = Modifier,
  index: Int,
  text: String
) {
  val isFocused = text.length == index

  val char = when {
    index == text.length -> ""
    index > text.length -> ""
    else -> text[index].toString()
  }

  val containerBackgroundColor = Colors.INPUT
  val containerBorderRadius = 16.dp

  Text(
    modifier = modifier
      .height(60.dp)
      .background(
        color = containerBackgroundColor,
        shape = RoundedCornerShape(size = containerBorderRadius)
      )
      .border(
        1.dp,
        when {
          isFocused -> Colors.GREEN_300
          else -> Colors.TRANSPARENT
        },
        RoundedCornerShape(16.dp)
      )
      .wrapContentHeight(align = Alignment.CenterVertically),
    text = char,
    textAlign = TextAlign.Center
  )
}

private fun getKeyboardType(type: InputType): KeyboardType {
  return when (type) {
    InputType.TEXT -> KeyboardType.Text
    InputType.EMAIL -> KeyboardType.Email
    InputType.PASSWORD -> KeyboardType.Password
    InputType.PHONE -> KeyboardType.NumberPassword
    InputType.CPF -> KeyboardType.NumberPassword
    InputType.CEP -> KeyboardType.NumberPassword
    InputType.CURRENCY -> KeyboardType.NumberPassword
  }
}

private fun getVisualTransformationPerType(
  type: InputType,
  showPassword: Boolean
): VisualTransformation {
  return when (type) {
    InputType.TEXT -> VisualTransformation.None
    InputType.EMAIL -> VisualTransformation.None
    InputType.EMAIL -> VisualTransformation.None
    InputType.PASSWORD -> if (!showPassword) PasswordVisualTransformation() else VisualTransformation.None
    InputType.PHONE -> InputMaskVisualTransformation("(##) # ####-####")
    InputType.CPF -> InputMaskVisualTransformation("###.###.###-##")
    InputType.CEP -> InputMaskVisualTransformation("######-##")
    InputType.CURRENCY -> CurrencyAmountInputVisualTransformation()
  }
}

private class InputMaskVisualTransformation(private val mask: String) : VisualTransformation {
  private val specialSymbolsIndices = mask.indices.filter { mask[it] != '#' }

  override fun filter(text: AnnotatedString): TransformedText {
    var out = ""
    var maskIndex = 0

    text.forEach { char ->
      while (specialSymbolsIndices.contains(maskIndex)) {
        out += mask[maskIndex]

        maskIndex++
      }

      out += char

      maskIndex++
    }

    return TransformedText(AnnotatedString(out), offsetTranslator())
  }

  private fun offsetTranslator() = object : OffsetMapping {
    override fun originalToTransformed(offset: Int): Int {
      val offsetValue = offset.absoluteValue

      if (offsetValue == 0) return 0

      var numberOfHashtags = 0

      val masked = mask.takeWhile {
        if (it == '#') numberOfHashtags++

        numberOfHashtags < offsetValue
      }

      return masked.length + 1
    }

    override fun transformedToOriginal(offset: Int): Int {
      return mask.take(offset.absoluteValue).count { it == '#' }
    }
  }
}

object InputMaskLength {
  const val PHONE = 11
  const val CPF = 11
  const val CEP = 8
}

class CurrencyAmountInputVisualTransformation(
  private val fixedCursorAtTheEnd: Boolean = true,
  private val numberOfDecimals: Int = 2
) : VisualTransformation {

  private val symbols = DecimalFormat().decimalFormatSymbols

  override fun filter(text: AnnotatedString): TransformedText {
    val thousandsSeparator = symbols.groupingSeparator
    val decimalSeparator = symbols.decimalSeparator
    val zero = symbols.zeroDigit

    val inputText = text.text

    val intPart = inputText
      .dropLast(numberOfDecimals)
      .reversed()
      .chunked(3)
      .joinToString(thousandsSeparator.toString())
      .reversed()
      .ifEmpty {
        zero.toString()
      }

    val fractionPart = inputText.takeLast(numberOfDecimals).let {
      if (it.length != numberOfDecimals) {
        List(numberOfDecimals - it.length) {
          zero
        }.joinToString("") + it
      } else {
        it
      }
    }

    val formattedNumber = intPart + decimalSeparator + fractionPart

    val newText = AnnotatedString(
      text = formattedNumber,
      spanStyles = text.spanStyles,
      paragraphStyles = text.paragraphStyles
    )

    val offsetMapping = if (fixedCursorAtTheEnd) {
      FixedCursorOffsetMapping(
        contentLength = inputText.length,
        formattedContentLength = formattedNumber.length
      )
    } else {
      MovableCursorOffsetMapping(
        unmaskedText = text.toString(),
        maskedText = newText.toString(),
        decimalDigits = numberOfDecimals
      )
    }

    val sb = StringBuilder()
    val symbol = "R$ "

    sb.append(symbol)
    sb.append(newText.toString())

    return TransformedText(
      text = AnnotatedString(sb.toString()),
      offsetMapping = offsetMapping
    )
  }

  private class FixedCursorOffsetMapping(
    private val contentLength: Int,
    private val formattedContentLength: Int,
  ) : OffsetMapping {
    override fun originalToTransformed(offset: Int): Int = formattedContentLength
    override fun transformedToOriginal(offset: Int): Int = contentLength
  }

  private class MovableCursorOffsetMapping(
    private val unmaskedText: String,
    private val maskedText: String,
    private val decimalDigits: Int
  ) : OffsetMapping {
    override fun originalToTransformed(offset: Int): Int =
      when {
        unmaskedText.length <= decimalDigits -> {
          maskedText.length - (unmaskedText.length - offset)
        }

        else -> {
          offset + offsetMaskCount(offset, maskedText)
        }
      }

    override fun transformedToOriginal(offset: Int): Int =
      when {
        unmaskedText.length <= decimalDigits -> {
          max(unmaskedText.length - (maskedText.length - offset), 0)
        }

        else -> {
          offset - maskedText.take(offset).count { !it.isDigit() }
        }
      }

    private fun offsetMaskCount(offset: Int, maskedText: String): Int {
      var maskOffsetCount = 0
      var dataCount = 0
      for (maskChar in maskedText) {
        if (!maskChar.isDigit()) {
          maskOffsetCount++
        } else if (++dataCount > offset) {
          break
        }
      }
      return maskOffsetCount
    }
  }
}