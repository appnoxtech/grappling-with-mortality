import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { white } from '../../../../assests/Styles/GlobalTheme'

const Discover = () => {
  return (
    <View style={styles.container}>
      <Text>Discover</Text>
    </View>
  )
}

export default Discover

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white
    }
})