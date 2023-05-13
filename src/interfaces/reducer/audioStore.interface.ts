// NTERFACES
export interface AudioStore {
  inputs: {
    _id?: string;
    chapterName: string;
    audioLink: string;
  };
  selectedAudioBook: SelectedBook;
}

export interface AudioEbookData {
  key: AudioEbookKey;
  value: string;
}

export interface SetAudioInputs {
  type: 'SET_AUDIO_INPUTS';
  payload: AudioEbookData;
}

export interface UpdateAudioEbook {
  type: 'UPDATE_AUDIO_EBOOK';
  payload: Audio;
}

export interface ClearAudioEbookFormInput {
  type: 'FORMAT_AUDIO_FORM_INPUT';
}

export interface UpdateSelectedAudioBook {
  type: 'UPDATE_SELECTED_AUDIO_BOOK';
  payload: Audio;
}

// TYPES

export type AudioEbookKey = 'chapterName' | 'audioLink';

export type AudioEbookAction =
  | SetAudioInputs
  | UpdateAudioEbook
  | ClearAudioEbookFormInput
  | UpdateSelectedAudioBook;

export type Audio = {
  _id?: string;
  chapterName: string;
  audioLink: string;
};

export type SelectedBook = {
    _id: string;
    chapterName: string;
    audioLink: string;
    index: number
}
