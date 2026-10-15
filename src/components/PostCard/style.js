import {StyleSheet} from 'react-native';
import COLORS from '../../utils/colors';
import {scale} from 'react-native-size-matters';
import {width, height} from '../../utils/helper';

export const useStyle = () => {
  return StyleSheet.create({
    card: {
      borderRadius: 10,
      backgroundColor: COLORS.white,
      padding: width * 0.04,
      marginHorizontal: width * 0.04,
      marginVertical: width * 0.02,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: width * 0.03,
      justifyContent: 'space-between',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    logo: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: width * 0.05,
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
    userInfo: {
      marginLeft: width * 0.03,
      flex: 1,
    },
    title: {
      fontSize: scale(16),
      color: COLORS.black,
      marginBottom: 2,
    },
    date: {
      fontSize: scale(12),
      color: COLORS.gray,
    },
    options: {
      padding: width * 0.02,
      marginLeft: 'auto',
    },
    threeDotsIcon: {
      width: width * 0.05,
      height: width * 0.05,
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
    mainImage: {
      width: '100%',
      height: width,
      borderRadius: 15,
      resizeMode: 'cover',
      marginBottom: width * 0.025,
    },
    footer: {
      marginTop: width * 0.02,
    },
    actionIcons: {
      flexDirection: 'row',
      marginBottom: width * 0.02,
      alignItems: 'center',
    },
    actionButton: {
      marginLeft: 15,
    },
    actionIcon: {
      width: width * 0.06,
      height: width * 0.06,
      tintColor: COLORS.primary,
    },
    metaContainer: {
      flexDirection: 'row',
      marginBottom: width * 0.02,
    },
    metaText: {
      fontSize: scale(14),
      color: COLORS.darkGray,
      marginRight: width * 0.04,
      marginBottom: width * 0.025,
    },
    caption: {
      fontSize: scale(14),
      color: COLORS.black,
      lineHeight: 20,
      marginTop: width * 0.025,
    },
    // Comment Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    commentContainer: {
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      maxHeight: height * 0.8,
      paddingTop: width * 0.04,
    },
    commentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.04,
      paddingBottom: width * 0.04,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    headerTitle: {
      fontSize: scale(18),
      color: COLORS.black,
    },
    closeButton: {
      fontSize: scale(22),
      color: COLORS.primary,
      padding: width * 0.02,
    },
    commentsList: {
      flexGrow: 1,
      paddingHorizontal: width * 0.04,
    },
    commentItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: width * 0.03,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    commentUserInfo: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'flex-start',
    },
    commentUserImage: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: width * 0.05,
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
    commentContent: {
      flex: 1,
      marginLeft: width * 0.03,
      marginRight: width * 0.02,
    },
    commentUserName: {
      fontSize: scale(14),
      color: COLORS.black,
      marginBottom: 2,
    },
    commentText: {
      fontSize: scale(14),
      color: COLORS.darkGray,
      lineHeight: 20,
    },
    commentOptions: {
      padding: width * 0.02,
      marginLeft: 'auto',
    },
    commentOptionsIcon: {
      width: width * 0.045,
      height: width * 0.045,
      tintColor: COLORS.primary,
      resizeMode: 'contain',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.04,
      paddingVertical: width * 0.03,
    },
    input: {
      width: '78%',
    },
    postButton: {
      width: '20%',
      height: width * 0.105,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      textAlign: 'center',
      color: COLORS.gray,
      marginTop: width * 0.1,
      fontSize: scale(14),
    },
  });
};
