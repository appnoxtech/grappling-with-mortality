import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {white} from '../../../../assests/Styles/GlobalTheme';
import BookDescription from './BookDescription';
import BookChaptersDeatils from './BookChaptersDeatils';
import AudioBook from './AudioBook';

const navList = ['About', 'Chapters', 'Audio'];

interface NavItemProps {
  nav: string;
  crrState: string;
  setSelected(state: string): void;
}

const NavItemComponent: React.FC<NavItemProps> = ({
  nav,
  crrState,
  setSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setSelected(nav)}
      style={crrState === nav ? styles.selectedNavItem : styles.navItem}>
      <Text style={styles.navText}>{nav}</Text>
    </TouchableOpacity>
  );
};
const BookDetailsNavigation = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('About');
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        {navList.map((nav, index) => (
          <React.Fragment key={index}>
            <NavItemComponent
              nav={nav}
              crrState={selectedNavItem}
              setSelected={setSelectedNavItem}
            />
          </React.Fragment>
        ))}
      </View>
      <View style={styles.navItemBody}>
        {selectedNavItem === navList[0] ? (
          <BookDescription />
        ) : selectedNavItem === navList[1] ? (
          <BookChaptersDeatils />
        ) : (
          <AudioBook />
        )}
      </View>
    </View>
  );
};

export default BookDetailsNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    marginTop: responsiveScreenHeight(2),
    width: responsiveScreenWidth(90),
    borderRadius: responsiveFontSize(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
    alignItems: 'center',
    backgroundColor: 'rgba(128,128,128,0.2)',
    padding: responsiveScreenHeight(0.2),
  },
  selectedNavItem: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 10,
    paddingVertical: responsiveScreenHeight(1.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: responsiveScreenHeight(1.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
    letterSpacing: 0.4,
    color: 'black',
  },
  navItemBody: {
    paddingVertical: responsiveScreenHeight(2),
  },
});
