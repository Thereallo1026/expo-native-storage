# expo-native-storage

[![npm version](https://badge.fury.io/js/expo-native-storage.svg)](https://badge.fury.io/js/expo-native-storage)
[![npm downloads](https://img.shields.io/npm/dm/expo-native-storage.svg)](https://npmjs.org/package/expo-native-storage)

Lightning-fast native storage for Expo using UserDefaults and SharedPreferences.

## Why?

- **Fast**: Direct native storage, no bridge delays
- **Tiny**: 19x smaller bundle size compared to AsyncStorage
- **Scales**: Gets faster with more operations (up to 32x on Android)
- **Web support**: Falls back to localStorage  
- **Native**: Uses UserDefaults (iOS) & SharedPreferences (Android)

## Installation

```bash
# bun
bunx expo install expo-native-storage
# npm
npx expo install expo-native-storage
```

> [!IMPORTANT]
> After installation, you must rebuild your app to link the native module. This module requires native code and will **not** work with Expo Go. You need a development build or production build.

```bash
# For development builds
npx expo prebuild --clean
npx expo run:ios
# or
npx expo run:android
```

This module requires native code and will **not** work with Expo Go. You need a development build or production build.

## Usage

### Async API (Promise-based)

```typescript
import Storage from 'expo-native-storage';

// Store strings
await Storage.setItem('username', 'john_doe');
const username = await Storage.getItem('username'); // 'john_doe'

// Store objects
await Storage.setObject('user', { 
  name: 'John', 
  age: 30,
  premium: true 
});
const user = await Storage.getObject('user');

// Remove items
await Storage.removeItem('username');

// Clear all
await Storage.clear();
```

### Sync API (Immediate, no Promises)

```typescript
import Storage from 'expo-native-storage';

// Store strings synchronously
Storage.setItemSync('username', 'john_doe');
const username = Storage.getItemSync('username'); // 'john_doe'

// Store objects synchronously
Storage.setObjectSync('user', { 
  name: 'John', 
  age: 30,
  premium: true 
});
const user = Storage.getObjectSync('user');

// Remove items synchronously
Storage.removeItemSync('username');

// Clear all synchronously
Storage.clearSync();
```

**When to use sync vs async:**
- **Sync methods**: App initialization, reading config on startup, settings screens
- **Async methods**: When you need to coordinate with other async operations, or prefer Promise-based code

## Example: Theme Storage

```typescript
// Save theme preference
await Storage.setItem('theme', 'dark');

// Load on app start
const theme = await Storage.getItem('theme') || 'light';
```

## API

### Async Methods

| Method | Description | Return |
|--------|-------------|---------|
| `setItem(key, value)` | Store a string value | `Promise<void>` |
| `getItem(key)` | Get a string value | `Promise<string \| null>` |
| `setObject(key, object)` | Store an object as JSON | `Promise<void>` |
| `getObject<T>(key)` | Get an object from JSON | `Promise<T \| null>` |
| `removeItem(key)` | Remove an item | `Promise<void>` |
| `clear()` | Remove all items | `Promise<void>` |
| `multiGet(keys)` | Get multiple items at once | `Promise<Record<string, string \| null>>` |
| `multiSet(items)` | Set multiple items at once | `Promise<void>` |

### Sync Methods

| Method | Description | Return |
|--------|-------------|---------|
| `setItemSync(key, value)` | Store a string value | `void` |
| `getItemSync(key)` | Get a string value | `string \| null` |
| `setObjectSync(key, object)` | Store an object as JSON | `void` |
| `getObjectSync<T>(key)` | Get an object from JSON | `T \| null` |
| `removeItemSync(key)` | Remove an item | `void` |
| `clearSync()` | Remove all items | `void` |

## Performance Results

### Async Methods - Real Device Testing:

| Platform | Operations | expo-native-storage | AsyncStorage | Improvement |
|----------|------------|-------------------|--------------|-------------|
| **Android Phone** | 100 ops | 11ms | 165ms | **15x faster** |
| | 200 ops | ~25ms | ~290ms | **11x faster** |
| | 500 ops | ~50ms | ~650ms | **13x faster** |
| | 1000 ops | ~95ms | ~1216ms | **13x faster** |
| **Android Emulator** | 100 ops | 12ms | 219ms | **18x faster** |
| **iOS Phone** | 100 ops | 72ms | 72ms | Same speed |
| **Bundle Size** | - | 19.6KB | 381KB | **19x smaller** |

### Sync Methods - Real Device Testing:

| Platform | Operations | Sync Methods | Async Methods | Improvement |
|----------|------------|--------------|---------------|-------------|
| **Android Phone** | 1000 ops | 98ms | 472ms | **4.8x faster** |
| **iOS Phone** | 1000 ops | 1098ms | 1499ms | **1.4x faster** |

**Note on iOS Performance:** iOS sync methods are limited by UserDefaults disk I/O (~1ms per write). For bulk operations (1000+ writes), consider using specialized libraries like [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv). Sync methods are perfect for typical use cases like app settings and user preferences.

*Tested on iPhone 17 Pro and Nothing Phone 3a with Android 15.*  
*Emulator results from MacBook Pro M4 with 16GB RAM.*

## Performance at Scale

The performance advantage of expo-native-storage **increases** with usage:

**Why?** SharedPreferences uses in-memory caching after first access, while AsyncStorage hits the SQLite database for every operation. The more operations you perform, the bigger the performance gap becomes.

**Perfect for:**
- Settings screens with many preferences
- Offline data caching with frequent reads
- State persistence with frequent updates
- User session data with multiple keys

## Migration from AsyncStorage

```typescript
// Before (AsyncStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', 'value');

// After (expo-native-storage)
import Storage from 'expo-native-storage';
await Storage.setItem('key', 'value');
```

Drop-in replacement with zero breaking changes.

## Platform Notes

- **iOS**: Uses `UserDefaults` (synchronous, limited to ~1MB per key)
- **Android**: Uses `SharedPreferences` (synchronous, good for small data)
- **Web**: Uses `localStorage` (synchronous, ~5-10MB limit)

## Requirements

- Expo SDK 50+
- Development builds (not available in Expo Go)

## Troubleshooting

### Error: Cannot find native module 'ExpoNativeStorage'

This error means the native module isn't linked. To fix:

1. **Rebuild your app** after installing:
   ```bash
   bunx expo prebuild --clean
   bunx expo run:ios  # or run:android
   ```

2. **Clear caches** if the issue persists:
   ```bash
   # clear Metro bundler cache
   bunx expo start -c
   
   # clear all caches
   rm -rf node_modules
   bun install  # or npm install
   bunx expo prebuild --clean
   ```

3. **Verify installation**:
   - Check that `expo-native-storage` is in your `package.json`
   - Make sure you're using a development build, not Expo Go
   - For iOS: Check that `ExpoNativeStorage` appears in your Podfile.lock
   - For Android: Check that the module is in your build.gradle dependencies

### Still having issues?

Open an issue on [GitHub](https://github.com/thereallo1026/expo-native-storage/issues) with:
- Your Expo SDK version
- React Native version
- Platform (iOS/Android)
- Full error message
- Whether you're using Expo Go or a development build

## License

MIT
