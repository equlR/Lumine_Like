import {StyleSheet} from 'react-native';
import {width} from '../../utils/helper';
import COLORS from '../../utils/colors';
import {scale} from 'react-native-size-matters';

export const useStyle = () => {
  return StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      elevation: 999,
      zIndex: 999,
      borderRadius: 10,
    },
    menuContainer: {
      position: 'absolute',
      top: width * 0.02,
      right: width * 0.05,
      backgroundColor: COLORS.white,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 1000,
      zIndex: 1000,
      width: width * 0.4,
      overflow: 'hidden', // Added to ensure child elements respect border radius
    },
    menuItem: {
      paddingVertical: width * 0.03,
      paddingHorizontal: width * 0.04,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    lastMenuItem: {
      borderBottomWidth: 0,
    },
    menuText: {
      fontSize: scale(14),
      color: COLORS.darkGray,
    },
    dangerText: {
      color: COLORS.error,
    },
  });
};
