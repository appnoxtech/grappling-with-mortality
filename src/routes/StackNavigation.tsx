import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserData} from '../redux/reducers/userReducer';
import { getUserDataFromLocalStorage } from '../utils/helperFunctions/auth';
import UnAuthRoutes from './unAuthRoutes';
import UserRoutes from './userRoutes';
import AuthorRoutes from './authorRoutes';
import AdminRoutes from './adminRoutes';

const StackNavigation = () => {
  const {isLogin, userDetails} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleIsLoginState = async () => {
    const data = await getUserDataFromLocalStorage();
    if (data) {
      dispatch(updateUserData(true));
    } else {
      dispatch(updateUserData(false));
    }
  };

  useEffect(() => {
    handleIsLoginState();
  }, []);

  if (isLogin) {
    if(userDetails.userType === 'CUSTOMER') {
      return <UserRoutes />;
    }else if(userDetails.userType === 'AUTHOR') {
      return <AuthorRoutes />;
    }else if(userDetails.userType === 'ADMIN') {
      return <AdminRoutes />
    }
  } else {
    return <UnAuthRoutes />;
  }
};

export default StackNavigation;
