declare module '*.png';
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.json';

declare module '@env' {
  export const API_URL_DEV: string;
}

type Nullable<T> = T | null;

type TResponse<T> = {
  result?: T;
  error?: TResponseError;
};

type TResponseError = {
  id: number;
  msg: string;
};

type TColors = {
  primary: string;
  white: string;
  light: string;
  light200: string;
  light300: string;
  grey: string;
  grey200: string;
  black: string;
  black100: string;
  error: string;
  red: string;
  blue: string;
  transparent: string;
  background;
};

type TLayout = {
  borderRadius: number;
  buttonBorderRadius: number;
  screenWidth: number;
  screenHeight: number;
  headerHeight: number;

  elevation: {
    default: number;
    high: number;
    medium: number;
    none: number;
    small: number;
  };
  fontSize: {
    large: number;
    extraLarge: number;
    normal: number;
    regular: number;
    small: number;
    intermedium: number;
    title: number;
  };
  fontFamily: {
    bold: string;
    regular: string;
  };
  iconSize: {
    large: number;
    medium: number;
    small: number;
  };
  spacing: {
    small: number;
    normal: number;
    regular: number;
    intermedium: number;
    large: number;
  };
};
