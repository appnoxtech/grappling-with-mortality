import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/Homepages/Discover/HeaderComponent'
import { responsiveScreenHeight } from 'react-native-responsive-dimensions'
import AdvertisementSectionComponent from '../../components/Homepages/Discover/AdvertisementSectionComponent'
import GenereListComponents from '../../components/Homepages/Discover/GenereListComponents'
import ContinueListeningComponent from '../../components/Homepages/Discover/ContinueListeningComponent'

const Discover = () => {
  return (
     <View style={styles.container}>
        <HeaderComponent />
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View>
               <AdvertisementSectionComponent />
            </View>
            <View>
               <GenereListComponents />
            </View>
            <View>
                <ContinueListeningComponent />
            </View>
        </ScrollView>
     </View>
  )
}

export default Discover

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 1,
        paddingVertical: responsiveScreenHeight(3)
    }
})