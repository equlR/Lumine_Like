import {TouchableOpacity, Image, View, ActivityIndicator} from 'react-native';
import {useStyle} from './style';
import COLORS from '../../utils/colors';
import Text from '../CustomText';

const styles = useStyle();

const CustomButton = ({
  title,
  bgColor,
  textColor,
  onPress,
  style,
  prefixLogo,
  postfixLogo,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={!loading ? onPress : null}
      disabled={loading}
      activeOpacity={loading ? 1 : 0.7}
      style={[
        styles.btnContainer,
        {
          backgroundColor: loading ? COLORS.gray : bgColor || COLORS.primary,
        },
        style,
      ]}>
      <View style={styles.ButtonRow}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <>
            {prefixLogo && (
              <Image source={prefixLogo} style={styles.prefixLogo} />
            )}
            <Text
              type="medium"
              style={[
                styles.btnText,
                {color: textColor ? textColor : COLORS.white},
              ]}>
              {title}
            </Text>
            {postfixLogo && (
              <Image source={postfixLogo} style={styles.postfixLogo} />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
