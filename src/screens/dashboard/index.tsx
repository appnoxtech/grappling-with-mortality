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

const Users = [
  {
    id: '1123dvdv',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    name: 'Gladyce',
  },
  {
    id: '1223dsffd',
    img: 'https://images.unsplash.com/photo-1656408455261-e7e915a3285c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1430&q=80',
    name: 'Jim Flores',
  },
  {
    id: 'duhfhue99',
    img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    name: 'Christan',
  },
];

const Author = [
  {
    id: 'ygfi80988',
    img: 'https://harsha-temp.s3.ap-south-1.amazonaws.com/appnox/Grappling_With_Mortality/BA6C097F_E0AA_4CE6_A709_747A5C2CE7BF_1682689990478.jpg',
    name: 'Sky'
  },
  {
    id: 'sdhvidsuh23738',
    img: 'https://harsha-temp.s3.ap-south-1.amazonaws.com/appnox/Grappling_With_Mortality/67458A9C_17F9_401A_9A14_D3D9D375FC51_1683546949662.jpg',
    name: 'Colleen'
  },
  {
    id: 'fewer4354',
    img: 'https://harsha-temp.s3.ap-south-1.amazonaws.com/appnox/Grappling_With_Mortality/95BB7359_ADAE_46A9_9203_FD13DE46C97B_1683007757316.jpg',
    name: 'Robin'
  }
]

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
          <UserProfileOverView type={'CUSTOMER'} title={"User's"} data={userList.slice(0,3)}  />
          <UserProfileOverView type={'AUTHOR'} title={"Author's"} data={authorList.slice(0,3)}  />
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