const initialState = {
    startingPage: 0
}

interface setStartingPageNo {
    type: 'SET_STARTING_PAGE_NUMBER',
    payload: number
}

type action = setStartingPageNo;

const EbookReaderReducer = (state = initialState, action: action) => {
   switch (action.type) {
    case 'SET_STARTING_PAGE_NUMBER': {
        return {
            startingPage: action.payload
        }
    }
   
    default:
        return state;
   }
}

export default EbookReaderReducer;

export const SetStartingPageNumber = (pageNo: number): setStartingPageNo => {
   return {
      type: 'SET_STARTING_PAGE_NUMBER',
      payload: pageNo
   }
}