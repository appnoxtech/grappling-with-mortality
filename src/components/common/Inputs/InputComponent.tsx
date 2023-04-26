import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {inputComponentProps} from '../../../interfaces/components/inputs/inputComponent';
import {responsiveFontSize, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {
  colorSecondary,
  systemGrey,
} from '../../../../assests/Styles/GlobalTheme';

const InputComponent: React.FC<inputComponentProps> = ({
  containerStyle,
  placeholder,
  value,
  error,
  onChangeHandler,
  id,
  allowMultiLine = false,
  keyboardType = 'text'
}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <React.Fragment>
      <TextInput
          style={[containerStyle, styles.textInputContainer,]}
          placeholder={placeholder}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          multiline={allowMultiLine}
          inputMode={keyboardType}
          onChangeText={text => onChangeHandler(text, id)}
        />
      {error ? (
        <View style={styles.errorStringContainer}>
          <Text style={styles.errorString}>{error}</Text>
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  textInputContainer: {
    borderRadius: responsiveScreenWidth(2),
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.23)',
    width: '100%'
  },
  activeTextInputContainer: {
    borderRadius: responsiveScreenWidth(2),
    borderWidth: 1,
    borderColor: colorSecondary,
  },
  errorTextInputContainer: {
    borderRadius: responsiveScreenWidth(2),
    borderWidth: 1,
    borderColor: 'red',
  },
  errorStringContainer: {
    justifyContent:'flex-end',
    alignItems: 'flex-end'
  },
  errorString: {
    fontSize: responsiveFontSize(1.9),
    color: 'rgba(220,20,60,0.7)'
  },
});
