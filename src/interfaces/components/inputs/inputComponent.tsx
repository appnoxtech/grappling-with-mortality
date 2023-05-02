import { InputModeOptions, KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native";

export interface inputComponentProps {
   containerStyle: StyleProp<ViewStyle>,
   id: string,
   placeholder: string,
   value: string | number,
   error?: string,
   allowMultiLine?: boolean,
   keyboardType?: InputModeOptions | undefined,
   onChangeHandler(text: string | number, id: string): void,
}