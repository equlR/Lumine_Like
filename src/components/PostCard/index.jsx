import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {useStyle} from './style';
import {IMAGES} from '../../assets';
import {showSuccess, showError, width} from '../../utils/helper';
import {api} from '../../api';
import COLORS from '../../utils/colors';
import CustomMenu from '../CustomMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import Text from '../CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateLikes,
  updateComments,
  deletePost,
} from '../../redux/reducers/postSlice';
import CustomModal from '../CustomModel';

const styles = useStyle();

const PostCard = ({post, onLikeUpdate, onDelete, navigation}) => {
  const dispatch = useDispatch();
  const {userName} = useSelector(state => state.auth.userData);
  const [isLiking, setIsLiking] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isOwnPost, setIsOwnPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [lastTap, setLastTap] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Check if the post belongs to logged-in user using username
  useEffect(() => {
    const checkPostOwnership = async () => {
      try {
        if (post.userName === userName) {
          setIsOwnPost(true);
        }
      } catch (error) {
        console.error('Error checking post ownership:', error);
      }
    };

    checkPostOwnership();
  }, [post.userName, userName]);

  const handleLike = async () => {
    if (isLiking) {
      return;
    } else {
      setIsLiking(true);
      try {
        const response = isLiked
          ? await api.POSTS.LIKE.unlike({post_id: post._id})
          : await api.POSTS.LIKE.like({post_id: post._id});

        if (response?.status === 'SUCCESS') {
          setIsLiked(!isLiked);
          const newLikeCount = isLiked ? localLikes - 1 : localLikes + 1;
          setLocalLikes(newLikeCount);
          dispatch(updateLikes({postId: post._id, likesCount: newLikeCount}));

          if (onLikeUpdate) {
            onLikeUpdate(post._id, newLikeCount);
          }
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      } finally {
        setIsLiking(false);
      }
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      // Double tap detected - toggle like status
      handleLike(); // This will handle both like and unlike
    } else {
      setLastTap(now);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await api.POSTS.delete_post({post_id: post._id});
      if (response?.status === 'SUCCESS') {
        showSuccess('Post deleted successfully');
        dispatch(deletePost(post._id));
        onDelete && onDelete(post._id);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCommentPress = () => {
    setShowComments(true);
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        message: post.caption,
        url: post.mainImage,
        title: 'Share Post',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  // Dynamic menu options based on username match
  const menuOptions = isOwnPost
    ? [
        {
          label: 'Edit Post',
          onPress: () => {
            navigation.navigate('EditPost', {
              isEditing: true,
              postData: {
                id: post._id,
                caption: post.caption,
                image: post.mainImage,
                userName: post.userName,
              },
            });
          },
        },
        {
          label: 'Delete Post',
          onPress: () => setShowDeleteModal(true),
          danger: true,
        },
      ]
    : [
        {
          label: 'View User Profile',
          onPress: () =>
            navigation.navigate('OppProfile', {userName: post.userName}),
        },
      ];

  return (
    <>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{uri: post?.profileImage}} style={styles.logo} />
            <View style={styles.userInfo}>
              <Text type="semibold" style={styles.title}>
                {post.title}
              </Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.options} onPress={handleMenuPress}>
            <Image source={IMAGES.threeDotsIcon} style={styles.threeDotsIcon} />
          </TouchableOpacity>
        </View>

        <CustomMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          options={menuOptions}
        />

        {/* Main Image with double tap */}
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <Image source={{uri: post.mainImage}} style={styles.mainImage} />
        </TouchableWithoutFeedback>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <View style={styles.actionIcons}>
            <TouchableOpacity onPress={handleLike} disabled={isLiking}>
              <Image
                source={isLiked ? IMAGES.likedIcon : IMAGES.likeIcon}
                style={{
                  width: width * 0.07,
                  height: width * 0.07,
                  tintColor: COLORS.primary,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCommentPress}
              style={{marginLeft: 20}}>
              <Image
                source={IMAGES.commentIcon}
                style={{
                  width: width * 0.07,
                  height: width * 0.07,
                  tintColor: COLORS.primary,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={{marginLeft: 20}}>
              <Image
                source={IMAGES.shareIcon}
                style={{
                  width: width * 0.07,
                  height: width * 0.07,
                  tintColor: COLORS.primary,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.metaText}>
            <Text style={styles.bold}>{localLikes} Likes </Text>
            <Text style={styles.bold}>{post.comments} Comments</Text>
          </Text>
          <Text style={styles.caption}>{post.caption}</Text>
        </View>

        <CommentSection
          visible={showComments}
          onClose={() => setShowComments(false)}
          postId={post._id}
          comments={comments}
          setComments={setComments}
        />
      </View>

      <CustomModal
        visible={showDeleteModal}
        message="Are you sure you want to delete this post?"
        type="error"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePost}
        showConfirmButtons={true}
      />
    </>
  );
};

const CommentSection = ({visible, onClose, postId, comments, setComments}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userName} = useSelector(state => state.auth.userData);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState({});

  // Fetch comments when modal opens
  useEffect(() => {
    if (visible) {
      fetchComments();
    }
  }, [visible, postId]);

  const fetchComments = async () => {
    try {
      const response = await api.POSTS.COMMENT.comments_of_post({
        post_id: postId,
      });
      if (response?.status === 'SUCCESS') {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await api.POSTS.COMMENT.comment_add({
        post_id: postId,
        data: {comment: newComment},
      });

      if (response?.status === 'SUCCESS') {
        setNewComment('');
        await fetchComments();
        dispatch(
          updateComments({
            postId: postId,
            commentsCount: comments.length + 1,
          }),
        );
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async commentId => {
    try {
      const response = await api.POSTS.COMMENT.comment_delete({
        comment_id: commentId,
      });
      if (response?.status === 'SUCCESS') {
        await fetchComments();
        dispatch(
          updateComments({
            postId: postId,
            commentsCount: comments.length - 1,
          }),
        );
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const renderComment = useCallback(
    ({item}) => (
      <>
        <View style={styles.commentItem}>
          <View style={styles.commentUserInfo}>
            <Image
              source={{uri: item.user?.profileImage}}
              style={styles.commentUserImage}
            />
            <View style={styles.commentContent}>
              <Text type="medium" style={styles.commentUserName}>
                {item.user?.fullName}
              </Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              setMenuVisible(prev => ({
                ...prev,
                [item._id]: true,
              }))
            }
            style={styles.commentOptions}>
            <Image
              source={IMAGES.threeDotsIcon}
              style={styles.commentOptionsIcon}
            />
          </TouchableOpacity>
          <CustomMenu
            visible={menuVisible[item._id]}
            onClose={() =>
              setMenuVisible(prev => ({
                ...prev,
                [item._id]: false,
              }))
            }
            options={
              item.user?.userName === userName
                ? [
                    {
                      label: 'Delete',
                      onPress: async () => {
                        try {
                          await handleDeleteComment(item._id);
                        } catch (error) {
                          console.error('Error deleting comment:', error);
                        }
                      },
                      danger: true,
                    },
                  ]
                : [
                    {
                      label: 'View User Profile',
                      onPress: () => {
                        onClose();
                        navigation.navigate('UserProfile', {
                          userName: item.user?.userName,
                        });
                      },
                    },
                  ]
            }
          />
        </View>
      </>
    ),
    [menuVisible, userName, navigation, onClose],
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <Text type="semibold" style={styles.headerTitle}>
              Comments
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={item => item._id}
            removeClippedSubviews={false}
            contentContainerStyle={styles.commentsList}
            ListEmptyComponent={
              <Text type="medium" style={styles.emptyText}>
                No comments yet
              </Text>
            }
          />

          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Write a comment..."
              value={newComment}
              onChangeText={setNewComment}
              style={styles.input}
              backgroundColor={styles.commentContainer.backgroundColor}
            />
            <CustomButton
              title="Post"
              onPress={handleAddComment}
              loading={loading}
              style={styles.postButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PostCard;
