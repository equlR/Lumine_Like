import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userData: null,
  isFirstLunch: true,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    completeFirstLaunch(state) {
      state.isFirstLunch = false;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthData: state => {
      state.userData = null;
      state.token = null;
    },
  },
});

export const {setUserData, setToken, clearAuthData, completeFirstLaunch} =
  authSlice.actions;
export default authSlice.reducer;
