import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LoadIcon from '../LoadIcons';
import {InputsWithIconComponentProps} from '../../../interfaces/components/inputs/InputswithIconComponentInterface';
import {
  colorPrimary,
  colorSecondary,
} from '../../../../assests/Styles/GlobalTheme';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
const placeholderColor = 'rgba(0,0,0,0.3)';

const InputwithIconComponent: React.FC<InputsWithIconComponentProps> = ({
  iconFamily,
  iconName,
  iconSize,
  iconStyle,
  iconColor,
  placeholder,
  value,
  id,
  isEditable = true,
  handelTextChange,
  errorString,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPswd, setShowPswd] = useState(false);
  return (
    <View>
      <View
        style={
          errorString
            ? styles.errorContainer
            : isFocus
            ? styles.focusContainer
            : styles.container
        }>
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
          editable={isEditable}
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          secureTextEntry={
            id === 'password' || id === 'confirmPassowrd' ? !showPswd : false
          }
          onChangeText={text => handelTextChange(text, id)}
          placeholderTextColor={placeholderColor}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        {id === 'password' || id === 'confirmPassowrd' ? (
          <TouchableOpacity
            onPress={() => setShowPswd(!showPswd)}
            style={styles.eyeIconContainer}>
            {
              <LoadIcon
                iconFamily="Ionicons"
                iconName={showPswd ? 'eye' : 'eye-off'}
                size={iconSize}
                style={{}}
                color={colorSecondary}
              />
            }
          </TouchableOpacity>
        ) : null}
      </View>
      {errorString ? (
        <View style={styles.errorStringContainer}>
          <Text style={styles.errorString}>{errorString}</Text>
        </View>
      ) : null}
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
    paddingVertical:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(1.5)
        : responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(2),
  },
  focusContainer: {
    borderWidth: 2,
    borderColor: colorSecondary,
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(1.5)
        : responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(2),
  },
  eyeIconContainer: {
    width: '10%',
    justifyContent: 'center',
  },
  errorContainer: {
    borderWidth: 2,
    borderColor: 'rgba(220,20,60,0.7)',
    flexDirection: 'row',
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(1.5)
        : responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(2),
  },
  iconContainer: {
    width: '10%',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
  },
  errorStringContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  errorString: {
    fontSize: responsiveFontSize(1.9),
    color: 'rgba(220,20,60,0.7)',
  },
});
