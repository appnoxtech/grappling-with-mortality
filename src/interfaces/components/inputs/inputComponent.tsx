import { InputModeOptions, KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native";

export interface inputComponentProps {
   containerStyle: StyleProp<ViewStyle>,
   id: string,
   placeholder: string,
   value: string,
   error?: string,
   allowMultiLine?: boolean,
   keyboardType?: InputModeOptions | undefined,
   onChangeHandler(text: string, id: string): void,
}