import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CustomHeader from '../components/CustomHeader';
import FollowList from '../screens/FollowList';
import ProfileScreen from '../screens/Profile';
import COLORS from '../utils/colors';
import CreatePostScreen from '../screens/CreatePost';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  // const {userName} = useSelector(state => state.auth.userData);
  return (
    <>
      <CustomHeader />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="OppProfile" component={ProfileScreen} />
        <Stack.Screen name="EditPost" component={CreatePostScreen} />
        <Stack.Screen
          name="FollowList"
          component={FollowList}
          options={({route}) => ({
            title:
              route.params.type === 'followers' ? 'Followers' : 'Following',
            headerTintColor: COLORS.primary,
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeNavigator;
