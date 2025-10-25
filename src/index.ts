import ExpoNativeStorageModule from "./ExpoNativeStorageModule";

export class NativeStorage {
  // async
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

  // sync
  setItemSync(key: string, value: string): void {
    ExpoNativeStorageModule.setItemSync(key, value);
  }

  getItemSync(key: string): string | null {
    return ExpoNativeStorageModule.getItemSync(key);
  }

  removeItemSync(key: string): void {
    ExpoNativeStorageModule.removeItemSync(key);
  }

  clearSync(): void {
    ExpoNativeStorageModule.clearSync();
  }

  setObjectSync<T extends Record<string, unknown>>(
    key: string,
    value: T
  ): void {
    this.setItemSync(key, JSON.stringify(value));
  }

  getObjectSync<T extends Record<string, unknown> = Record<string, unknown>>(
    key: string
  ): T | null {
    const value = this.getItemSync(key);
    if (value === null) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  async multiGet(keys: string[]): Promise<Record<string, string | null>> {
    const result: Record<string, string | null> = {};
    await Promise.all(
      keys.map(async (key) => {
        result[key] = await this.getItem(key);
      })
    );
    return result;
  }

  async multiSet(items: Record<string, string>): Promise<void> {
    await Promise.all(
      Object.entries(items).map(([key, value]) => this.setItem(key, value))
    );
  }
}

const Storage = new NativeStorage();
export default Storage;
