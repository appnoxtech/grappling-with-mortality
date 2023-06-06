import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { white } from '../../../assests/Styles/GlobalTheme'

const PendingVerificationBookList = () => {
  return (
    <View style={styles.container}>
      <Text>PendingVerificationBookList</Text>
    </View>
  )
}

export default PendingVerificationBookList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    }
})