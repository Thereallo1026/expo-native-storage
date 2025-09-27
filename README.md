# expo-native-storage

[![npm version](https://badge.fury.io/js/expo-native-storage.svg)](https://badge.fury.io/js/expo-native-storage)
[![npm downloads](https://img.shields.io/npm/dm/expo-native-storage.svg)](https://npmjs.org/package/expo-native-storage)

Lightning-fast native storage for Expo.

## Why?

- **Fast**: Direct native storage, no bridge delays
- **Tiny**: 35x smaller bundle size compared to AsyncStorage (381 vs ~6KB)
- **Synchronous option**: Near instant API calls
- **Web support**: Falls back to localStorage
- **Native**: Uses UserDefaults & SharedPreferences

## Installation

```bash
# bun
bunx expo install expo-native-storage
# npm
npx expo install expo-native-storage
```

## Usage

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

## Example: Theme Storage

```typescript
// Save theme preference
await Storage.setItem('theme', 'dark');

// Load on app start
const theme = await Storage.getItem('theme') || 'light';
```

## API

| Method | Description | Return |
|--------|-------------|---------|
| `setItem(key, value)` | Store a string value | `Promise<void>` |
| `getItem(key)` | Get a string value | `Promise<string \| null>` |
| `setObject(key, object)` | Store an object as JSON | `Promise<void>` |
| `getObject<T>(key)` | Get an object from JSON | `Promise<T \| null>` |
| `removeItem(key)` | Remove an item | `Promise<void>` |
| `clear()` | Remove all items | `Promise<void>` |

## Migration from AsyncStorage

```typescript
// Before (AsyncStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', 'value');

// After (expo-native-storage)
import Storage from 'expo-native-storage';
await Storage.setItem('key', 'value');
```

## Performance Results

### Real Device Testing (100 operations):

| Platform | expo-native-storage | AsyncStorage | Improvements |
|----------|---------------------|--------------|-------------|
| Android Phone | 53ms | 265ms | **5x faster** |
| Android Emulator | 176ms | 323ms | **1.8x faster** |
| iOS Phone | 72ms | 72ms | Same speed |
| Bundle Size | 5.71KB | ~200KB | **35x smaller** |

All emulators are running on a MacBook Pro M4 with 16GB RAM.

Tested on iPhone 17 Pro and Nothing Phone 3a with Android 15.

## Platform Notes

- **iOS**: Uses `UserDefaults` (synchronous, limited to ~1MB per key)
- **Android**: Uses `SharedPreferences` (synchronous, good for small data)
- **Web**: Uses `localStorage` (synchronous, ~5-10MB limit)

## License

MIT