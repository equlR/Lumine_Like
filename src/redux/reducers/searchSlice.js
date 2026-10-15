import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.error = null;
    },
    setSearchLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.error = null;
    },
  },
});

export const {
  setSearchResults,
  setSearchLoading,
  setSearchError,
  setSearchQuery,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;