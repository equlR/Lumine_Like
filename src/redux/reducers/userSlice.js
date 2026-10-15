import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  userPosts: [],
  followers: [],
  following: [],
  loading: false,
  error: null,
  isOwnProfile: false,
  canViewPosts: true,
  followStatus: false,
  menuVisible: false,
  followList: [],
  followListLoading: false,
  followListError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setIsOwnProfile: (state, action) => {
      state.isOwnProfile = action.payload;
    },
    setCanViewPosts: (state, action) => {
      state.canViewPosts = action.payload;
    },
    setFollowStatus: (state, action) => {
      state.followStatus = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMenuVisible: (state, action) => {
      state.menuVisible = action.payload;
    },
    setFollowList: (state, action) => {
      state.followList = action.payload;
    },
    setFollowListLoading: (state, action) => {
      state.followListLoading = action.payload;
    },
    setFollowListError: (state, action) => {
      state.followListError = action.payload;
    },
  },
});

export const {
  setProfile,
  setUserPosts,
  setFollowers,
  setFollowing,
  setIsOwnProfile,
  setCanViewPosts,
  setFollowStatus,
  setLoading,
  setError,
  setMenuVisible,
  setFollowList,
  setFollowListLoading,
  setFollowListError,
} = userSlice.actions;

export default userSlice.reducer;
