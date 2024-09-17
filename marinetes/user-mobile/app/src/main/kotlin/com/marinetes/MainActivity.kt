package com.marinetes

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.marinetes.navigation.NavigationController
import com.marinetes.services.AppService
import com.marinetes.theme.MarinetesTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val intent = Intent(applicationContext, AppService::class.java)

    startService(intent)

    setContent {
      MarinetesTheme {
        NavigationController()
      }
    }
  }
}