import { PixelRatio, Dimensions, Platform } from 'react-native';
import deviceInfo from './deviceInfo';

const { width, height } = Dimensions.get('screen');

const scale: number = width / 320;

export function getSize(size: number): number {
  const newSize: number = size * scale;

  if (Platform.OS === 'ios') {
    if (deviceInfo.isPad) {
      const ipadSize = size * (width / 620);
      return Math.round(PixelRatio.roundToNearestPixel(ipadSize));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function getSizeString(size: string): string {
  const resizedSize: number = getSize(parseFloat(size.split('px')[0]));

  if (size[size.length - 1] === '%') {
    return size;
  } else {
    return `${resizedSize}px`;
  }
}

export const layout: TLayout = {
  borderRadius: 4,
  screenWidth: width,
  screenHeight: height,

  buttonBorderRadius: 24,
  elevation: {
    none: 0,
    default: 4,
    medium: 8,
    high: 16,
    small: 2,
  },
  fontSize: {
    small: getSize(10),
    normal: getSize(12),
    regular: getSize(14),
    intermedium: getSize(16),
    large: getSize(18),
    extraLarge: getSize(20),
    title: getSize(28),
  },
  fontFamily: {
    bold: 'Inter_700Bold',
    regular: 'Inter_400Regular',
  },
  iconSize: {
    large: getSize(28),
    medium: getSize(16),
    small: getSize(8),
  },
  spacing: {
    small: getSize(6),
    normal: getSize(12),
    regular: getSize(14),
    intermedium: getSize(16),
    large: getSize(18),
  },
};
