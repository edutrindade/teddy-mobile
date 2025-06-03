import AsyncStorage from '@react-native-async-storage/async-storage';
import IAsyncStorageAdapter from '@/infra/data/interfaces/IAsyncStorageAdapter';

type CacheItem<T> = {
  data: T;
  expiresAt?: Date | string;
};

export const asyncStorageAdapter: IAsyncStorageAdapter = {
  async get<T>(key: string): Promise<Nullable<T>> {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    try {
      const parsedItem: CacheItem<T> = JSON.parse(item);

      if (parsedItem.expiresAt && new Date(parsedItem.expiresAt) < new Date()) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return parsedItem.data;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, data: T, ttlInSeconds?: number): Promise<void> {
    const expiresAt = ttlInSeconds
      ? new Date(Date.now() + ttlInSeconds * 1000).toISOString()
      : undefined;

    const item: CacheItem<T> = {
      data,
      expiresAt,
    };

    await AsyncStorage.setItem(key, JSON.stringify(item));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
};
