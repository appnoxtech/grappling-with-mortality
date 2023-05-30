import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { white } from '../../../assests/Styles/GlobalTheme';
import {useNavigation} from '@react-navigation/core';
import ButtonPrimary from '../common/buttons/ButtonPrimary';
import HeaderComponent from '../homepages/Discover/HeaderComponent';

const Labels = {
    primary: 'Add your own Book',
    btn: 'Get Started!'
};

const AddNewBookComponent = () => {
  const navigation = useNavigation();
  const handelBtnPress = () => {
    navigation.navigate('AddNewBook' as never)
  };

  return (
    <View style={styles.conatiner}>
        <HeaderComponent />
       <View style={styles.primaryLabelContainer}>
          <Text style={styles.primaryLabel}>{Labels.primary}</Text>
       </View>
       <View style={styles.btnContainer}>
          <ButtonPrimary label={Labels.btn} handleBtnPress={handelBtnPress}  />
       </View>
    </View>
  );

};

export default AddNewBookComponent;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: white,
    },
    primaryLabel: {
        fontSize: responsiveFontSize(4),
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    primaryLabelContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        marginVertical: responsiveScreenHeight(2),
        paddingHorizontal: responsiveScreenWidth(5.5),
        justifyContent: 'center',
        alignItems: 'center'
    }
});