import {StyleSheet} from 'react-native';
import {width} from '../../utils/helper';
import {scale} from 'react-native-size-matters';
import COLORS from '../../utils/colors';

export const useStyle = () => {
  return StyleSheet.create({
    inputContainer: {
      width: '100%',
    },
    inputField: {
      fontSize: scale(14),
      backgroundColor: COLORS.white,
      height: width * 0.105,
    },
    errorText: {
      color: COLORS.error,
      fontSize: scale(12),
      marginTop: width * 0.01,
      marginLeft: width * 0.02,
    },
    EyeIcon: {
      height: width * 0.05,
      width: width * 0.05,
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
    PrefixIcon: {
      height: width * 0.05,
      width: width * 0.05,
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
    clearButton: {
      padding: width * 0.02,
      marginRight: width * 0.02,
    },
    closeIcon: {
      width: width * 0.04,
      height: width * 0.04,
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
  });
};
