import { Audio, AudioStore, ClearAudioEbookFormInput, SetAudioInputs, UpdateAudioEbook } from "../../interfaces/reducer/audioStore.interface";
import { AudioEbookData } from "../../interfaces/reducer/audioStore.interface";
import { AudioEbookAction } from "../../interfaces/reducer/audioStore.interface"

const initialState: AudioStore = {
    inputs: {
        chapterName: '',
        audioLink: '',
    }
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