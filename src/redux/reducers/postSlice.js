import {createSlice} from '@reduxjs/toolkit';
import {getPosts} from '../../api/postApi';

const initialState = {
  posts: [],
  userPosts: [],
  loading: false,
  error: null,
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      state.userPosts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;

      let updatedPostData = state.posts.map(post => {
        if (post?.userName === updatedPost?.userName) {
          return {
            ...post,
            ...action.payload,
          };
        } else return post;
      });

      state.posts = updatedPostData;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload);
      state.userPosts = state.userPosts.filter(
        post => post._id !== action.payload,
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateLikes: (state, action) => {
      const {postId, likesCount} = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.likes = likesCount;
      }
    },
    updateComments: (state, action) => {
      const {postId, commentsCount} = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.comments = commentsCount;
      }
    },
  },
});

export const {
  setPosts,
  setUserPosts,
  addPost,
  updatePost,
  deletePost,
  setLoading,
  setError,
  updateLikes,
  updateComments,
} = postSlice.actions;

export default postSlice.reducer;
