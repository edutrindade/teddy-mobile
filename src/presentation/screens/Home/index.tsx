import { View } from 'react-native';
import { CommonText as Text } from '@/presentation/components/CommonText';

import styles from './styles';
import { layout } from '@/presentation/styles/layout';
import { Input } from '@/presentation/components/Input';
import { useState } from 'react';
import Button from '@/presentation/components/Button';

export default function HomeScreen() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: layout.fontSize.title }}>Olá, seja bem-vindo!</Text>

      <Input onChangeText={setName} value={name} placeholder="Digite seu nome" />

      <Button title="Entrar" onPress={() => alert(`Olá, ${name}!`)} />
    </View>
  );
}
