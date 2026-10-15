import React, {useCallback, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../../components/CustomInput';
import {IMAGES} from '../../assets';
import {useStyle} from './style';
import {api} from '../../api';
import COLORS from '../../utils/colors';
import Text from '../../components/CustomText';
import {
  setSearchResults,
  setSearchLoading,
  setSearchQuery,
  clearSearch,
} from '../../redux/reducers/searchSlice';

const SearchScreen = ({navigation}) => {
  const styles = useStyle();
  const dispatch = useDispatch();
  const {searchResults, loading, error, searchQuery} = useSelector(
    state => state.search,
  );
  const searchTimeout = useRef(null);

  const searchUsers = useCallback(
    async query => {
      dispatch(setSearchLoading(true));
      try {
        const response = await api.USERS.search_user({
          query,
        });

        if (response?.status === 'SUCCESS') {
          dispatch(setSearchResults(response?.data?.users || []));
        }
      } catch (error) {
        console.error('Search error:', error);
        if (error?.response) {
          dispatch(setSearchResults([]));
        }
      } finally {
        dispatch(setSearchLoading(false));
      }
    },
    [dispatch],
  );

  const handleSearch = useCallback(
    text => {
      dispatch(setSearchQuery(text));

      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      if (text.length > 0) {
        searchTimeout.current = setTimeout(() => {
          searchUsers(text);
        }, 500);
      } else {
        dispatch(clearSearch());
      }
    },
    [dispatch, searchUsers],
  );

  const renderUserItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.userCard}
        onPress={() =>
          navigation.navigate('OppProfile', {userName: item.userName})
        }>
        <Image source={{uri: item.profileImage}} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text type="medium" style={styles.userName}>
            {item.fullName}
          </Text>
          <Text type="regular" style={styles.userHandle}>
            @{item.userName}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation, styles],
  );

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      dispatch(clearSearch());
    };
  }, [dispatch]);

  const handleClear = useCallback(() => {
    dispatch(setSearchQuery(''));
    dispatch(clearSearch());
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={handleSearch}
        backgroundColor={styles.container.backgroundColor}
        prefixIcon={IMAGES.searchScreen}
        showClearButton={true}
        onClear={handleClear}
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text type="medium" style={styles.loaderText}>
            Searching...
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderUserItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            searchQuery ? (
              <View style={styles.emptyContainer}>
                <Text type="medium" style={styles.emptyText}>
                  No users found
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default SearchScreen;
