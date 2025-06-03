import { createErrorApplication } from '@/main/errors/ErrorApplication';
import IAsyncStorageAdapter from '@/infra/data/interfaces/IAsyncStorageAdapter';
import { Result, createSuccessResult, createErrorResult } from '@/main/helpers/result';
import ICacheRepository from '../interfaces/ICacheRepository';
import { UserResponse } from '@/infra/external/interfaces/IApiUserService';

export const CacheRepository = (asyncStorage: IAsyncStorageAdapter): ICacheRepository => {
  const setUser = async (name: string): Promise<Result<void>> => {
    try {
      await asyncStorage.set<string>('teddy@user', name, 60 * 60 * 24); // Como exemplo, armazendo o usuário por 24 horas
      return createSuccessResult(undefined);
    } catch (error) {
      return createErrorResult(
        createErrorApplication(
          'Infra > Data > Repositories > Cache > CacheRepository',
          'ERROR_IN_SETTING_USER_DATA',
          500
        )
      );
    }
  };

  const getUser = async (): Promise<Result<string>> => {
    try {
      const user = await asyncStorage.get<string>('teddy@user');

      if (!user) {
        return createErrorResult(
          createErrorApplication(
            'Infra > Data > Repositories > Cache > CacheRepository',
            'USER_NOT_FOUND_IN_STORAGE',
            404
          )
        );
      }

      return createSuccessResult(user);
    } catch (error) {
      return createErrorResult(
        createErrorApplication(
          'Infra > Data > Repositories > Cache > CacheRepository',
          'ERROR_IN_GETTING_USER_DATA',
          500
        )
      );
    }
  };

  const setSelectedCustomers = async (customer: UserResponse): Promise<Result<void>> => {
    try {
      const existingCustomers = (await getSelectedCustomers()).response || [];
      const customerExists = existingCustomers.some(c => c.id === customer.id);
      if (customerExists) {
        return createErrorResult(
          createErrorApplication(
            'Infra > Data > Repositories > Cache > CacheRepository',
            'CUSTOMER_ALREADY_SELECTED',
            400
          )
        );
      }
      existingCustomers.push(customer);
      await asyncStorage.set<UserResponse[]>('teddy@selectedCustomers', existingCustomers);
      return createSuccessResult(undefined);
    } catch (error) {
      return createErrorResult(
        createErrorApplication(
          'Infra > Data > Repositories > Cache > CacheRepository',
          'ERROR_IN_SETTING_SELECTED_CUSTOMERS',
          500
        )
      );
    }
  };

  const getSelectedCustomers = async (): Promise<Result<UserResponse[]>> => {
    try {
      const customers = await asyncStorage.get<UserResponse[]>('teddy@selectedCustomers');

      if (!customers) {
        return createErrorResult(
          createErrorApplication(
            'Infra > Data > Repositories > Cache > CacheRepository',
            'SELECTED_CUSTOMERS_NOT_FOUND_IN_STORAGE',
            404
          )
        );
      }

      return createSuccessResult(customers);
    } catch (error) {
      return createErrorResult(
        createErrorApplication(
          'Infra > Data > Repositories > Cache > CacheRepository',
          'ERROR_IN_GETTING_SELECTED_CUSTOMERS',
          500
        )
      );
    }
  };

  const removeSelectedCustomer = async (customerId: number): Promise<Result<void>> => {
    try {
      const existingCustomers = (await getSelectedCustomers()).response || [];
      const updatedCustomers = existingCustomers.filter(c => c.id !== customerId);
      await asyncStorage.set<UserResponse[]>('teddy@selectedCustomers', updatedCustomers);
      return createSuccessResult(undefined);
    } catch (error) {
      return createErrorResult(
        createErrorApplication(
          'Infra > Data > Repositories > Cache > CacheRepository',
          'ERROR_IN_REMOVING_SELECTED_CUSTOMER',
          500
        )
      );
    }
  };

  const clearSelectedCustomers = async (): Promise<Result<void>> => {
    try {
      await asyncStorage.remove('teddy@selectedCustomers');
      return createSuccessResult(undefined);
    } catch (error) {
      return createErrorResult(
        createErrorApplication(
          'Infra > Data > Repositories > Cache > CacheRepository',
          'ERROR_IN_CLEARING_SELECTED_CUSTOMERS',
          500
        )
      );
    }
  };

  return {
    setUser,
    getUser,
    setSelectedCustomers,
    getSelectedCustomers,
    removeSelectedCustomer,
    clearSelectedCustomers,
  };
};
