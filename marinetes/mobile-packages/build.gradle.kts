plugins {
  `maven-publish`
  java
  kotlin("jvm") version Versions.KOTLIN
}

allprojects {
	group = "br.com.marinetes"

	repositories {
		mavenCentral()
	}
}

subprojects {
  apply(plugin = "java")
  apply(plugin = "maven-publish")

  configure<PublishingExtension> {
    repositories {
      maven {
        name = "GitHubPackages"
        url = uri("https://maven.pkg.github.com/hitechline/hitl-mrn-mobile-packages")
        credentials {
          username = "hitechline"
          password = System.getenv("GPR_TOKEN")
        }
      }
    }

    publications {
      register<MavenPublication>("gpr") {
        from(components["java"])
      }
    }
  }
}

java {
	sourceCompatibility = JavaVersion.VERSION_11
	targetCompatibility = JavaVersion.VERSION_11
}