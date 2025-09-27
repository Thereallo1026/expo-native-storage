import { NativeModule, requireNativeModule } from "expo";

export type ExpoNativeStorageModuleEvents = Record<string, never>;

declare class ExpoNativeStorageModule extends NativeModule<ExpoNativeStorageModuleEvents> {
  setItem(key: string, value: string): Promise<boolean>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<boolean>;
  clear(): Promise<boolean>;
}

export default requireNativeModule<ExpoNativeStorageModule>(
  "ExpoNativeStorage"
);
