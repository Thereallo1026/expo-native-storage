export default {
	async setItem(key: string, value: string): Promise<void> {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem(key, value);
		}
	},

	async getItem(key: string): Promise<string | null> {
		if (typeof localStorage !== "undefined") {
			return localStorage.getItem(key);
		}
		return null;
	},

	async removeItem(key: string): Promise<void> {
		if (typeof localStorage !== "undefined") {
			localStorage.removeItem(key);
		}
	},

	async clear(): Promise<void> {
		if (typeof localStorage !== "undefined") {
			localStorage.clear();
		}
	},

	setItemSync(key: string, value: string): void {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem(key, value);
		}
	},

	getItemSync(key: string): string | null {
		if (typeof localStorage !== "undefined") {
			return localStorage.getItem(key);
		}
		return null;
	},

	removeItemSync(key: string): void {
		if (typeof localStorage !== "undefined") {
			localStorage.removeItem(key);
		}
	},

	clearSync(): void {
		if (typeof localStorage !== "undefined") {
			localStorage.clear();
		}
	},
};
