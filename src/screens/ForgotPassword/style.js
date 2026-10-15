import {StyleSheet} from 'react-native';
import COLORS from '../../utils/colors';
import {height, width} from '../../utils/helper';
import {scale} from 'react-native-size-matters';
export const useStyle = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: width * 0.05,
      backgroundColor: '#DCFFFF',
    },
    contentContainer: {
      flexGrow: 1,
    },
    backIcon: {
      position: 'absolute',
      zIndex: 1,
      top: 10,
    },
    backArrow: {
      width: width * 0.065,
      height: width * 0.065,
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
    forgotImage: {
      width: '100%',
      height: height * 0.45,
      resizeMode: 'contain',
    },
    InputContainer: {
      marginTop: width * 0.035,
      width: '100%',
      gap: width * 0.05,
    },
    forgotText: {
      fontSize: scale(24),
      color: COLORS.primary,
      textAlign: 'left',
    },
    LastRow: {
      justifyContent: 'center',
      marginTop: width * 0.035,
      flexDirection: 'row',
    },
    goback: {
      fontSize: scale(14),
    },
    login: {
      fontSize: scale(14),
      color: COLORS.primary,
    },
  });
};
