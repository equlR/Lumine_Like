import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import OnboardingScreen from '../screens/Onboarding';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const {isFirstLunch} = useSelector(state => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={isFirstLunch ? 'Onboarding' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
