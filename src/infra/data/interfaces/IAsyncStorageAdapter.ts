export default interface IAsyncStorageAdapter {
  get<T>(key: string): Promise<Nullable<T>>;
  set<T>(key: string, data: T, ttlInSeconds?: number): Promise<void>;
  remove(key: string): Promise<void>;
}
