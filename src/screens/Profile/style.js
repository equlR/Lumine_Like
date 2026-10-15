import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {width, height} from '../../utils/helper';
import COLORS from '../../utils/colors';

export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.boneWhite,
    },
    header: {
      backgroundColor: COLORS.white,
      borderRadius: 15,
      padding: width * 0.04,
      margin: width * 0.03,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
      alignItems: 'center',
    },
    profileImageContainer: {
      marginTop: width * 0.02,
    },
    profileImage: {
      width: width * 0.25,
      height: width * 0.25,
      borderRadius: width * 0.125,
      borderWidth: 3,
      borderColor: COLORS.primary,
    },
    menuButton: {
      position: 'absolute',
      right: width * 0.04,
      top: width * 0.04,
      padding: width * 0.02,
      zIndex: 1,
    },
    menuButtonText: {
      fontSize: scale(24),
      color: COLORS.primary,
      fontWeight: 'bold',
    },
    userName: {
      fontSize: scale(20),
      color: COLORS.black,
      marginTop: width * 0.03,
    },
    userHandle: {
      fontSize: scale(14),
      color: COLORS.gray,
      marginTop: width * 0.01,
    },
    userBio: {
      fontSize: scale(14),
      color: COLORS.gray,
      marginTop: width * 0.01,
      textAlign: 'center',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: width * 0.04,
      marginTop: width * 0.03,
      borderTopWidth: 1,
      borderTopColor: COLORS.lightGray,
    },
    statItem: {
      alignItems: 'center',
      width: '30%',
    },
    statValue: {
      fontSize: scale(18),
      color: COLORS.primary,
    },
    statLabel: {
      fontSize: scale(12),
      color: COLORS.darkGray,
      marginTop: width * 0.01,
    },
    editButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: width * 0.08,
      paddingVertical: width * 0.02,
      borderRadius: width * 0.06,
      marginTop: width * 0.03,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
      marginTop: width * 0.03,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: width * 0.04,
    },
    followContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: width * 0.03,
      marginTop: width * 0.03,
    },
    followButton: {
      width: '40%',
      paddingVertical: width * 0.02,
    },
    followButtonText: {
      fontSize: scale(14),
    },
    noPostsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: width * 0.04,
    },
    noPostsText: {
      fontSize: scale(14),
      color: COLORS.gray,
      textAlign: 'center',
      marginTop: width * 0.1,
    },
    gridContainer: {
      paddingTop: width * 0.01,
      backgroundColor: COLORS.white,
    },
    postGridItem: {
      width: (width - width * 0.06) / 3,
      height: (width - width * 0.06) / 3,
      margin: width * 0.01,
      borderRadius: 8,
      backgroundColor: COLORS.lightGray,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      overflow: 'hidden',
    },
    postImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    postImageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderRadius: 8,
    },
    postDetailModal: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.85)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: width * 0.9,
      maxHeight: height * 0.8,
      borderRadius: 20,
      overflow: 'hidden',
    },
    closeButton: {
      position: 'absolute',
      top: height * 0.05,
      right: width * 0.05,
      // zIndex: 999,
    },
    closeIcon: {
      color: COLORS.white,
      fontSize: scale(18),
      width: width * 0.1,
      height: width * 0.1,
    },
    backArrow: {
      tintColor: COLORS.primary,
      width: width * 0.07,
      height: width * 0.07,
      resizeMode: 'contain',
    },
    backIcon: {
      position: 'absolute',
      top: width * 0.04,
      left: width * 0.04,
    },
  });
};
