import ExpoNativeStorageModule from "./ExpoNativeStorageModule";

export class NativeStorage {
  async setItem(key: string, value: string): Promise<void> {
    await ExpoNativeStorageModule.setItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return await ExpoNativeStorageModule.getItem(key);
  }

  async removeItem(key: string): Promise<void> {
    await ExpoNativeStorageModule.removeItem(key);
  }

  async clear(): Promise<void> {
    await ExpoNativeStorageModule.clear();
  }

  // methods for objects w/ proper typing
  async setObject<T extends Record<string, unknown>>(
    key: string,
    value: T
  ): Promise<void> {
    await this.setItem(key, JSON.stringify(value));
  }

  async getObject<T extends Record<string, unknown> = Record<string, unknown>>(
    key: string
  ): Promise<T | null> {
    const value = await this.getItem(key);
    if (value === null) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
}

const Storage = new NativeStorage();
export default Storage;
