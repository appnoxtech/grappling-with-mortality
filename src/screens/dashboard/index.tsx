import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../components/homepages/Profile/HeaderComponent';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import OverviewCard from '../../components/dashboard/OverviewCard';
import UserProfileOverView from '../../components/dashboard/AuthorCountOverView';
import useAdminServiceHandlers from '../../hooks/AdminServiceHandlers/AdminServiceHandlerHooks';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../interfaces/reducer/state';
import PendingVerificationBookListComponent from '../../components/dashboard/PendingVerificationBookList';
import {TextInput} from 'react-native';
import ButtonPrimary from '../../components/common/buttons/ButtonPrimary';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LoadingScreen from '../common/LoadingScreen';
import { UpdateBottomNavigationDisplayProperty } from '../../redux/reducers/commonReducer';

const Dashboard = () => {
  const {
    GetUserListServiceHandler,
    GetAuthorListServiceHandler,
    GetPendingVerificationBookListServiceHandler,
    UpdatePendingBookStatusServiceHandler,
  } = useAdminServiceHandlers();
  const {selectedBook} = useSelector((state: store) => state.author);
  const {userList, authorList} = useSelector((store: store) => store.admin);
  const [showDialog, setShowDialog] = useState(false);
  const [reason, setReason] = useState('');
  const [errMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    GetUserListServiceHandler();
    GetAuthorListServiceHandler();
    GetPendingVerificationBookListServiceHandler();
  }, []);

  const handelBookRejectBtnPress = async () => {
    if (reason) {
      if (selectedBook._id) {
        await UpdatePendingBookStatusServiceHandler({
          bookId: selectedBook._id,
          publishStatus: 'REJECTED',
          reason,
        });
        dispatch(UpdateBottomNavigationDisplayProperty('flex'));
        setShowDialog(false);
        setReason('');
      }
    } else {
      setErrorMsg('Required !');
    }
  };

  const handelTextChange = (text: string) => {
    if (text) {
      setReason(text);
      setErrorMsg('');
    } else {
      setReason(text);
      setErrorMsg('Required !');
    }
  };

  return (
    <>
      {showDialog ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.dialogContainer}>
          <StatusBar
            animated={true}
            backgroundColor={'rgba(0,0,0,0.7)'}
            barStyle={'default'}
            showHideTransition={'slide'}
          />
            <View style={styles.dialogBox}>
              <Text style={styles.textPrimary}>Reason</Text>
              <TextInput
                value={reason}
                onChangeText={text => handelTextChange(text)}
                style={[
                  styles.reasonInput,
                  {borderColor: errMsg ? 'red' : 'rgba(0,0,0,0.5)'},
                ]}
                multiline={true}
              />
              {errMsg ? (
                <Text
                  style={{
                    color: 'red',
                    marginTop: responsiveScreenHeight(0.5),
                    textAlign: 'right',
                  }}>
                  {errMsg}
                </Text>
              ) : null}
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  onPress={handelBookRejectBtnPress}
                  style={[styles.actionBtn, {backgroundColor: 'green'}]}>
                  <Text style={styles.actionBtnText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(UpdateBottomNavigationDisplayProperty('flex'));
                    setShowDialog(false);
                    setReason('');
                  }}
                  style={[styles.actionBtn, {backgroundColor: 'red'}]}>
                  <Text style={styles.actionBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <LoadingScreen>
          <View style={styles.container}>
            <HeaderComponent title="Dashboard" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.body}>
              <OverviewCard />
              <UserProfileOverView
                type={'CUSTOMER'}
                title={'Users'}
                data={userList.slice(0, 3)}
              />
              <UserProfileOverView
                type={'AUTHOR'}
                title={'Authors'}
                data={authorList.slice(0, 3)}
              />
              <PendingVerificationBookListComponent
                setShowDialog={setShowDialog}
              />
            </ScrollView>
          </View>
        </LoadingScreen>
      )}
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialogContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3),
    marginVertical: responsiveScreenHeight(2),
  },
  dialogBox: {
    width: responsiveScreenWidth(80),
    borderRadius: responsiveScreenHeight(1.5),
    paddingVertical: responsiveScreenHeight(2),
    backgroundColor: 'white',
    paddingHorizontal: responsiveScreenWidth(2),
  },
  textPrimary: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.7,
  },
  reasonInput: {
    marginTop: responsiveScreenHeight(2),
    height: responsiveScreenHeight(8),
    borderWidth: 1,
    borderRadius: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(3),
    paddingTop: responsiveScreenHeight(1),
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(3),
    marginBottom: responsiveScreenHeight(1),
    paddingVertical: responsiveScreenHeight(1),
    justifyContent: 'space-around',
  },
  actionBtn: {
    width: '100%',
    height: responsiveScreenHeight(5.5),
    paddingHorizontal: responsiveScreenWidth(11),
    paddingVertical: responsiveScreenHeight(1.5),
    borderRadius: responsiveScreenHeight(1),
  },
  actionBtnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});
