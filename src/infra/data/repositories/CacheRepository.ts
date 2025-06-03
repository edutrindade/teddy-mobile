import { createErrorApplication } from '@/main/errors/ErrorApplication';
import IAsyncStorageAdapter from '@/infra/data/interfaces/IAsyncStorageAdapter';
import { Result, createSuccessResult, createErrorResult } from '@/main/helpers/result';
import ICacheRepository from '../interfaces/ICacheRepository';

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

  return {
    setUser,
    getUser,
  };
};
