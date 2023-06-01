import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { colorSecondary } from '../../../../assests/Styles/GlobalTheme';

const BookDescription = () => {
  const {selectedBookDetails} = useSelector((state: any) => state.author);

  console.log('selectedBookDetails.authorImage',selectedBookDetails.authorImage);
  
  return (
    <View style={styles.container}>
      <Text style={styles.textPrimary}>Description</Text>
      <ScrollView style={styles.bookDescriptionContainer}>
         <Text style={styles.bookDescription}>
            {selectedBookDetails?.description}
         </Text>
      </ScrollView>
      <View style={ Platform.OS === 'android' ? styles.androidAuthorDetailsContainer : styles.authorDetailsContainer}>
        <Text style={styles.textPrimary}>Author Info</Text>
        <View style={styles.authorDetails}>
             <View style={styles.leftContainer}>
                 <Image style={styles.authorImage} source={{uri: selectedBookDetails.authorImage}} />
                 <Text style={styles.authorName}>{selectedBookDetails?.authorName}</Text>
             </View>
             {/* <TouchableOpacity style={styles.btnTextContainer}>
               <Text style={styles.btnText}>View Profile</Text>
             </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}

export default BookDescription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: responsiveScreenWidth(2)
    },
    textPrimary: {
        fontSize: responsiveFontSize(2.4),
        fontWeight: 'bold',
        letterSpacing: 0.3,
        color: 'black'
    },
    bookDescriptionContainer: {
        flex: 1,
        marginVertical: responsiveScreenHeight(1),
    },
    bookDescription: {
        fontSize: responsiveFontSize(2),
        color: 'rgba(0,0,0,0.3)',
        fontWeight: '600'
    },
    authorDetailsContainer: {
        marginBottom: responsiveScreenHeight(10),
        marginTop: responsiveScreenHeight(1),
    },
    androidAuthorDetailsContainer: {
        marginBottom: responsiveScreenHeight(7),
        marginTop: responsiveScreenHeight(0),
    },
    authorDetails: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: responsiveScreenHeight(1.5)
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: responsiveScreenWidth(3)
    },
    authorImage: {
        resizeMode: 'cover',
        width: responsiveScreenWidth(15),
        height: responsiveScreenWidth(15),
        borderRadius: responsiveScreenWidth(15),
    },
    authorName: {
        marginTop: responsiveScreenHeight(0.5),
        fontSize: responsiveFontSize(2.3),
        letterSpacing: 0.5,
        fontWeight: '600',
    },
    btnText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: '600',
        color: colorSecondary
    },
    btnTextContainer: {
        marginTop: responsiveScreenHeight(0.5)
    }
})