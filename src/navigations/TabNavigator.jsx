import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import COLORS from '../utils/colors';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import CreatePostScreen from '../screens/CreatePost';
import ProfileScreen from '../screens/Profile';
import {Image, Text} from 'react-native';
import {IMAGES} from '../assets';
import {width} from '../utils/helper';
import {scale} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: width * 0.2,
          paddingBottom: width * 0.025,
          shadowColor: COLORS.black,
        },
        tabBarLabelStyle: {
          fontSize: scale(12),
          fontWeight: '600',
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? COLORS.primary : COLORS.gray,
              fontSize: scale(12),
              textAlign: 'center',
              fontWeight: '600',
            }}>
            {route.name}
          </Text>
        ),
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = IMAGES.homeScreen;
          } else if (route.name === 'Search') {
            iconName = IMAGES.searchScreen;
          } else if (route.name === 'CreatePost') {
            iconName = IMAGES.createPostScreen;
          } else if (route.name === 'UserProfile') {
            iconName = IMAGES.profileScreen;
          }
          return (
            <Image
              source={iconName}
              style={{
                width: width * 0.055,
                height: width * 0.055,
                tintColor: focused ? COLORS.primary : COLORS.gray,
              }}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen
        name="UserProfile"
        component={ProfileScreen}
        initialParams={{isMainProfile: true}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
