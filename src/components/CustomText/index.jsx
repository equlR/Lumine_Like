import React from 'react';
import {Text} from 'react-native';
import {FONTS} from '../../utils/helper';

const CustomText = ({
  children,
  style,
  type = 'regular',
  numberOfLines,
  onPress,
}) => {
  const getFontFamily = () => {
    switch (type.toLowerCase()) {
      case 'black':
        return FONTS.black;
      case 'blackitalic':
        return FONTS.blackItalic;
      case 'light':
        return FONTS.light;
      case 'lightitalic':
        return FONTS.lightItalic;
      case 'medium':
        return FONTS.medium;
      case 'mediumitalic':
        return FONTS.mediumItalic;
      case 'semibold':
        return FONTS.semiBold;
      case 'semibolditalic':
        return FONTS.semiBoldItalic;
      case 'bold':
        return FONTS.bold;
      case 'bolditalic':
        return FONTS.boldItalic;
      case 'extrabold':
        return FONTS.extraBold;
      case 'extrabolditalic':
        return FONTS.extraBoldItalic;
      case 'italic':
        return FONTS.italic;
      default:
        return FONTS.regular;
    }
  };

  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(),
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export default CustomText;
