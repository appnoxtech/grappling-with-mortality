import { StyleProp, TextInput, TextStyle } from "react-native";

export interface ImagePickerProps {
   error: string,
   label: string,
   iconFamily: string,
   iconName: string,
   iconSize: number,
   iconStyle: StyleProp<TextStyle>,
   iconColor: string,
   value: string,
   setValue(value: string, id:string): void,
   id: string
}