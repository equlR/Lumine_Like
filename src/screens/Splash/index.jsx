import {useEffect, useRef} from 'react';
import {View, StatusBar, Animated} from 'react-native';
import {IMAGES} from '../../assets';
import {useStyle} from './style';

const styles = useStyle();

const SplashScreen = () => {
  const fadeAnimBg = useRef(new Animated.Value(0)).current;
  const fadeAnimLogo = useRef(new Animated.Value(0)).current;
  const fadeAnimText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // 1st animation: Background
      Animated.timing(fadeAnimBg, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // 2nd animation: Logo
      Animated.timing(fadeAnimLogo, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      // 3rd animation: Text
      Animated.timing(fadeAnimText, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.View style={[styles.background, {opacity: fadeAnimBg}]} />

      <Animated.Image
        source={IMAGES.Logo}
        style={[styles.logo, {opacity: fadeAnimLogo}]}
      />

      <Animated.Text style={[styles.text, {opacity: fadeAnimText}]}>
        LUMINE
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;
