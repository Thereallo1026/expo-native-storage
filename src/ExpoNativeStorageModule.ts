import { requireNativeModule } from "expo-modules-core";

export type ExpoNativeStorageModule = {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;

  setItemSync(key: string, value: string): void;
  getItemSync(key: string): string | null;
  removeItemSync(key: string): void;
  clearSync(): void;
};

export default requireNativeModule<ExpoNativeStorageModule>(
  "ExpoNativeStorage"
);
