import {StyleSheet} from 'react-native';
import COLORS from '../../utils/colors';
import {FONTS, height, width} from '../../utils/helper';
import {scale} from 'react-native-size-matters';

export const useStyle = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: COLORS.boneWhite,
      paddingHorizontal: width * 0.05,
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
    },
    imageView: {
      height: height * 0.4,
    },
    loginImage: {
      height: height * 0.4,
      resizeMode: 'contain',
    },
    mainView: {
      height: height * 0.6,
      width: '100%',
    },
    LoginText: {
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
    ForgotPassword: {
      alignSelf: 'flex-end',
      color: COLORS.primary,
      fontSize: scale(14),
      fontFamily: FONTS.medium,
    },
    ForgotPasswordContainer: {
      alignItems: 'flex-end',
      marginBottom: width * 0.035,
    },
    ForgotPasswordText: {
      fontSize: scale(14),
      color: COLORS.primary,
    },
    LastRow: {
      marginVertical: width * 0.05,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    noAccountText: {
      fontSize: scale(14),
      color: COLORS.black,
      fontFamily: FONTS.regular,
    },
    Register: {
      color: COLORS.primary,
      fontSize: scale(14),
      fontWeight: '600',
    },
  });
};
