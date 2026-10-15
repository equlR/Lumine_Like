import {StyleSheet} from 'react-native';
import {height, width} from '../../utils/helper';
import {scale} from 'react-native-size-matters';
import COLORS from '../../utils/colors';

export const useStyle = () => {
  return StyleSheet.create({
    btnContainer: {
      width: '100%',
      paddingVertical: width * 0.03,
      alignSelf: 'center',
      borderRadius: 10,
      elevation: 1,
    },
    btnText: {
      fontSize: scale(14),
      fontWeight: '400',
      textAlign: 'center',
      flexDirection: 'row',
    },
    prefixLogo: {
      width: width * 0.05,
      height: width * 0.05,
      resizeMode: 'contain',
    },
    postfixLogo: {
      tintColor: COLORS.white,
      width: width * 0.045,
      height: width * 0.045,
      resizeMode: 'contain',
    },
    ButtonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: width * 0.015,
    },
  });
};
