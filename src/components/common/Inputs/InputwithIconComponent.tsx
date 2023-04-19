import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';
import LoadIcon from '../LoadIcons';
import {InputsWithIconComponentProps} from '../../../interfaces/components/inputs/InputswithIconComponentInterface';
import {colorGrey, colorSecondary, grey} from '../../../../assests/Styles/GlobalTheme';
import {
    responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const InputwithIconComponent: React.FC<InputsWithIconComponentProps> = ({
  iconFamily,
  iconName,
  iconSize,
  iconStyle,
  iconColor,
  placeholder,
  value,
  id,
  handelTextChange,
  errorString,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={isFocus ? styles.focusContainer : styles.container}>
      <View style={styles.iconContainer}>
        <LoadIcon
          color={iconColor}
          iconFamily={iconFamily}
          iconName={iconName}
          size={iconSize}
          style={iconStyle}
        />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={text => handelTextChange(text, id)}
        placeholderTextColor={'rgba(0,0,0,0.3)'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

export default InputwithIconComponent;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#F6F6F6',
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1.5),
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(2)
  },
  focusContainer: {
    borderWidth: 2,
    borderColor: colorSecondary,
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1.8),
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(2)
  },
  iconContainer: {
    width: '10%',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600'
  },
});
