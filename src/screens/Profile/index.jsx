import React, {useState, useCallback} from 'react';
import {View, FlatList, Image, TouchableOpacity, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useStyle} from './style';
import PostCard from '../../components/PostCard';
import {api} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import CustomMenu from '../../components/CustomMenu';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../utils/colors';
import {showError, showSuccess} from '../../utils/helper';
import Text from '../../components/CustomText';
import {
  setProfile,
  setUserPosts,
  setIsOwnProfile,
  setCanViewPosts,
  setFollowStatus,
  setLoading,
  setError,
  setMenuVisible,
} from '../../redux/reducers/userSlice';
import {clearAuthData} from '../../redux/reducers/authslice';
import CustomModal from '../../components/CustomModel';
import {IMAGES} from '../../assets';

const styles = useStyle();

const ProfileScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {
    profile,
    userPosts,
    loading,
    isOwnProfile,
    canViewPosts,
    followStatus,
    menuVisible,
  } = useSelector(state => state.user);
  const {userData} = useSelector(state => state.auth);

  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const checkProfileOwnership = useCallback(
    async profileUsername => {
      try {
        const isOwn = profileUsername === userData?.userName;
        dispatch(setIsOwnProfile(isOwn));
      } catch (error) {
        console.error('Error checking profile ownership:', error);
      }
    },
    [dispatch, userData],
  );

  const fetchUserProfile = useCallback(
    async (targetUserName = '') => {
      dispatch(setLoading(true));
      try {
        const response = await api.USERS.user_profile({
          userName: targetUserName || userData?.userName,
        });

        if (response?.status === 'SUCCESS') {
          const profileData = response.data.user;
          dispatch(setProfile(profileData));
          await checkProfileOwnership(profileData.userName);

          // Set following status and post visibility
          if (profileData?.status === 'unfollow') {
            dispatch(setFollowStatus(true));
            dispatch(setCanViewPosts(true));
          } else if (!targetUserName) {
            dispatch(setCanViewPosts(true));
          } else {
            dispatch(setFollowStatus(false));
            dispatch(setCanViewPosts(false));
          }

          // Fetch posts if allowed
          if (canViewPosts) {
            const postsResponse = await api.POSTS.users_posts({
              userName: targetUserName || profileData.userName,
            });

            if (postsResponse?.status === 'SUCCESS') {
              const formattedPosts = postsResponse.data.posts.map(post => ({
                _id: post._id,
                profileImage: profileData.profileImage,
                title: profileData.fullName,
                userName: profileData.userName,
                date: new Date(post.createdAt).toLocaleDateString(),
                mainImage: post?.postImage,
                likes: post.likes || 0,
                comments: post.comments || 0,
                caption: post.caption || '',
              }));
              dispatch(setUserPosts(formattedPosts));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        dispatch(setError(error?.message));
        if (error?.response?.message === "You don't follow this user !") {
          dispatch(setCanViewPosts(false));
          dispatch(setUserPosts([]));
        }
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, canViewPosts, userData, checkProfileOwnership],
  );

  const handleFollow = async () => {
    try {
      const userId = profile?._id;
      if (!userId) {
        showError('User ID not available');
        return;
      }

      const response = followStatus
        ? await api.USER_CONNECTIONS.unfollow({user_id: userId})
        : await api.USER_CONNECTIONS.follow({user_id: userId});

      if (response?.status === 'SUCCESS') {
        dispatch(setFollowStatus(!followStatus));
        showSuccess(
          followStatus ? 'Unfollowed successfully' : 'Followed successfully',
        );
        fetchUserProfile(profile.userName);
      }
    } catch (error) {
      console.error('Follow error:', error);
      showError(error?.message || 'Failed to update follow status');
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    closeModal();
    dispatch(setMenuVisible(false));
    try {
      await AsyncStorage.removeItem('token');
      dispatch(clearAuthData());
    } catch (error) {
      console.error('Logout error:', error);
      showError('Failed to logout');
    }
  };

  const handlePostDelete = useCallback(
    postId => {
      const updatedPosts = userPosts.filter(post => post._id !== postId);
      dispatch(setUserPosts(updatedPosts));
    },
    [userPosts, dispatch],
  );

  const menuOptions = isOwnProfile
    ? [
        {
          label: 'Edit Profile',
          onPress: () => navigation.navigate('EditProfile'),
        },
        {
          label: 'Logout',
          onPress: () => setShowLogoutModal(true),
          danger: true,
        },
      ]
    : [];

  useFocusEffect(
    useCallback(() => {
      const paramUserName = route.params?.userName;
      fetchUserProfile(paramUserName);
    }, [fetchUserProfile, route.params?.userName]),
  );

  const keyExtractor = useCallback(item => {
    return item?._id?.toString() || Math.random().toString();
  }, []);

  const renderGridItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.postGridItem}
        activeOpacity={0.9}
        onPress={() => {
          setSelectedPost(item);
          setModalVisible(true);
        }}>
        <Image
          source={{uri: item.mainImage}}
          style={styles.postImage}
          resizeMode="cover"
        />
        <View style={styles.postImageOverlay} />
      </TouchableOpacity>
    ),
    [],
  );

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedPost(null);
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        {/* Three Dots Menu Button - Only show if it's own profile */}
        {isOwnProfile ? (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => dispatch(setMenuVisible(true))}>
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}>
            <Image source={IMAGES.backIcon} style={styles.backArrow} />
          </TouchableOpacity>
        )}

        {/* Profile Image */}
        <Image
          source={{uri: profile?.profileImage}}
          style={styles.profileImage}
        />

        {/* User Info */}
        <Text type="bold" style={styles.userName}>
          {profile?.fullName}
        </Text>
        <Text type="medium" style={styles.userHandle}>
          @{profile?.userName}
        </Text>
        <Text style={styles.userBio}>{profile?.bio}</Text>

        {!isOwnProfile && (
          <View style={styles.followContainer}>
            <CustomButton
              title={profile?.status}
              onPress={handleFollow}
              style={styles.followButton}
              bgColor={COLORS.primary}
              textColor={COLORS.white}
            />
          </View>
        )}

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userPosts.length}</Text>
            <Text type="medium" style={styles.statLabel}>
              Posts
            </Text>
          </View>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              navigation.navigate('FollowList', {
                userId: profile?._id,
                type: 'followers',
              })
            }>
            <Text style={styles.statValue}>{profile?.followers || 0}</Text>
            <Text type="medium" style={styles.statLabel}>
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              navigation.navigate('FollowList', {
                userId: profile?._id,
                type: 'following',
              })
            }>
            <Text style={styles.statValue}>{profile?.following || 0}</Text>
            <Text type="medium" style={styles.statLabel}>
              Following
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Menu */}
      <CustomMenu
        visible={menuVisible}
        onClose={() => dispatch(setMenuVisible(false))}
        options={menuOptions}
      />

      {/* Posts List */}
      {!canViewPosts && !isOwnProfile ? (
        <View style={styles.noPostsContainer}>
          <Text type="medium" style={styles.noPostsText}>
            Looks like these posts are hidden—follow to view them!
          </Text>
        </View>
      ) : (
        <FlatList
          data={userPosts}
          renderItem={renderGridItem}
          keyExtractor={item => item._id}
          removeClippedSubviews={false}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
          onRefresh={() => fetchUserProfile(profile?.userName)}
          refreshing={loading}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
          }}
          initialNumToRender={9}
          maxToRenderPerBatch={9}
          windowSize={9}
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        statusBarTranslucent>
        <View style={styles.postDetailModal}>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={closeModal}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {selectedPost && (
              <PostCard
                post={selectedPost}
                navigation={navigation}
                onDelete={postId => {
                  closeModal();
                  handlePostDelete(postId);
                }}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <CustomModal
        visible={showLogoutModal}
        message="Are you sure you want to logout?"
        showConfirmButtons={true}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
};

export default ProfileScreen;
