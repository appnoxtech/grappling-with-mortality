import { Audio, AudioStore, ClearAudioEbookFormInput, SelectedBook, SetAudioInputs, UpdateAudioEbook } from "../../interfaces/reducer/audioStore.interface";
import { AudioEbookData } from "../../interfaces/reducer/audioStore.interface";
import { AudioEbookAction } from "../../interfaces/reducer/audioStore.interface"

const initialState: AudioStore = {
    inputs: {
        chapterName: '',
        audioLink: '',
    },
    selectedAudioBook: {
        _id: '',
        chapterName: '',
        audioLink: '',
        index: 0
    },
}

const AudioEbookReducers = (state=initialState, action: AudioEbookAction) => {
   switch (action.type) {
    case 'SET_AUDIO_INPUTS': {
        return {
            ...state,
            inputs: {
                ...state.inputs,
                [action.payload.key]: action.payload.value
            }
        }
    }

    case 'UPDATE_AUDIO_EBOOK': {
        return {
            ...state,
            inputs: {
                ...action.payload
            }
        }
    }

    case 'FORMAT_AUDIO_FORM_INPUT': {
        return {
            ...state,
            inputs: {
                chapterName: '',
                audioLink: '',
            }
        }
    }

    case 'UPDATE_SELECTED_AUDIO_BOOK': {
        return {
            ...state,
            selectedAudioBook: {
                ...action.payload
            }
        }
    }
   
    default:
        return state;
   }
}

export default AudioEbookReducers;

export const SetAudioEbookFormInputs = (data: AudioEbookData):SetAudioInputs  => {
   return {
      type: 'SET_AUDIO_INPUTS',
      payload: data
   }
}

export const EditEbook = (data: Audio): UpdateAudioEbook => {
   return {
      type: 'UPDATE_AUDIO_EBOOK',
      payload: data
   }
}

export const ResetAudioEbookFormInput = (): ClearAudioEbookFormInput => {
    return {
        type: 'FORMAT_AUDIO_FORM_INPUT'
    }
}

export const UpdateSelectedAudioBook = (AudioBook: SelectedBook) => {
    return {
        type: 'UPDATE_SELECTED_AUDIO_BOOK',
        payload: AudioBook
    }
}