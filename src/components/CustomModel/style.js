import {StyleSheet} from 'react-native';
import COLORS from '../../utils/colors';
import {scale} from 'react-native-size-matters';
import {width} from '../../utils/helper';

export const useStyle = () => {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: COLORS.white,
      borderRadius: 15,
      padding: width * 0.05,
      alignItems: 'center',
    },
    modalText: {
      fontSize: scale(16),
      color: COLORS.black,
      textAlign: 'center',
      marginBottom: width * 0.05,
      lineHeight: 22,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      gap: width * 0.03,
    },
    button: {
      flex: 1,
      paddingVertical: width * 0.03,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    singleButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: width * 0.03,
      paddingHorizontal: width * 0.08,
      borderRadius: 8,
      minWidth: '50%',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: COLORS.gray,
    },
    confirmButton: {
      backgroundColor: COLORS.primary,
    },
    singleButtonText: {
      color: COLORS.white,
      fontSize: scale(14),
      fontWeight: '600',
    },
    cancelButtonText: {
      color: COLORS.white,
      fontSize: scale(14),
      fontWeight: '600',
    },
    confirmButtonText: {
      color: COLORS.white,
      fontSize: scale(14),
      fontWeight: '600',
    },
  });
};
