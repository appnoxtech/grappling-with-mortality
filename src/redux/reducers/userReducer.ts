interface user {
  isLogin: boolean,
  userDetails: any,
}

interface item {_id: string, isLiked: boolean, likeCount: number, messageCount: number};

const initialState:user  = {
  isLogin: true,
  userDetails: {},
};

interface UpdateAction {
  type: 'UPDATE_USER_DATA';
  payload: boolean;
}

interface updateUserDetails {
  type: 'UPDATE_USER_DETAILS',
  payload: user
}


type action = UpdateAction | updateUserDetails;

const UserReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        ...state,
        isLogin: action.payload,
      };
    }

    case 'UPDATE_USER_DETAILS': {
      return {
        ...state,
        userDetails: {...action.payload}
      }
    }

    default:
      return state;
  }
};

export default UserReducer;

export const updateUserData = (isLogin: boolean): UpdateAction => {
  return {
    type: 'UPDATE_USER_DATA',
    payload: isLogin,
  };
};

export const updateUserDetails = (data: user): updateUserDetails => {
   return {
     type: 'UPDATE_USER_DETAILS',
     payload: data,
   }
}

export const updateLocalActivityList = (data: any) => {
  return {
    type: 'UPDATE_LOCAL_ACTIVITY_LIST',
    payload: data
  }
}