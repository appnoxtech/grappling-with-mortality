import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LoadIcon from '../../../components/common/LoadIcons';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import ButtonPrimary from '../../../components/common/buttons/ButtonPrimary';

const DocumentPicker = () => {
  const [pdfLink, setPdfLink] = useState('');
  const handleBtnPress = () => {

  }
  return <View>{pdfLink ? <View style={styles.container}>
   <View style={styles.bookPlaceholder}>
      <LoadIcon iconFamily='Entypo' iconName='book' style={{}} size={responsiveFontSize(20)} color='rgba(128,128,128,0.5)' />
    </View>
   <View style={styles.btnContainer}>
     <ButtonPrimary label='Select Book' handleBtnPress={handleBtnPress} />
   </View>
  </View> : <View style={styles.container}></View>}</View>;
};

export default DocumentPicker;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: responsiveScreenWidth(80),
    },
    bookPlaceholder: {
        width: responsiveScreenWidth(50),
        height: responsiveScreenHeight(30),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'rgba(128,128,128,0.5)'
    }
});
