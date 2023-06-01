import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'

const data = [
    {
        message: 'Robin Sharma raised an book approval request.',
        date: '2 days ago'
    }, 
    {
        message: 'You have not listen a new book from the last 5 days. Get new launched collection.',
        date: '3 days ago'
    }
]
const NotificationListContainer = () => {
  return (
    <View style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer} style={styles.notificationListContainer}>
          {
            data.map(item => {
                return (
                    <View>
                        
                    </View>
                )
            })
          }
       </ScrollView>
    </View>
  )
}

export default NotificationListContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notificationListContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: responsiveScreenWidth(4)
    }
})