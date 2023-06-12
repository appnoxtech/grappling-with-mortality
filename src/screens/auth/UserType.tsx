import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colorPrimary, white} from '../../../assests/Styles/GlobalTheme';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import useRegisterHook from '../../hooks/AuthHooks/RegisterHook';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadIcon from '../../components/common/LoadIcons';
import LoadingScreen from '../common/LoadingScreen';
import HeaderWithBackBtn from '../../components/common/headers/HeaderWithBackBtn';

const Heading = `Select\nuser type`;

const images = {
  user: {
    img: require('../../../assests/images/user.jpg'),
    alt: 'user',
  },
  author: {
    img: require('../../../assests/images/author.jpg'),
    alt: 'author',
  },
};

type userType = 'CUSTOMER' | 'AUTHOR';

const icon = {
  iconFamily: 'AntDesign',
  iconName: 'arrowright',
  iconSize: 35,
};

const UserType: React.FC<any> = ({route}) => {
  const {fullName, email, password} = route.params;
  const navigation = useNavigation();
  const [userType, setUserType] = useState<userType>('CUSTOMER');
  const handleRegisterService = useRegisterHook();

  const RegisterUser = () => {
    handleRegisterService({fullName, email, password, userType});
  };

  const handelCardPress = (name: userType) => {
    setUserType(name);
  };

  return (
    <LoadingScreen>
      <View style={styles.container}>
        <HeaderWithBackBtn />
        <View style={{paddingHorizontal: responsiveScreenWidth(4)}}>
          <View style={styles.headerContainer}>
            <Text style={styles.textPrimary}>{Heading}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handelCardPress('CUSTOMER')}
            style={userType === 'CUSTOMER' ? styles.selectedCard : styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={images.user.img}
                alt={images.user.alt}
                style={styles.image}
              />
            </View>
            <View style={styles.cardInfoContainer}>
              <Text
                style={
                  userType === 'CUSTOMER'
                    ? styles.selectedUserType
                    : styles.userType
                }>
                User
              </Text>
            </View>
            {userType === 'CUSTOMER' ? (
              <TouchableOpacity
                onPress={RegisterUser}
                style={styles.btnContainer}>
                <LoadIcon
                  iconFamily={icon.iconFamily}
                  iconName={icon.iconName}
                  color={white}
                  style={{}}
                  size={icon.iconSize}
                />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handelCardPress('AUTHOR')}
            style={userType === 'AUTHOR' ? styles.selectedCard : styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={images.author.img}
                alt={images.author.alt}
                style={styles.image}
              />
            </View>
            <View style={styles.cardInfoContainer}>
              <Text
                style={
                  userType === 'AUTHOR'
                    ? styles.selectedUserType
                    : styles.userType
                }>
                Author
              </Text>
            </View>
            {userType === 'AUTHOR' ? (
              <TouchableOpacity
                onPress={RegisterUser}
                style={styles.btnContainer}>
                <LoadIcon
                  iconFamily={icon.iconFamily}
                  iconName={icon.iconName}
                  color={white}
                  style={{}}
                  size={icon.iconSize}
                />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </LoadingScreen>
  );
};

export default UserType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  headerContainer: {
    marginVertical: responsiveScreenHeight(4),
    paddingHorizontal: responsiveScreenWidth(4),
  },
  textPrimary: {
    fontSize: responsiveFontSize(6),
    color: colorPrimary,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    lineHeight: responsiveFontSize(7.5),
  },
  card: {
    borderRadius: responsiveScreenHeight(3),
    height: responsiveScreenHeight(25),
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
    flexDirection: 'row',
    marginBottom: responsiveScreenHeight(3),
    backgroundColor: white,
  },
  selectedCard: {
    borderRadius: responsiveScreenHeight(3),
    height: responsiveScreenHeight(25),
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
    flexDirection: 'row',
    marginBottom: responsiveScreenHeight(3),
    backgroundColor: white,
    borderWidth: 2,
    borderColor: colorPrimary,
  },
  btnsContainer: {
    paddingVertical: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnContainer: {
    width: '100%',
  },
  imageContainer: {
    width: '50%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardInfoContainer: {
    width: '50%',
    paddingTop: responsiveScreenHeight(3),
    alignItems: 'center',
  },
  userType: {
    fontSize: responsiveFontSize(3.5),
    color: 'black',
    fontWeight: '700',
    opacity: 0.5,
  },
  selectedUserType: {
    fontSize: responsiveFontSize(3.5),
    color: colorPrimary,
    fontWeight: '700',
    opacity: 0.5,
  },
  btnContainer: {
    width: responsiveScreenWidth(13),
    height: responsiveScreenWidth(13),
    borderRadius: responsiveScreenWidth(9),
    backgroundColor: 'rgba(80, 200, 120, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});
