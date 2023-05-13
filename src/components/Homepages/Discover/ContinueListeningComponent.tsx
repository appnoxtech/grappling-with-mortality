import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

const labels = {
    primaryText: 'Continue Listening'
}

const ContinueListeningData = [
    {
        id: '12324',
        bookLogo: '../../',
        bookName: 'I Have a Dream',
        authorName: 'Rashmi Bansal',
        status: 'reading',
        isCompletedStatus: '28', 
    },
    {
        id: '9898',
        bookLogo: '',
        bookName: 'The Perfect us',
        authorName: 'Durjoy Dutta',
        status: 'reading',
        isCompletedStatus: '35', 
    },
    {
        id: 'i7898',
        bookLogo: '',
        bookName: 'The Monk Who Sold Hi...',
        authorName: 'Robin Sharma',
        status: 'reading',
        isCompletedStatus: '10', 
    },
    {
        id: '098098',
        bookLogo: '',
        bookName: '2 States',
        authorName: 'Chetan Bhagat',
        status: 'reading',
        isCompletedStatus: '75', 
    }
];

interface ItemProps {
    item: {
        id: string,
        bookLogo: string,
        bookName: string,
        authorName: string,
        status: string,
        isCompletedStatus: string, 
    }
};


const RenderItem:React.FC<ItemProps> = ({item}) => {
   return (
      <View style={styles.card}>
          
      </View>
   )
}

const ContinueListeningComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{labels.primaryText}</Text>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
         {
            ContinueListeningData.map(item => (
                <React.Fragment key={item.id}>
                    <RenderItem item={item} />
                </React.Fragment>
            ))
         }
      </ScrollView>
    </View>
  )
}

export default ContinueListeningComponent

const styles = StyleSheet.create({
    container: {
       marginTop: responsiveScreenHeight(2),
    },
    heading: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        letterSpacing: 0.3,
        paddingHorizontal: responsiveScreenWidth(2)
    },
    contentContainer: {
        paddingHorizontal: responsiveScreenWidth(2),
        gap: 2,
    },
    card: {
        width: responsiveScreenWidth(60),
        paddingHorizontal: responsiveScreenWidth(2),
        paddingVertical: responsiveScreenHeight(1.5)
    }
})