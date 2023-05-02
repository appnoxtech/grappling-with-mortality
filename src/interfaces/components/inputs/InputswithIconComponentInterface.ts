import { StyleProp, TextStyle } from "react-native";

export interface InputsWithIconComponentProps {
    placeholder?: string,
    value: string,
    id: string,
    handelTextChange(text: string, id: string): void,
    errorString?: string,
    iconName: string,
    iconColor: string,
    iconFamily: string,
    iconSize: number,
    iconStyle?:  StyleProp<TextStyle>,
}