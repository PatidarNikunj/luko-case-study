import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface Props {
  iconName: string | any;
  iconSize: number;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  onPress?: null | ((event: GestureResponderEvent) => void);
}

const CommonPressableIcon: React.FC<Props> = ({
  iconName,
  iconSize,
  style,
  onPress,
}) => {
  const ColorScheme = useColorScheme();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        { style },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        size={iconSize}
        color={Colors[ColorScheme].activeTint}
      />
    </Pressable>
  );
};

export default CommonPressableIcon;
