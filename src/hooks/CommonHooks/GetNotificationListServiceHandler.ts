import {useDispatch} from 'react-redux';
import {
  DeleteNotificationItemService,
  GetNotificationListService,
} from '../../services/user/GetNotificationListService';
import {UpdateNotificationList} from '../../redux/reducers/userReducer';
import {SetIsLoadingState} from '../../redux/reducers/commonReducer';
import {Alert} from 'react-native';

const useHandelNotificationServices = () => {
  const dispatch = useDispatch();

  const GetNotificationListServiceHandler = async () => {
    try {
      dispatch(SetIsLoadingState(true));
      const res = await GetNotificationListService();
      const {data} = res.data;
      dispatch(SetIsLoadingState(false));
      if (data.length) {
        dispatch(UpdateNotificationList(data));
      } else {
        dispatch(UpdateNotificationList([]));
      }
    } catch (error: any) {
      dispatch(SetIsLoadingState(false));
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };

  const RemoveNotificationItemServiceHandler = async (
    notificationId: string,
  ) => {
    try {
      dispatch(SetIsLoadingState(true));
      await DeleteNotificationItemService(notificationId);
      await GetNotificationListServiceHandler();
      dispatch(SetIsLoadingState(false));
    } catch (error: any) {
      dispatch(SetIsLoadingState(false));
      Alert.alert('Error', error.response.data.errors[0].message);
    }
  };

  return {
    GetNotificationListServiceHandler,
    RemoveNotificationItemServiceHandler,
  };
};

export default useHandelNotificationServices;
