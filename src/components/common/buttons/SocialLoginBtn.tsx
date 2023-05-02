import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { GOOGLE_CLIENT_ID } from '@env';
import {Alert} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {colorGrey, colorPrimary, colorSecondary, white} from '../../../../assests/Styles/GlobalTheme';
import { useDispatch } from 'react-redux';
import useSocialAuthHook from '../../../hooks/AuthHooks/SocialLoginHook';
import { ssoData } from '../../../interfaces/auth/authServiceInterface';
import { SsoService } from '../../../services/auth/AuthService';

interface props {
  label: string;
  type: string;
}

const path = '../../../../assests/images/google.png'

const SocialLoginBtn: React.FC<props> = ({label, type}) => {
  const dispatch = useDispatch();
  const SocialAuthenticationServiceHandler = useSocialAuthHook();


  const handlePress = async() => {
    if (type === 'facebook') {
      loginFacebook();
    } else {
      googleSignIn();
    }
  };

  const loginFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data: any) => {
            let accessToken = data.accessToken;
            console.log(accessToken.toString());
  
            const responseInfoCallback = (error: any, result: any) => {
              if (error) {
                console.log('Error fetching data: ' + error.toString());
              } else {
                const FB_USER_CRED = {
                  SSO: 'FACEBOOK',
                  name: result.name as string,
                  userName: result.first_name as string,
                  facebookId: parseInt(result.id, 10) as number,
                };
                // SocialAuthenticationServiceHandler(FB_USER_CRED);
              }
            };
  
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );
  
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error: any) {
        console.log('Login fail with error: ' + error);
      },
    );
  };


  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      const data = {
        email: userInfo.user.email,
        SSO: 'GOOGLE',
        googleId: parseInt(userInfo.user.id, 10),
        fullName: userInfo.user.name,
        image: userInfo.user.photo,
      };
      SocialAuthenticationServiceHandler(data);
    } catch (error: any) {
      console.log('Message', error.message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.btnContainer}>
          <View style={styles.btnImageContainer}>
            {type === 'google' ? (
              <Image
                source={require(path)}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <FontAwesome
                name="facebook-official"
                style={styles.icon}
                color={'#1877f2'}
              />
            )}
          </View>
          <View style={styles.btnTextContainer}>
            <Text style={styles.btnText}>{label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginBtn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: responsiveScreenHeight(1),
    paddingVertical: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: '100%', width: '100%'},
  btnContainer: {
    width: '100%',
    borderRadius: responsiveScreenWidth(2),
    backgroundColor: white,
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(128,128,128,0.5)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnImageContainer: {
    width: responsiveScreenWidth(8),
    height: responsiveScreenHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingStart: responsiveScreenWidth(3),
  },
  btnText: {
    // fontFamily: 'NunitoSans-Bold',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: 'rgba(0,0,0,0.7)',
  },
  icon: {
    fontSize: responsiveFontSize(3),
  },
});
