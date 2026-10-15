import {Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';
import {scale} from 'react-native-size-matters';
import COLORS from './colors';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

export const showSuccess = message => {
  Toast.show({
    swipeable: true,
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'top',
    visibilityTime: 3500,
    autoHide: true,
    text1Style: {
      fontSize: scale(14),
      color: COLORS.darkGray,
    },
    text2Style: {
      fontSize: scale(10),
      color: COLORS.black,
    },
  });
};

export const showError = message => {
  Toast.show({
    swipeable: true,
    type: 'error',
    text1: 'Error',
    text2: message,
    position: 'top',
    visibilityTime: 3500,
    autoHide: true,
    text1Style: {
      fontSize: scale(14),
      color: COLORS.darkGray,
    },
    text2Style: {
      fontSize: scale(12),
      color: COLORS.error,
    },
  });
};

export const FONTS = {
  black: 'WinkyRough-Black',
  blackItalic: 'WinkyRough-BlackItalic',
  bold: 'WinkyRough-Bold',
  boldItalic: 'WinkyRough-BoldItalic',
  extraBold: 'WinkyRough-ExtraBold',
  extraBoldItalic: 'WinkyRough-ExtraBoldItalic',
  italic: 'WinkyRough-Italic',
  light: 'WinkyRough-Light',
  lightItalic: 'WinkyRough-LightItalic',
  medium: 'WinkyRough-Medium',
  mediumItalic: 'WinkyRough-MediumItalic',
  regular: 'WinkyRough-Regular',
  semiBold: 'WinkyRough-SemiBold',
  semiBoldItalic: 'WinkyRough-SemiBoldItalic',
};
