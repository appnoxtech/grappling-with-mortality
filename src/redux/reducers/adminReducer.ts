import { book } from "../../interfaces/author/book.interface";
import { AdminStore, user } from "../../interfaces/reducer/admin.interface";

const initialState:AdminStore = {
    userList: [],
    authorList: [],
    pendingVerificationBookList: []
}

interface updateUserList {
   type: 'UPDATE_USER_LIST',
   payload: Array<user>
}

interface updateAuthorList {
    type: 'UPDATE_AUHTOR_LIST',
    payload: Array<user>
}

interface updatePendingVerificationBookList {
    type: 'UPDATE_PENDING_VERIFICATION_BOOK_LIST',
    payload: Array<book>
}

type action = updateUserList | updateAuthorList | updatePendingVerificationBookList;

const AdminReducer = (state = initialState, action: action) => {
   switch (action.type) {
    case 'UPDATE_AUHTOR_LIST': {
        return {
            ...state,
            authorList: [...action.payload]
        }
    }
    
    case 'UPDATE_USER_LIST': {
        return {
            ...state,
            userList: [...action.payload]
        }
    }

    case 'UPDATE_PENDING_VERIFICATION_BOOK_LIST': {
        return {
            ...state,
            pendingVerificationBookList: [...action.payload]
        }
    }
   
    default:
        return state;
   }
}

export default AdminReducer;

export const UdateUserList = (userList: Array<user>):updateUserList => {
  return {
    type: 'UPDATE_USER_LIST',
    payload: userList
  }
};

export const UpdateAuthorList = (authorList: Array<user>):updateAuthorList => {
    return {
        type: 'UPDATE_AUHTOR_LIST',
        payload: authorList
    }
}

export const UpdatePendingVerificationBookList = (bookList: Array<book>): updatePendingVerificationBookList => {
   return {
     type: 'UPDATE_PENDING_VERIFICATION_BOOK_LIST',
     payload: bookList
   }
}