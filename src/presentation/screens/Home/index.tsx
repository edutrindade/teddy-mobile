import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';

import styles from './styles';
import { layout } from '@/presentation/styles/layout';
import { Input } from '@/presentation/components/Input';
import { Button } from '@/presentation/components/Button';
import { useNavigation } from '@react-navigation/native';
import { CacheRepository } from '@/infra/data/repositories/CacheRepository';
import { asyncStorageAdapter } from '@/infra/data/adapters/AsyncStorageAdapter';

export default function HomeScreen() {
  const cacheRepository = CacheRepository(asyncStorageAdapter);
  const navigation = useNavigation();
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const result = await cacheRepository.getUser();
      if (result.success) setName(result.response || '');
    };
    fetchUser();
  }, []);

  const handleNext = async () => {
    if (name) {
      await cacheRepository.setUser(name);
      navigation.navigate('Customers');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}
    >
      <Text style={{ fontSize: layout.fontSize.title }}>Olá, seja bem-vindo!</Text>

      <Input onChangeText={setName} value={name} placeholder="Digite seu nome" />

      <Button title="Entrar" onPress={handleNext} disabled={!name} />
    </KeyboardAvoidingView>
  );
}
