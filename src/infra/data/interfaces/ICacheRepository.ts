import { Result } from '@/main/helpers/result';

export default interface ICacheRepository {
  setUser(name: string): Promise<Result<void>>;
  getUser(): Promise<Result<string>>;
}
