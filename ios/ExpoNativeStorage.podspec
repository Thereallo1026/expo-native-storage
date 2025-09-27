Pod::Spec.new do |s|
  s.name           = 'ExpoNativeStorage'
  s.version        = '1.0.0'
  s.summary        = 'Lightning-fast native storage for Expo'
  s.description    = 'A fast native storage solution using UserDefaults on iOS and SharedPreferences on Android'
  s.author         = 'Thereallo'
  s.homepage       = 'https://github.com/thereallo1026/expo-native-storage'
  s.platforms      = { :ios => '13.4', :tvos => '13.4' }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
