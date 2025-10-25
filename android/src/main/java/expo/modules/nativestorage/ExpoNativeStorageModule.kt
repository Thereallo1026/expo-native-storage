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
    
    // synchronous
    Function("setItemSync") { key: String, value: String ->
      prefs.edit().putString(key, value).apply()
    }
    
    Function("getItemSync") { key: String ->
      return@Function prefs.getString(key, null)
    }
    
    Function("removeItemSync") { key: String ->
      prefs.edit().remove(key).apply()
    }
    
    Function("clearSync") {
      prefs.edit().clear().apply()
    }
    
    // async
    AsyncFunction("setItem") { key: String, value: String ->
      prefs.edit().putString(key, value).apply()
    }
    
    AsyncFunction("getItem") { key: String ->
      return@AsyncFunction prefs.getString(key, null)
    }
    
    AsyncFunction("removeItem") { key: String ->
      prefs.edit().remove(key).apply()
    }
    
    AsyncFunction("clear") {
      prefs.edit().clear().apply()
    }
  }
}