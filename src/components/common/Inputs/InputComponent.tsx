import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {inputComponentProps} from '../../../interfaces/components/inputs/inputComponent';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
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
  keyboardType = 'text',
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={[containerStyle, styles.textInputContainer]}
        placeholder={placeholder}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        value={value?.toString()}
        multiline={allowMultiLine}
        inputMode={keyboardType}
        onChangeText={text => {
          if (keyboardType === 'numeric') {
            if(text){
              onChangeHandler(parseInt(text, 10), id);
            }else {
              onChangeHandler('', id);
            }
          } else {
            onChangeHandler(text, id);
          }
        }}
      />
      <View style={styles.errorStringContainer}>
        {error ? <Text style={styles.errorString}>{error}</Text> : null}
      </View>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: responsiveScreenHeight(0.5),
    width: '100%'
  },
  textInputContainer: {
    borderRadius: responsiveScreenWidth(2),
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.23)',
    width: '100%',
    marginBottom: 3,
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
    width: '100%',
    alignItems: 'flex-end',
  },
  errorString: {
    fontSize: responsiveFontSize(1.9),
    color: 'rgba(220,20,60,0.7)',
  },
});
