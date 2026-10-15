import React, {useCallback, memo} from 'react';
import {View, VirtualizedList, ActivityIndicator} from 'react-native';
import {useStyle} from './style';
import PostCard from '../../components/PostCard';
import {useFocusEffect} from '@react-navigation/native';
import {api} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts, setLoading} from '../../redux/reducers/postSlice';
import COLORS from '../../utils/colors';
import { height } from '../../utils/helper';

const MemoizedPostCard = memo(PostCard);

const HomeScreen = ({navigation}) => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const {posts, loading} = useSelector(state => state.posts);
  

  const fetchPosts = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await api.POSTS.all_posts({});
      if (
        response?.status === 'SUCCESS' &&
        Array.isArray(response?.data?.posts)
      ) {
        const formattedPosts = response.data.posts.map(post => ({
          _id: post._id || Math.random().toString(),
          profileImage: post?.user?.profileImage || '',
          title: post?.user?.fullName || 'Anonymous',
          userName: post?.user?.userName || '',
          date: post?.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : '',
          mainImage: post?.postImage || '',
          likes: post?.likes || 0,
          comments: post?.comments || 0,
          caption: post?.caption || '',
        }));
        dispatch(setPosts(formattedPosts));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      dispatch(setPosts([]));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts]),
  );

  const getItem = useCallback((data, index) => {
    return data && Array.isArray(data) ? data[index] : null;
  }, []);

  const getItemCount = useCallback(data => {
    return data && Array.isArray(data) ? data.length : 0;
  }, []);

  const keyExtractor = useCallback(item => {
    return item?._id?.toString() || Math.random().toString();
  }, []);

  // Memoized renderItem function
  const renderItem = useCallback(
    ({item}) => {
      if (!item) return null;
      return <MemoizedPostCard post={item} navigation={navigation}  />;
    },
    [navigation],
  );

  // Get item height for better performance
  const getItemLayout = useCallback(
    (data, index) => ({
      length: height * 0.72,
      offset: (height * 0.72) * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {Array.isArray(posts) ? (
        <VirtualizedList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItem={getItem}
          getItemCount={getItemCount}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchPosts}
          refreshing={loading}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
