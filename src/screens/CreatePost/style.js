import {StyleSheet} from 'react-native';
import {width} from '../../utils/helper';
import {scale} from 'react-native-size-matters';
import COLORS from '../../utils/colors';
export const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: width * 0.03,
      backgroundColor: COLORS.boneWhite,
      gap: 20,
      alignItems: 'center',
    },
    CreatePostText: {
      fontSize: scale(20),
      marginTop: 15,
    },
    UploadImageView: {
      width: '100%',
      height: width * 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: COLORS.darkGray,
      borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden',
    },
    UploadImage: {
      width: width * 0.2,
      height: width * 0.2,
      tintColor: COLORS.primary,
    },
    SelectedImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    BackButton: {
      position: 'absolute',
      top: width * 0.04,
      left: width * 0.04,
    },
    BackIcon: {
      width: width * 0.07,
      height: width * 0.07,
      tintColor: COLORS.primary,
    },
  });
};
