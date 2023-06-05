import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { white } from '../../../assests/Styles/GlobalTheme'
import HeaderComponent from '../../components/homepages/Profile/HeaderComponent'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import OverviewCard from '../../components/dashboard/OverviewCard'
import UserProfileOverView from '../../components/dashboard/AuthorCountOverView'
import useAdminServiceHandlers from '../../hooks/AdminServiceHandlers/AdminServiceHandlerHooks'
import { useSelector } from 'react-redux'
import { store } from '../../interfaces/reducer/state'

const Dashboard = () => {
  const {GetUserListServiceHandler, GetAuthorListServiceHandler} = useAdminServiceHandlers();
  const {userList, authorList} = useSelector((store: store) => store.admin);

  useEffect(() => {
    GetUserListServiceHandler();
    GetAuthorListServiceHandler();
  }, []);

  return (
    <View style={styles.container}>
       <HeaderComponent title='Dashboard' />
       <ScrollView style={styles.body}>
          <OverviewCard />
          <UserProfileOverView type={'CUSTOMER'} title={"Users"} data={userList.slice(0,3)}  />
          <UserProfileOverView type={'AUTHOR'} title={"Authors"} data={authorList.slice(0,3)}  />
       </ScrollView>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(3),
    marginVertical: responsiveScreenHeight(2),
  }
})