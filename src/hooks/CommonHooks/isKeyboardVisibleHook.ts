import { useEffect, useState } from "react"
import { Keyboard } from "react-native";

const useKeyboardVisibleListener = () => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          _keyboardDidShow,
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          _keyboardDidHide,
        );
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);
    
      const _keyboardDidShow = () => {
        setIsKeyboardVisible(true);
      };
    
      const _keyboardDidHide = () => {
        setIsKeyboardVisible(false);
      };
      return isKeyboardVisible;
};

export default useKeyboardVisibleListener;