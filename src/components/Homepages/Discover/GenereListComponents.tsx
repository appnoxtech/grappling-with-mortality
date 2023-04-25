import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { white } from '../../../../assests/Styles/GlobalTheme';

const GenereList = [
    {
        title: 'Drama',
        bgColor: '#F2B8C6'
    },
    {
        title: 'History',
        bgColor: '#7A4988'
    },
    {
        title: 'Fantasy',
        bgColor: '#52B2BF'
    },
    {
        title: 'Horror',
        bgColor: '#7F7D9C'
    },
    {
        title: 'Actions',
        bgColor: '#FF8A8A'
    },
    {
        title: 'Mystery',
        bgColor: '#98BF64'
    },
    {
        title: 'Sci-Fi',
        bgColor: '#FDA172'
    },
    {
        title: 'Romance',
        bgColor: '#FC94AF'
    }
];

interface ItemProps {
   item: { 
    title: string,
    bgColor: string
   }
}

const RenderItem: React.FC<ItemProps> = ({item}) => {
   return (
    <View style={[styles.card, {backgroundColor: item.bgColor}]}>
        <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
   )
}

const GenereListComponents = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textPrimary}>Generes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollContainer}
      >
         {
            GenereList.map((genere, index) => (
                <React.Fragment key={index}>
                    <RenderItem item={genere} />
                </React.Fragment>
            ))
         }
      </ScrollView>
    </View>
  )
}

export default GenereListComponents

const styles = StyleSheet.create({
    container: {
        marginTop: responsiveScreenHeight(2),
    },
    textPrimary: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: 'bold',
        paddingHorizontal: responsiveScreenWidth(2),
        color: 'black',
        letterSpacing: 0.3
    },
    contentContainer: {
        gap: responsiveScreenWidth(2.5),
        paddingHorizontal: responsiveScreenWidth(2),
    },
    scrollContainer: {
       paddingVertical: responsiveScreenHeight(1)
    },
    card: {
        minWidth: responsiveScreenWidth(24),
        minHeight: responsiveScreenHeight(8),
        borderRadius: responsiveScreenWidth(2),
        paddingHorizontal: responsiveScreenWidth(3),
        paddingVertical: responsiveScreenHeight(2),
        justifyContent: 'flex-end'
    },
    cardTitle: {
        fontSize: responsiveFontSize(2),
        color: white,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.3
    }
})