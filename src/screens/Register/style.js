import {StyleSheet} from 'react-native';
import COLORS from '../../utils/colors';
import {height, width} from '../../utils/helper';
import {scale} from 'react-native-size-matters';

export const useStyle = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#DCFFFF',
      paddingHorizontal: width * 0.05,
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
    },
    backIcon: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1,
    },
    backArrow: {
      width: width * 0.06,
      height: width * 0.06,
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
    registerImage: {
      height: height * 0.4,
      resizeMode: 'contain',
    },
    mainView: {
      height: height * 0.6,
      width: '100%',
    },
    RegisterText: {
      fontSize: scale(24),
      color: COLORS.primary,
      textAlign: 'left',
    },
    InputContainer: {
      gap: width * 0.05,
      marginVertical: width * 0.05,
    },
    RightIcon: {
      width: width * 0.05,
      height: width * 0.05,
      tintColor: COLORS.primary,
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    forgotpassword: {
      color: COLORS.primary,
      fontSize: scale(14),
      fontWeight: '600',
      textAlign: 'right',
    },
    LastRow: {
      marginVertical: width * 0.05,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    noAccountText: {
      fontSize: scale(14),
      color: COLORS.black,
    },
    Login: {
      color: COLORS.primary,
      fontSize: scale(14),
      fontWeight: '600',
    },
  });
};
