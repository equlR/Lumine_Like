import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useStyle} from './style';
import Text from '../CustomText';
const styles = useStyle();

const CustomMenu = ({visible, onClose, options}) => {
  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={onClose}>
      <View style={styles.menuContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index === options.length - 1 && styles.lastMenuItem,
            ]}
            onPress={() => {
              option.onPress();
              onClose();
            }}>
            <Text style={[styles.menuText, option.danger && styles.dangerText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default CustomMenu;
