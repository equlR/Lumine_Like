import {View, Image, TouchableOpacity} from 'react-native';
import {useStyle} from './style';
import {IMAGES} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import Text from '../CustomText';

const styles = useStyle();

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.HeaderMain}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tab', {screen: 'Home'})}>
        <Image source={IMAGES.Logo} style={styles.MainLogo} />
      </TouchableOpacity>
      <Text type="bold" style={styles.LumineText}>
        LUMINE
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tab', {screen: 'UserProfile'})}>
        <Image source={IMAGES.HeaderProfileImage} style={styles.ProfileLogo} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
