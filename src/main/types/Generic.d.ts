declare module '*.png';
declare module '*.svg' {
  const content: string;
  export default content;
}

type TColors = {
  primary: string;
  white: string;
  light: string;
  light200: string;
  light300: string;
  grey: string;
  black: string;
  black100: string;
  error: string;
  transparent: string;
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
