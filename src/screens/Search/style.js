import {StyleSheet} from 'react-native';
import {width} from '../../utils/helper';
import COLORS from '../../utils/colors';
import {scale} from 'react-native-size-matters';

export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: width * 0.03,
      backgroundColor: COLORS.boneWhite,
      paddingTop: width * 0.03,
    },
    listContainer: {
      paddingVertical: width * 0.02,
    },
    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      padding: width * 0.03,
      borderRadius: 12,
      marginVertical: width * 0.01,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    userImage: {
      width: width * 0.12,
      height: width * 0.12,
      borderRadius: width * 0.06,
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
    userInfo: {
      marginLeft: width * 0.03,
      flex: 1,
    },
    userName: {
      fontSize: scale(16),
      color: COLORS.black,
    },
    userHandle: {
      fontSize: scale(14),
      color: COLORS.gray,
      marginTop: 2,
    },
    emptyText: {
      textAlign: 'center',
      color: COLORS.gray,
      marginTop: width * 0.1,
      fontSize: scale(14),
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 12,
      margin: width * 0.04,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      padding: width * 0.04,
    },
    loaderText: {
      marginTop: width * 0.03,
      fontSize: scale(14),
      color: COLORS.primary,
      fontFamily:'bold',
    },
  });
};
