import ExpoModulesCore

public class ExpoNativeStorageModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoNativeStorage")
    
    Function("setItem") { (key: String, value: String) -> Bool in
      UserDefaults.standard.set(value, forKey: key)
      return UserDefaults.standard.synchronize()
    }
    
    Function("getItem") { (key: String) -> String? in
      return UserDefaults.standard.string(forKey: key)
    }
    
    Function("removeItem") { (key: String) -> Bool in
      UserDefaults.standard.removeObject(forKey: key)
      return UserDefaults.standard.synchronize()
    }
    
    Function("clear") { () -> Bool in
      if let bundleID = Bundle.main.bundleIdentifier {
        UserDefaults.standard.removePersistentDomain(forName: bundleID)
        return UserDefaults.standard.synchronize()
      }
      return false
    }
  }
}