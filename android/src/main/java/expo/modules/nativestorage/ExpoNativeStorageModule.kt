package expo.modules.nativestorage

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context
import android.content.SharedPreferences

class ExpoNativeStorageModule : Module() {
  private val context: Context
    get() = requireNotNull(appContext.reactContext)
  
  private val prefs: SharedPreferences
    get() = context.getSharedPreferences("ExpoNativeStorage", Context.MODE_PRIVATE)
  
  override fun definition() = ModuleDefinition {
    Name("ExpoNativeStorage")
    
    Function("setItem") { key: String, value: String ->
      prefs.edit().putString(key, value).apply()
      return@Function true
    }
    
    Function("getItem") { key: String ->
      return@Function prefs.getString(key, null)
    }
    
    Function("removeItem") { key: String ->
      prefs.edit().remove(key).apply()
      return@Function true
    }
    
    Function("clear") {
      prefs.edit().clear().apply()
      return@Function true
    }
  }
}