export default {
  // biome-ignore lint/suspicious/useAwait: API consistency with native modules
  async setItem(key: string, value: string): Promise<boolean> {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value);
      return true;
    }
    return false;
  },

  // biome-ignore lint/suspicious/useAwait: API consistency with native modules
  async getItem(key: string): Promise<string | null> {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },

  // biome-ignore lint/suspicious/useAwait: API consistency with native modules
  async removeItem(key: string): Promise<boolean> {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  },

  // biome-ignore lint/suspicious/useAwait: API consistency with native modules
  async clear(): Promise<boolean> {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
      return true;
    }
    return false;
  },
};
