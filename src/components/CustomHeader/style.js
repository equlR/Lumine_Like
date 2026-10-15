import {StyleSheet} from 'react-native';
import {width} from '../../utils/helper';
import COLORS from '../../utils/colors';
import {scale} from 'react-native-size-matters';
export const useStyle = () => {
  return StyleSheet.create({
    HeaderMain: {
      width: width,
      height: width * 0.15,
      backgroundColor: COLORS.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
    },
    MainLogo: {
      width: width * 0.1,
      height: width * 0.1,
      resizeMode: 'contain',
      tintColor: COLORS.white,
    },
    ProfileLogo: {
      width: width * 0.1,
      height: width * 0.1,
      resizeMode: 'contain',
      tintColor: COLORS.white,
    },
    LumineText: {
      fontSize: scale(24),
      color: COLORS.white,
    },
  });
};
