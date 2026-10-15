import {StyleSheet} from 'react-native';
import {width} from '../../utils/helper';
import COLORS from '../../utils/colors';
import {scale} from 'react-native-size-matters';
export const useStyle = () => {
  return StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: '#E6FFFF',
      paddingHorizontal: width * 0.03,
      paddingVertical: width * 0.03,
    },
    container: {
      flex: 1,
      width: width,
      alignItems: 'center',
      gap: 40,
    },
    BtnView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    SkipText: {
      color: COLORS.primary,
      fontSize: scale(14),
    },
    NextBtnView: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 10,
    },
    NextBtnText: {
      color: COLORS.primary,
      fontSize: scale(14),
    },
    OnboardingImages: {
      width: width,
      height: width * 1.25,
      resizeMode: 'contain',
    },
    GetStartedBtn: {
      backgroundColor: COLORS.primary,
      width: width * 0.45,
      alignItems: 'center',
      marginBottom: width * 0.1,
    },
    title: {
      fontSize: scale(24),
      color: COLORS.darkGray,
    },
    subtitle: {
      fontSize: scale(14),
      color: COLORS.gray,
    },
  });
};
