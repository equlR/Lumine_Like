import React, {useCallback} from 'react';
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useStyle} from './style';
import {api} from '../../api';
import {showError, showSuccess} from '../../utils/helper';
import {useFocusEffect} from '@react-navigation/native';
import Text from '../../components/CustomText';
import {
  setFollowList,
  setFollowListLoading,
  setFollowListError,
  setFollowStatus,
} from '../../redux/reducers/userSlice';
import CustomButton from '../../components/CustomButton';
import COLORS from '../../utils/colors';
import {IMAGES} from '../../assets';

const FollowList = ({route, navigation}) => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const {userId, type} = route.params;

  const {followList, followListLoading} = useSelector(state => state.user);
  const {userData} = useSelector(state => state.auth);

  const fetchUsers = useCallback(async () => {
    dispatch(setFollowListLoading(true));
    try {
      const response = await api.USER_CONNECTIONS[type]({
        user_id: userId,
      });

      if (response?.status === 'SUCCESS') {
        dispatch(setFollowList(response.data[type] || []));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch(setFollowListError(error?.message));
      showError(error?.message || `Failed to fetch ${type}`);
    } finally {
      dispatch(setFollowListLoading(false));
    }
  }, [dispatch, userId, type]);

  const handleFollowToggle = async targetUserId => {
    try {
      const response = await api.USER_CONNECTIONS[
        followList.some(user => user._id === targetUserId && user.isFollowing)
          ? 'unfollow'
          : 'follow'
      ]({
        user_id: targetUserId,
      });

      if (response?.status === 'SUCCESS') {
        showSuccess(
          `Successfully ${
            followList.some(
              user => user._id === targetUserId && user.isFollowing,
            )
              ? 'unfollowed'
              : 'followed'
          } user`,
        );
        // Refresh the list
        fetchUsers();
      }
    } catch (error) {
      console.error('Follow toggle error:', error);
      showError(error?.message || 'Failed to update follow status');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers]),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() =>
        navigation.navigate('UserProfile', {userName: item.userName})
      }>
      <Image source={{uri: item.profileImage}} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <Text style={styles.userHandle}>@{item.userName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}>
        <Image source={IMAGES.backIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text type="semibold" style={styles.headerText}>
        {type === 'followers' ? 'Followers' : 'Following'}
      </Text>

      <FlatList
        data={followList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        contentContainerStyle={styles.listContainer}
        onRefresh={fetchUsers}
        refreshing={followListLoading}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              type="medium"
              style={styles.emptyText}>{`No ${type} yet`}</Text>
          </View>
        }
      />
    </View>
  );
};

export default FollowList;
