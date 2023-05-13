import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {white} from '../../../../assests/Styles/GlobalTheme';

const Data = [
  {
    id: '2343',
    title: 'Get Audio Books',
    subTitle: 'Lorem ipsum dolor sit amet consectur.',
    bgColor: 'rgba(246, 105, 205,0.5)',
    imgPath: '',
  },
  {
    id: '0980',
    title: 'Buy books',
    subTitle: 'Lorem ipsum dolor sit amet consectur.',
    bgColor: '#52B2BF',
    imgPath: '',
  },
];

interface ItemProps {
  item: {
    id: string;
    title: string;
    subTitle: string;
    bgColor: string;
    imgPath: string;
  };
}

const RenderItem: React.FC<ItemProps> = ({item}) => {
  return (
    <View style={[styles.card, {backgroundColor: item.bgColor}]}>
      <View style={styles.cardItemLeftContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
        <TouchableOpacity style={styles.cardBtn}>
          <Text style={styles.cardBtnText}>Explore Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AdvertisementSectionComponent = () => {
  return (
    <ScrollView 
      contentContainerStyle={styles.contentContainer}
      style={styles.listStyle}
      horizontal 
      showsHorizontalScrollIndicator={false}
    >
      {Data.map(item => (
        <React.Fragment key={item.id}>
            <RenderItem item={item} />
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

export default AdvertisementSectionComponent;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(3),
    paddingHorizontal: responsiveScreenWidth(2),
    height: responsiveScreenHeight(17)
  },
  listStyle: {
  },
  card: {
    width: responsiveScreenWidth(75),
    paddingHorizontal: responsiveScreenWidth(3),
    borderRadius: responsiveScreenWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardItemLeftContainer: {
    paddingVertical: responsiveScreenHeight(1.5),
    width: '70%',
  },
  cardBtn: {
    width: responsiveScreenWidth(40),
    marginTop: responsiveScreenHeight(1),
    paddingVertical: responsiveScreenHeight(1.5),
    borderRadius: responsiveScreenWidth(5),
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  cardBtnText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: white,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: white,
  },
  cardSubTitle: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: white,
  },
});
