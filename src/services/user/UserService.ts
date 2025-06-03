import axios from '@/infra/external/services/axiosInstance';
import {
  IApiUserService,
  UserPayload,
  UserResponse,
  PaginatedUsersResponse,
} from '@/infra/external/interfaces/IApiUserService';
import { createErrorApplication } from '@/main/errors/ErrorApplication';
import { createErrorResult, createSuccessResult } from '@/main/helpers/result';

export const userService: IApiUserService = {
  async createUser(payload: UserPayload) {
    try {
      const res = await axios.post('/users', payload);

      if (res.status === 201) return createSuccessResult(undefined);

      return createErrorResult(
        createErrorApplication('ApiService', `CREATE_USER_FAILED: ${res.data}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_CREATE_USER', 500)
      );
    }
  },

  async getUsers(page = 1, limit = 10) {
    try {
      const res = await axios.get(`/users?page=${page}&limit=${limit}`);

      if (res.status === 200) {
        const data: PaginatedUsersResponse = res.data;
        return createSuccessResult(data);
      }

      return createErrorResult(
        createErrorApplication('ApiService', `GET_USERS_FAILED: ${res.data}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_GET_USERS', 500)
      );
    }
  },

  async getUserById(id: number) {
    try {
      const res = await axios.get(`/users/${id}`);
      if (res.status === 200) {
        const data: UserResponse = res.data;
        return createSuccessResult(data);
      }

      return createErrorResult(
        createErrorApplication('ApiService', `GET_USER_BY_ID_FAILED: ${res.data}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_GET_USER_BY_ID', 500)
      );
    }
  },

  async updateUser(id: number, payload: UserPayload) {
    try {
      const res = await axios.patch(`/users/${id}`, payload);

      if (res.status >= 200 && res.status < 300) return createSuccessResult(undefined);

      return createErrorResult(
        createErrorApplication('ApiService', `UPDATE_USER_FAILED: ${res.data}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_UPDATE_USER', 500)
      );
    }
  },

  async deleteUser(id: number) {
    try {
      const res = await axios.delete(`/users/${id}`);

      if (res.status === 200) return createSuccessResult(undefined);

      return createErrorResult(
        createErrorApplication('ApiService', `DELETE_USER_FAILED: ${res.data}`, res.status)
      );
    } catch (e) {
      return createErrorResult(
        createErrorApplication('ApiService', 'UNEXPECTED_ERROR_DELETE_USER', 500)
      );
    }
  },
};
