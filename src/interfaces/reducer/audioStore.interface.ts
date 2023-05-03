// NTERFACES
export interface AudioStore {
    inputs: {
        _id?: string,
        chapterName: string,
        audioLink: string,
    }
}

export interface AudioEbookData {
    key: AudioEbookKey,
    value: string
}

export interface SetAudioInputs {
    type: 'SET_AUDIO_INPUTS',
    payload: AudioEbookData
}

export interface UpdateAudioEbook {
    type: 'UPDATE_AUDIO_EBOOK',
    payload: Audio
}

export interface ClearAudioEbookFormInput {
    type: 'FORMAT_AUDIO_FORM_INPUT'
}


// TYPES

export type AudioEbookKey = 'chapterName' | 'audioLink';

export type AudioEbookAction = SetAudioInputs | UpdateAudioEbook | ClearAudioEbookFormInput;

export type Audio = {
    _id?: string,
    chapterName: string,
    audioLink: string
}