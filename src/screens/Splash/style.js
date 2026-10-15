import {StyleSheet} from 'react-native';
import {FONTS, width} from '../../utils/helper';
import COLORS from '../../utils/colors';
export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: COLORS.primary,
    },
    logo: {
      tintColor: COLORS.boneWhite,
      width: width * 0.35,
      height: width * 0.35,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    text: {
      fontSize: 32,
      fontFamily: FONTS.bold,
      color: COLORS.boneWhite,
      letterSpacing: 4,
    },
  });
};
