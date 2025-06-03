import { render, waitFor, act, fireEvent } from '@testing-library/react-native';
import { Platform, KeyboardAvoidingView } from 'react-native';

import HomeScreen from '../index';

const mockSetUser = jest.fn();
const mockGetUser = jest.fn(() => Promise.resolve({ success: true, response: 'Eduardo' }));
const mockNavigate = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@/infra/data/repositories/CacheRepository', () => {
  return {
    CacheRepository: () => ({
      getUser: mockGetUser,
      setUser: mockSetUser,
    }),
  };
});

describe('HomeScreen', () => {
  it('deve renderizar o componente corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<HomeScreen />);

    expect(getByText('Olá, seja bem-vindo!')).toBeTruthy();
    expect(getByPlaceholderText('Digite seu nome')).toBeTruthy();
  });

  it('deve buscar o nome do usuário ao montar', async () => {
    const { getByPlaceholderText } = render(<HomeScreen />);

    const input = getByPlaceholderText('Digite seu nome');

    await waitFor(() => {
      expect(input.props.value).toBe('Eduardo');
      expect(mockGetUser).toHaveBeenCalled();
    });
  });

  it('deve manter o input vazio se não houver nome salvo', async () => {
    mockGetUser.mockReturnValueOnce(Promise.resolve({ success: true, response: '' }));

    const { getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Digite seu nome');
    await waitFor(() => {
      expect(input.props.value).toBe('');
      expect(mockGetUser).toHaveBeenCalled();
    });
  });

  it('não deve alterar o nome se getUser retornar success: false', async () => {
    mockGetUser.mockReturnValueOnce(Promise.resolve({ success: false, response: '' }));

    const { getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Digite seu nome');

    await waitFor(() => {
      expect(input.props.value).toBe('');
      expect(mockGetUser).toHaveBeenCalled();
    });
  });

  it('deve salvar o nome do usuário ao pressionar "Entrar"', async () => {
    const { getByText, getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Digite seu nome');
    const button = getByText('Entrar');

    fireEvent.changeText(input, 'Eduardo');
    fireEvent.press(button);

    await waitFor(async () => {
      expect(
        await require('@/infra/data/repositories/CacheRepository').CacheRepository().setUser
      ).toHaveBeenCalledWith('Eduardo');
    });
  });

  it('deve navegar para a tela de Clientes ao pressionar o botão "Entrar"', async () => {
    const { getByText, getByPlaceholderText } = render(<HomeScreen />);
    const button = getByText('Entrar');
    const input = getByPlaceholderText('Digite seu nome');

    expect(button).toBeTruthy();
    expect(input).toBeTruthy();

    act(() => {
      fireEvent.changeText(input, 'Eduardo');
      fireEvent.press(button);
      expect(mockNavigate).toHaveBeenCalledWith('Customers');
    });
  });

  it('deve desabilitar o botão "Entrar" quando o nome estiver vazio', () => {
    const { getByText, getByPlaceholderText } = render(<HomeScreen />);
    const button = getByText('Entrar');
    const input = getByPlaceholderText('Digite seu nome');

    expect(button).toBeDisabled();

    fireEvent.changeText(input, 'Eduardo');

    expect(button).not.toBeDisabled();
  });
});

describe('HomeScreen - Platform behavior', () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    Platform.OS = originalPlatform;
  });

  it('usa behavior "height" quando plataforma é Android', () => {
    Platform.OS = 'android';
    const { UNSAFE_getByType } = render(<HomeScreen />);
    const keyboardView = UNSAFE_getByType(KeyboardAvoidingView);
    expect(keyboardView.props.behavior).toBe('height');
  });

  it('usa behavior "padding" quando plataforma não é Android', () => {
    Platform.OS = 'ios';
    const { UNSAFE_getByType } = render(<HomeScreen />);
    const keyboardView = UNSAFE_getByType(KeyboardAvoidingView);
    expect(keyboardView.props.behavior).toBe('padding');
  });
});
