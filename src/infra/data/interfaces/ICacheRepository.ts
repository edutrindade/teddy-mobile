import { UserResponse } from '@/infra/external/interfaces/IApiUserService';
import { Result } from '@/main/helpers/result';

export default interface ICacheRepository {
  setUser(name: string): Promise<Result<void>>;
  getUser(): Promise<Result<string>>;
  setSelectedCustomers(customer: UserResponse): Promise<Result<void>>;
  getSelectedCustomers(): Promise<Result<UserResponse[]>>;
  removeSelectedCustomer(customerId: number): Promise<Result<void>>;
  clearSelectedCustomers(): Promise<Result<void>>;
}
