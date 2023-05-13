import {
    Chapter,
  ChapterActions,
  NewChapterData,
  editChapterDetails,
  resetChapterDetails,
  updateChapterDetails,
} from '../../interfaces/author/chapter.interface';

const initialState = {
  newChapter: {
    chapterNo: '',
    chapterName: '',
    startingPageNo: '',
    endingPageNo: '',
  },
  selectedChapter: {
    chapterNo: '',
    chapterName: '',
    startingPageNo: '',
    endingPageNo: '',
  }
};

const ChapterReducer = (state = initialState, action: ChapterActions) => {
  switch (action.type) {
    case 'UPDATE_CHAPTER_DETAILS': {
      return {
        ...state,
        newChapter: {
            ...state.newChapter,
            [action.payload.key]: action.payload.value,
        }
      };
    }

    case 'RESET_CHAPTER_DETAILS': {
      return {
        newChapter: {
          chapterNo: '',
          chapterName: '',
          startingPageNo: '',
          endingPageNo: '',
        },
      };
    }

    case 'EDIT_CHAPTER_DETAILS': {
        return {
            newChapter: {...action.payload}
        }
    }

    case 'UPDATE_SELECTED_CHAPTER': {
       return {
         ...state,
         selectedChapter: {...action.payload}
       }
    }

    default:
      return state;
  }
};

export default ChapterReducer;

export const UpdateChapterDetails = (
  chapterData: NewChapterData,
): updateChapterDetails => {
  return {
    type: 'UPDATE_CHAPTER_DETAILS',
    payload: chapterData,
  };
};

export const ResetChapterDetails = (): resetChapterDetails => {
  return {
    type: 'RESET_CHAPTER_DETAILS',
  };
};

export const EditChapter = (chapterData: Chapter): editChapterDetails => {
    return {
        type: 'EDIT_CHAPTER_DETAILS',
        payload: chapterData
    }
}

export const UpdateSelectedChapter = (chapterData: Chapter) => {
  return {
    type: 'UPDATE_SELECTED_CHAPTER',
    payload: chapterData
  }
}
