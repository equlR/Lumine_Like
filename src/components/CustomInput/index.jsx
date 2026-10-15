import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import COLORS from '../../utils/colors';
import {useStyle} from './style';
import {IMAGES} from '../../assets';
import Text from '../CustomText';
import { width } from '../../utils/helper';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  isPassword = false,
  error,
  style,
  autoCapitalize = 'none',
  backgroundColor,
  multiline = false,
  prefixIcon,
  showClearButton,
  onClear,
}) => {
  const [isSecure, setIsSecure] = useState(isPassword);
  const styles = useStyle();

  const renderRightIcon = () => {
    if (isPassword) {
      return (
        <TextInput.Icon
          icon={() => (
            <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
              <Image
                source={isSecure ? IMAGES.eyeOff : IMAGES.eye}
                style={styles.EyeIcon}
              />
            </TouchableOpacity>
          )}
        />
      );
    }

    if (showClearButton && value?.length > 0) {
      return (
        <TextInput.Icon
          icon={() => (
            <TouchableOpacity onPress={onClear}>
              <Image source={IMAGES.closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          )}
        />
      );
    }

    return null;
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        mode="outlined"
        label={<Text type="regular">{placeholder}</Text>}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={isPassword && isSecure}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        style={[
          styles.inputField,
          {backgroundColor},
          multiline && {minHeight: width * 0.35, textAlignVertical: 'top'},
        ]}
        outlineColor={error ? COLORS.error : COLORS.darkGray}
        activeOutlineColor={COLORS.primary}
        left={
          prefixIcon ? (
            <TextInput.Icon
              icon={() => (
                <Image source={prefixIcon} style={styles.PrefixIcon} />
              )}
            />
          ) : null
        }
        right={renderRightIcon()}
        theme={{
          colors: {
            text: COLORS.black,
            placeholder: COLORS.darkGray,
          },
          roundness: 10,
        }}
      />
      {error && (
        <Text type="regular" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
