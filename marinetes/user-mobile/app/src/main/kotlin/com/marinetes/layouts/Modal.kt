package com.marinetes.layouts

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetLayout as ComposeModalBottomSheetLayout
import androidx.compose.material.ModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.marinetes.theme.Colors

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun Modal(
  modalState: ModalBottomSheetState,
  modalContent: @Composable ColumnScope.() -> Unit,
  screen: @Composable () -> Unit,
) {

  val modalBorderRadius = 10.dp
  val modalPadding = 20.dp

  val modalDragMarginBottom = 30.dp
  val modalDragWidth = 60.dp
  val modalDragHeight = 5.dp
  val modalDragColor = Colors.GRAY_300
  val modalDragBorderRadius = 10.dp

  ComposeModalBottomSheetLayout(
    sheetState = modalState,
    sheetBackgroundColor = Colors.BACKGROUND,
    sheetShape = RoundedCornerShape(
      topStart = modalBorderRadius,
      topEnd = modalBorderRadius
    ),
    sheetContent = {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(modalPadding),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        Spacer(
          modifier = Modifier
            .padding(bottom = modalDragMarginBottom)
            .width(modalDragWidth)
            .height(modalDragHeight)
            .background(
              color = modalDragColor,
              shape = RoundedCornerShape(modalDragBorderRadius)
            )
        )

        modalContent()
      }
    }
  ) {
    screen()
  }
}