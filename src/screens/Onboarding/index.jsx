import React, {useRef, useState} from 'react';
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import {OnboardingData} from '../../utils/constants';
import {useStyle} from './style';
import CustomButton from '../../components/CustomButton';
import Text from '../../components/CustomText';
import {useDispatch} from 'react-redux';
import { completeFirstLaunch } from '../../redux/reducers/authslice';


const styles = useStyle();

const OnboardingScreen = ({navigation}) => {
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSkip = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: OnboardingData.length - 1,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (activeSlide < OnboardingData.length - 1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: activeSlide + 1,
        animated: true,
      });
    }
  };

  const handleDone = async () => {
    try {
      await new Promise(resolve => {
        dispatch(completeFirstLaunch());
        resolve();
      });
      navigation.replace('Login');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <Image source={item.image} style={styles.OnboardingImages} />
        <Text type="medium" style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    );
  };

  const handleScroll = event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const slideOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(slideOffset / slideSize);

    if (currentIndex !== activeSlide) {
      setActiveSlide(currentIndex);
    }
  };

  return (
    <View style={styles.MainContainer}>
      {/* Skip Button */}
      {activeSlide < OnboardingData.length - 1 && (
        <TouchableOpacity
          onPress={handleSkip}
          style={[
            styles.SkipView,
            {position: 'absolute', top: 20, left: 20, zIndex: 10},
          ]}>
          <Text type="medium" style={styles.SkipText}>
            Skip
          </Text>
        </TouchableOpacity>
      )}

      {/* Next Button */}
      {activeSlide < OnboardingData.length - 1 && (
        <TouchableOpacity onPress={handleNext} style={styles.NextBtnView}>
          <Text type="medium" style={styles.NextBtnText}>
            Next
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={OnboardingData}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        getItemLayout={(data, index) => ({
          length: styles.container.width,
          offset: styles.container.width * index,
          index,
        })}
      />

      {/* Get Started Button */}
      {activeSlide === OnboardingData.length - 1 && (
        <CustomButton
          title="Get Started"
          style={styles.GetStartedBtn}
          onPress={handleDone}
        />
      )}
    </View>
  );
};

export default OnboardingScreen;
