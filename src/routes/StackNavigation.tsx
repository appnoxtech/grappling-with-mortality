import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserData} from '../redux/reducers/userReducer';
import { getUserDataFromLocalStorage } from '../utils/helperFunctions/auth';
import AuthRoutes from './authRoutes';
import UnAuthRoutes from './unAuthRoutes';

const StackNavigation = () => {
  const {isLogin} = useSelector((state: any) => state.user);
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
    return <AuthRoutes />;
  } else {
    return <UnAuthRoutes />;
  }
};

export default StackNavigation;
