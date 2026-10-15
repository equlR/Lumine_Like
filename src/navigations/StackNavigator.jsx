import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/Splash';

const StackNavigator = () => {
  const {token} = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(Timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!!token ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default StackNavigator;
