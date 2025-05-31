import { Dimensions, Platform } from 'react-native';

type Device = {
  aspectRatio: number;
  isPad: boolean;
  isTablet?: boolean;
  os: string;
  height: number;
  width: number;
};

const { height, width }: { height: number; width: number } = Dimensions.get('window');
const aspectRatio: number = height / width;

const device: Device = {
  os: Platform.OS,
  isPad: Platform.OS === 'ios' ? Platform.isPad : false,
  aspectRatio,
  height,
  width,
};

export default device;
