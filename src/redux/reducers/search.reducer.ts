import { book } from "../../interfaces/author/book.interface"
import { user } from "../../interfaces/reducer/admin.interface"

const initialState = {
    searchResult: [],
}

interface updateSearchResult {
    type: 'UPDATE_SEARCH_RESULT',
    payload: Array<any>
}

interface resetSearchResult {
    type: 'RESET_SEARCH_RESULT',
}

type action = updateSearchResult | resetSearchResult

const SearchReducer = (state = initialState, action: action) => {
   switch (action.type) {

    case 'UPDATE_SEARCH_RESULT': {
        return {
            ...state,
            searchResult: [...action.payload]
        }
    }

    case 'RESET_SEARCH_RESULT' : {
        return {
            ...state,
            searchResult: []  
        }
    }
   
    default:
        return state;
   }
}

export default SearchReducer;

export const UpdateSearchResult = (searchResult: Array<user | book>):updateSearchResult => {
   return {
    type: 'UPDATE_SEARCH_RESULT',
    payload: searchResult
   }
}

export const ResetSearchResult = ():resetSearchResult => {
   return {
    type: 'RESET_SEARCH_RESULT'
   }
}
