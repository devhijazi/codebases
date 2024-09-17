import java.io.FileInputStream
import java.util.Properties

plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
  kotlin("kapt")
  id("com.google.dagger.hilt.android")
  id("org.jetbrains.kotlin.plugin.serialization") version("1.7.10")
}

android {
  namespace = "com.marinetes"

  compileSdk = 33

  defaultConfig {
    applicationId = "com.marinetes"

    minSdk = 21
    targetSdk = 33

    versionName = "2.0.0"
    versionCode = 2

    vectorDrawables {
      useSupportLibrary = true
    }
  }

  sourceSets.all {
    kotlin.srcDir("src/${name}/kotlin")
  }

  buildTypes {
    getByName("release") {
      isMinifyEnabled = false

      val marinetesProductionFile = "marinetes.production.properties"
      val marinetesProductionProperties = Properties()

      marinetesProductionProperties.load(FileInputStream(project.rootProject.file(marinetesProductionFile)))

      buildConfigField("String", "MARINETES_USER_API_URL", marinetesProductionProperties["MARINETES_USER_API_URL"] as String)
      buildConfigField("String", "MARINETES_PAYMENT_SERVICE_URL", marinetesProductionProperties["MARINETES_PAYMENT_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_PAYMENT_SERVICE_WEBSOCKET_URL", marinetesProductionProperties["MARINETES_PAYMENT_SERVICE_WEBSOCKET_URL"] as String)
      buildConfigField("String", "MARINETES_CHAT_SERVICE_URL", marinetesProductionProperties["MARINETES_CHAT_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_CHAT_SERVICE_WEBSOCKET_URL", marinetesProductionProperties["MARINETES_CHAT_SERVICE_WEBSOCKET_URL"] as String)
      buildConfigField("String", "MARINETES_NOTIFICATION_SERVICE_URL", marinetesProductionProperties["MARINETES_NOTIFICATION_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_NOTIFICATION_SERVICE_WEBSOCKET_URL", marinetesProductionProperties["MARINETES_NOTIFICATION_SERVICE_WEBSOCKET_URL"] as String)
      buildConfigField("String", "MARINETES_CALLER_SERVICE_URL", marinetesProductionProperties["MARINETES_CALLER_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_CALLER_SERVICE_WEBSOCKET_URL", marinetesProductionProperties["MARINETES_CALLER_SERVICE_WEBSOCKET_URL"] as String)

      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
      )
    }

    getByName("debug") {
      versionNameSuffix = "-debug"

      val marinetesDevelopmentFile = "marinetes.development.properties"
      val marinetesDevelopmentProperties = Properties()

      marinetesDevelopmentProperties.load(FileInputStream(project.rootProject.file(marinetesDevelopmentFile)))

      buildConfigField("String", "MARINETES_USER_API_URL", marinetesDevelopmentProperties["MARINETES_USER_API_URL"] as String)
      buildConfigField("String", "MARINETES_PAYMENT_SERVICE_URL", marinetesDevelopmentProperties["MARINETES_PAYMENT_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_PAYMENT_SERVICE_WEBSOCKET_URL", marinetesDevelopmentProperties["MARINETES_PAYMENT_SERVICE_WEBSOCKET_URL"] as String)
      buildConfigField("String", "MARINETES_CHAT_SERVICE_URL", marinetesDevelopmentProperties["MARINETES_CHAT_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_CHAT_SERVICE_WEBSOCKET_URL", marinetesDevelopmentProperties["MARINETES_CHAT_SERVICE_WEBSOCKET_URL"] as String)
      buildConfigField("String", "MARINETES_NOTIFICATION_SERVICE_URL", marinetesDevelopmentProperties["MARINETES_NOTIFICATION_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_NOTIFICATION_SERVICE_WEBSOCKET_URL", marinetesDevelopmentProperties["MARINETES_NOTIFICATION_SERVICE_WEBSOCKET_URL"] as String)
      buildConfigField("String", "MARINETES_CALLER_SERVICE_URL", marinetesDevelopmentProperties["MARINETES_CALLER_SERVICE_URL"] as String)
      buildConfigField("String", "MARINETES_CALLER_SERVICE_WEBSOCKET_URL", marinetesDevelopmentProperties["MARINETES_CALLER_SERVICE_WEBSOCKET_URL"] as String)
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
  }

  kotlinOptions {
    jvmTarget = "1.8"
  }

  buildFeatures {
    compose = true
  }

  composeOptions {
    kotlinCompilerExtensionVersion = libs.versions.androidxCompose.get()
  }

  packagingOptions {
    resources {
      excludes += "/META-INF/{AL2.0,LGPL2.1}"
    }
  }
}

dependencies {
  implementation(libs.androidx.core.ktx)
  implementation(libs.androidx.lifecycle.runtime.ktx)
  implementation(libs.androidx.activity.compose)

  implementation(libs.androidx.compose.ui)
  implementation(libs.androidx.compose.ui.tooling)
  implementation(libs.androidx.compose.ui.tooling.preview)
  implementation(libs.androidx.compose.material.icons)
  implementation(libs.androidx.compose.material)
  implementation(libs.androidx.compose.material3)

  implementation(libs.fontawesome.compose.icons)

  implementation(libs.accompanist.navigation.animation)
  implementation(libs.accompanist.navigation.systemuicontroller)
  implementation(libs.accompanist.navigation.pager)

  implementation(libs.coil.compose)
  implementation(libs.coil.svg)
  implementation(libs.coil.gif)

  implementation(libs.androidx.browser)

  implementation(libs.androidx.compose.runtime.livedata)

  implementation(libs.hilt.navigation.compose)
  implementation(libs.hilt.android)
  kapt(libs.hilt.android.compiler)

  implementation(libs.socket.io.client) {
    exclude(group = "org.json", module = "json")
  }

  implementation(libs.ktor.client.core)
  implementation(libs.ktor.client.android)
  implementation(libs.ktor.client.cio)
  implementation(libs.ktor.client.logging)
  implementation(libs.ktor.client.content.negotiation)
  implementation(libs.ktor.serialization.kotlinx.json)
  implementation(libs.ktor.serialization.kotlinx.xml)

  implementation(libs.timeago)

  implementation(libs.shimmer)

  implementation(libs.sweet.toast)

  implementation(libs.simple.cpf.validator)
}

kapt {
  correctErrorTypes = true
}