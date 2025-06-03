import { Result } from '@/main/helpers/result';

export interface UserPayload {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface UserResponse extends UserPayload {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsersResponse {
  clients: UserResponse[];
  totalPages: number;
  currentPage: number;
}

export interface IApiService {
  createUser(payload: UserPayload): Promise<Result<void>>;
  getUsers(page?: number, limit?: number): Promise<Result<PaginatedUsersResponse>>;
  getUserById(id: number): Promise<Result<UserResponse>>;
  updateUser(id: number, payload: UserPayload): Promise<Result<void>>;
  deleteUser(id: number): Promise<Result<void>>;
}
