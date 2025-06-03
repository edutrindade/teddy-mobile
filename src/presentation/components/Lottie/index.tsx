import { useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './styles';

interface LottieProps {
  source: any;
  width?: number;
  height?: number;
  loop?: boolean;
}

export const Lottie = ({ source, width = 200, height = 200, loop = true }: LottieProps) => {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop={loop}
        ref={animation}
        style={{
          width: width,
          height: height,
        }}
        source={source}
      />
    </View>
  );
};
