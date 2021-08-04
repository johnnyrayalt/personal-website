interface Item {
	value: string;
	expiry: number;
}

export class StorageUtil {

	static addItem(key: string, value: string): void {
		const item: Item = {
			value: value,
			expiry: new Date().getTime() + 86400
		}

		localStorage.setItem(key, JSON.stringify(item))
	}

	static getItem(key: string): string | null {
		const jsonStringItem: string | null = localStorage.getItem(key)

		if (!jsonStringItem) return null

		const item: Item = JSON.parse(jsonStringItem)

		if (new Date().getTime() > item.expiry) {
			localStorage.removeItem(key)
			return null
		}

		return item.value
	}

	static removeItem(key: string): void {
		localStorage.removeItem(key)
	}

	static removeExpiredItems(): void {
		const keys: string[] = Object.keys(localStorage)

		for (const key of keys) {
			if (localStorage.getItem(key) !== null) {
				const item = JSON.parse(localStorage.getItem(key) as string)
				if (new Date().getTime() > item.expiry) {
					localStorage.removeItem(key)
				}
			}
		}
	}
}