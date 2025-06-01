import { KeyboardAvoidingView, Platform } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';

import styles from './styles';
import { layout } from '@/presentation/styles/layout';
import { Input } from '@/presentation/components/Input';
import { useState } from 'react';
import { Button } from '@/presentation/components/Button';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}
    >
      <Text style={{ fontSize: layout.fontSize.title }}>Olá, seja bem-vindo!</Text>

      <Input onChangeText={setName} value={name} placeholder="Digite seu nome" />

      <Button title="Entrar" onPress={() => navigation.navigate('Customers')} disabled={!name} />
    </KeyboardAvoidingView>
  );
}
