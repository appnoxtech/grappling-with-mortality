import {book} from '../../interfaces/author/book.interface';

const initialState = {
  isLoading: false,
  bookList: [],
  authorBookList: [],
  showEditorOptions: false, // used to hide and show Editing options in Book details Page
  bottomNavigationDisplayProperty: 'flex', // used to hide and show Bottom Nav
  bookDetailsPageNavItem: 'About', // used to handel nav item in MyBook details page
};

interface setIsLoading {
  type: 'SET_IS_LOADING_STATE';
  payload: boolean;
}

interface updateBookList {
  type: 'UPDATE_BOOK_LIST';
  payload: Array<book>;
}

interface updateShowEditorOptions {
  type: 'UPDATE_SHOW_EDITOR_OPTIONS';
  payload: boolean;
}

interface updateBottomNavigationDisplayProperty {
  type: 'UPDATE_BOTTOM_NAVIGATION_DISPLAY_PROPERTY';
  payload: 'flex' | 'none';
}

interface updateBookDetailPageNavItem {
  type: 'UPDATE_BOOK_DETAILS_PAGE_NAV_ITEM';
  payload: 'About' | 'Chapters' | 'Audio';
}

type action =
  | setIsLoading
  | updateBookList
  | updateShowEditorOptions
  | updateBottomNavigationDisplayProperty
  | updateBookDetailPageNavItem;

const CommonReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case 'SET_IS_LOADING_STATE': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case 'UPDATE_BOOK_LIST': {
      return {
        ...state,
        bookList: [...action.payload],
      };
    }

    case 'UPDATE_SHOW_EDITOR_OPTIONS': {
      return {
        ...state,
        showEditorOptions: action.payload,
      };
    }

    case 'UPDATE_BOTTOM_NAVIGATION_DISPLAY_PROPERTY': {
      return {
        ...state,
        bottomNavigationDisplayProperty: action.payload,
      };
    }

    case 'UPDATE_BOOK_DETAILS_PAGE_NAV_ITEM': {
      return {
        ...state,
        bookDetailsPageNavItem: action.payload,
      };
    }

    default:
      return state;
  }
};

export default CommonReducer;

export const SetIsLoadingState = (state: boolean): setIsLoading => {
  return {
    type: 'SET_IS_LOADING_STATE',
    payload: state,
  };
};

export const UpdateGetAllBookList = (bookList: Array<book>): updateBookList => {
  return {
    type: 'UPDATE_BOOK_LIST',
    payload: bookList,
  };
};

export const UpdateShowEditorOptions = (
  state: boolean,
): updateShowEditorOptions => {
  return {
    type: 'UPDATE_SHOW_EDITOR_OPTIONS',
    payload: state,
  };
};

export const UpdateBottomNavigationDisplayProperty = (
  property: 'flex' | 'none',
): updateBottomNavigationDisplayProperty => {
  return {
    type: 'UPDATE_BOTTOM_NAVIGATION_DISPLAY_PROPERTY',
    payload: property,
  };
};

export const UpdateBookDetailPageNavItem = (
  currNav: 'About' | 'Chapters' | 'Audio',
): updateBookDetailPageNavItem => {
  return {
    type: 'UPDATE_BOOK_DETAILS_PAGE_NAV_ITEM',
    payload: currNav,
  };
};
