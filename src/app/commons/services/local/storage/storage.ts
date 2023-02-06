export abstract class StorageService implements Storage {
	get length(): number {
		return this.api.length;
	}

	constructor(protected readonly api: Storage) {}

	setItem(key: string, value: unknown): void {
		this.api.setItem(key, JSON.stringify(value));
	}

	getItem<T>(key: string): T | null;
	getItem<T>(key: string, otherwise: T): T;
	getItem<T>(key: string, otherwise?: T): T | null {
		const data: string | null = this.api.getItem(key);

		if (data !== null) {
			return JSON.parse(data) as T;
		}

		if (otherwise) {
			return otherwise;
		}

		return null;
	}

	removeItem(key: string): void {
		this.api.removeItem(key);
	}

	clear(): void {
		this.api.clear();
	}

	key(index: number): string | null {
		return this.api.key(index);
	}
}
