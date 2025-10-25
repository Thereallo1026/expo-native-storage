import ExpoModulesCore

public class ExpoNativeStorageModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoNativeStorage")
    
    // synchronous
    Function("setItemSync") { (key: String, value: String) in
      UserDefaults.standard.set(value, forKey: key)
    }
    
    Function("getItemSync") { (key: String) -> String? in
      return UserDefaults.standard.string(forKey: key)
    }
    
    Function("removeItemSync") { (key: String) in
      UserDefaults.standard.removeObject(forKey: key)
    }
    
    Function("clearSync") { () in
      if let bundleID = Bundle.main.bundleIdentifier {
        UserDefaults.standard.removePersistentDomain(forName: bundleID)
      }
    }
    
    // async
    AsyncFunction("setItem") { (key: String, value: String) in
      UserDefaults.standard.set(value, forKey: key)
    }
    
    AsyncFunction("getItem") { (key: String) -> String? in
      return UserDefaults.standard.string(forKey: key)
    }
    
    AsyncFunction("removeItem") { (key: String) in
      UserDefaults.standard.removeObject(forKey: key)
    }
    
    AsyncFunction("clear") { () in
      if let bundleID = Bundle.main.bundleIdentifier {
        UserDefaults.standard.removePersistentDomain(forName: bundleID)
      }
    }
  }
}