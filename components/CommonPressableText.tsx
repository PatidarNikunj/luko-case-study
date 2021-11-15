import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { CommonTextView } from "./CommonTextView";

interface Props {
  title?: string;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  textStyle?: StyleProp<TextStyle>;
  onPress?: null | ((event: GestureResponderEvent) => void);
  isDisabled?: boolean;
}

const CommonPressableText: React.FC<Props> = ({
  title,
  style,
  textStyle,
  onPress,
  isDisabled,
}) => {
  const ColorScheme = useColorScheme();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.container,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <CommonTextView
        style={[{ color: Colors[ColorScheme].activeTint }, textStyle]}
      >
        {title}
      </CommonTextView>
    </Pressable>
  );
};

export default CommonPressableText;

const styles = StyleSheet.create({
  container: {},
});
