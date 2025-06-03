import {
  IApiService,
  UserPayload,
  UserResponse,
  PaginatedUsersResponse,
} from '@/infra/external/interfaces/IApiService';
import { createErrorApplication } from '@/main/errors/ErrorApplication';
import { createErrorResult, createSuccessResult } from '@/main/helpers/result';
import { API_URL_DEV } from '@env';

const BASE_URL = API_URL_DEV;

export const apiService: IApiService = {
  async createUser(payload: UserPayload) {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) return createSuccessResult(undefined);

      const text = await res.text();
      return createErrorResult(
        createErrorApplication('ApiService', `CREATE_USER_FAILED: ${text}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_CREATE_USER', 500)
      );
    }
  },

  async getUsers(page = 1, limit = 10) {
    try {
      const res = await fetch(`${BASE_URL}/users?page=${page}&limit=${limit}`);

      if (!res.ok) {
        const text = await res.text();
        return createErrorResult(
          createErrorApplication('ApiService', `GET_USERS_FAILED: ${text}`, res.status)
        );
      }

      const data: PaginatedUsersResponse = await res.json();
      return createSuccessResult(data);
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_GET_USERS', 500)
      );
    }
  },

  async getUserById(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`);

      if (!res.ok) {
        const text = await res.text();
        return createErrorResult(
          createErrorApplication('ApiService', `GET_USER_BY_ID_FAILED: ${text}`, res.status)
        );
      }

      const data: UserResponse = await res.json();
      return createSuccessResult(data);
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_GET_USER_BY_ID', 500)
      );
    }
  },

  async updateUser(id: number, payload: UserPayload) {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) return createSuccessResult(undefined);

      const text = await res.text();
      return createErrorResult(
        createErrorApplication('ApiService', `UPDATE_USER_FAILED: ${text}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_UPDATE_USER', 500)
      );
    }
  },

  async deleteUser(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, { method: 'DELETE' });

      if (res.ok) return createSuccessResult(undefined);

      const text = await res.text();
      return createErrorResult(
        createErrorApplication('ApiService', `DELETE_USER_FAILED: ${text}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_DELETE_USER', 500)
      );
    }
  },
};
