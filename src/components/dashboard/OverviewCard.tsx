import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {colorPrimary, grey, mainColor, white} from '../../../assests/Styles/GlobalTheme';

const TextConstant = {
  primaryHeading: 'Overview',
};

const data = [
  {
    id: 'wfefewf',
    title: 'Customer',
    count: 1024,
    bg: 'white'
  },
  {
    id: 'sge4e',
    title: 'Author',
    count: 256000,
    bg: 'rgba(0,0,0,0.05)'
  },
];

const OverviewCard = () => {
  const renderCount = (count: number) => {
     if(count > 9999){
        const num = count / 1000;
        return `${num}k`
     }else {
        return `${count}`
     }
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardheader}>
        <View style={styles.rectangle}></View>
        <View style={styles.primaryHeadingContainer}>
          <Text style={styles.primaryHeading}>
            {TextConstant.primaryHeading}
          </Text>
        </View>
      </View>
      <View style={styles.countMainContainer}>
        {data?.map(item => {
          return (
            <View key={item.id} style={[styles.countContainer, {backgroundColor: item.bg}]}>
              <Text style={styles.countTitle}>{item.title}</Text>
              <View style={styles.cardCountContainer}>
                 <Text style={styles.count}>{renderCount(item.count)}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default OverviewCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
    backgroundColor: white,
  },
  cardheader: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(3),
    marginBottom: responsiveScreenHeight(2),
  },
  rectangle: {
    width: responsiveScreenHeight(2),
    height: responsiveScreenHeight(4),
    backgroundColor: colorPrimary,
    borderRadius: responsiveScreenHeight(0.8),
  },
  primaryHeading: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 0.7,
  },
  primaryHeadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countMainContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: responsiveScreenHeight(2),
    flexDirection: 'row',
    gap: 10
  },
  countContainer: {
    flex: 1,
    borderRadius: responsiveScreenHeight(2),
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  countTitle: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    opacity: 0.8,
    fontWeight: '500',
    letterSpacing: 0.5
  },
  cardCountContainer: {
    marginVertical: responsiveScreenHeight(1),
    justifyContent: 'center',
    alignItems: 'center'
  },
  count: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
  }
});
