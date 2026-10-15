import {StyleSheet} from 'react-native';
import {width, height} from '../../utils/helper';
import COLORS from '../../utils/colors';
import {scale} from 'react-native-size-matters';

export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.boneWhite,
      paddingTop: width * 0.04,
    },
    headerText: {
      textAlign: 'center',
      fontSize: scale(20),
      color: COLORS.black,
      marginHorizontal: width * 0.04,
      marginBottom: width * 0.04,
    },
    listContainer: {
      paddingHorizontal: width * 0.04,
    },
    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      padding: width * 0.04,
      borderRadius: 12,
      marginBottom: width * 0.03,
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
      fontWeight: '600',
      color: COLORS.black,
    },
    userHandle: {
      fontSize: scale(14),
      color: COLORS.gray,
      marginTop: 2,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: width * 0.2,
    },
    emptyText: {
      fontSize: scale(14),
      color: COLORS.gray,
      textAlign: 'center',
    },
    backArrow: {
      position: 'absolute',
      top: width * 0.04,
      left: width * 0.04,
      zIndex: 10,
    },
    backIcon: {
      width: width * 0.07,
      height: width * 0.07,
      tintColor: COLORS.primary,
    },
  });
};
