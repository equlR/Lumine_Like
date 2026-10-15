import {useState, useEffect, useCallback} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image, TouchableOpacity, View, Platform} from 'react-native';
import {useStyle} from './style';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {IMAGES} from '../../assets';
import {api} from '../../api';
import {showSuccess, showError} from '../../utils/helper';
import Text from '../../components/CustomText';

const styles = useStyle();

const CreatePostScreen = ({navigation, route}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [postData, setPostData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize editing state when screen mounts
  useEffect(() => {
    if (route.params?.isEditing && route.params?.postData) {
      setIsEditing(true);
      setPostData(route.params.postData);
      setSelectedImage(route.params.postData.image);
      setCaption(route.params.postData.caption);
    }
    // Reset everything when screen unmounts
    return () => {
      resetForm();
    };
  }, [route.params]);

  // Clear form and editing state
  const resetForm = useCallback(() => {
    setIsEditing(false);
    setPostData(null);
    setSelectedImage(null);
    setCaption('');
    setLoading(false);
  }, []);

  // Reset when leaving screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetForm();
    });

    return unsubscribe;
  }, [navigation, resetForm]);

  const selectImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.8,
        selectionLimit: 1,
        saveToPhotos: true,
        presentationStyle: 'fullScreen',
        // Add these options for Android
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        console.error('ImagePicker Error:', result.errorMessage);
        showError(result.errorMessage || 'Failed to pick image');
        return;
      }

      if (!result.assets || result.assets.length === 0) {
        showError('No image selected');
        return;
      }

      const asset = result.assets[0];
      if (!asset.uri) {
        showError('Invalid image selected');
        return;
      }

      setSelectedImage(asset.uri);
    } catch (error) {
      console.error('ImagePicker Error:', error);
      showError('Failed to pick image. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      showError('Please select an image');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('caption', caption);

      const fileType = selectedImage.endsWith('.jpg')
        ? 'jpg'
        : selectedImage.endsWith('.jpeg')
        ? 'jpeg'
        : selectedImage.endsWith('.png')
        ? 'png'
        : 'jpg';

      formData.append('postImage', {
        uri:
          Platform.OS === 'ios'
            ? selectedImage.replace('file://', '')
            : selectedImage,
        type: `image/${fileType}`,
        name: `post-image.${fileType}`,
      });

      // Add config for multipart/form-data
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = isEditing
        ? await api.POSTS.edit_post({
            post_id: postData.id,
            data: caption,
            ...config,
          })
        : await api.POSTS.create_post({
            data: formData,
            ...config,
          });

      if (response?.status === 'SUCCESS') {
        if (isEditing) {
          const updatedPostData = {
            _id: postData.id,
            image: postData.image,
            caption: caption,
            userName: postData.userName,
          };
          showSuccess('Post updated successfully!');
        } else {
          showSuccess('Post created successfully!');
        }
        resetForm();
        navigation.goBack();
      }
    } catch (error) {
      console.error('API Error:', error?.response?.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.BackButton}>
          <Image source={IMAGES.backIcon} style={styles.BackIcon} />
        </TouchableOpacity>
      )}
      <Text type="semibold" style={styles.CreatePostText}>
        {isEditing ? 'Edit Post' : 'Create Post'}
      </Text>

      <TouchableOpacity onPress={selectImage} style={styles.UploadImageView}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.SelectedImage} />
        ) : (
          <Image source={IMAGES.UploadImage} style={styles.UploadImage} />
        )}
      </TouchableOpacity>

      <CustomInput
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        backgroundColor={styles.container.backgroundColor}
        multiline={true}
      />

      <CustomButton
        title={isEditing ? 'Edit' : 'Create'}
        postfixLogo={isEditing ? IMAGES.editIcon : IMAGES.createPostScreen}
        onPress={handleSubmit}
        loading={loading}
      />
    </View>
  );
};

export default CreatePostScreen;
