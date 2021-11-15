import React, { useEffect, useState } from "react";
import {
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
} from "react-native";
import { DynamicSize } from "../constants/DynamicSize";

interface Props {
  style?: StyleProp<TextStyle>;
  thisRef?: React.LegacyRef<any>;
  nextRef?: any;
  onChangeText?: any;
  placeholder: string;
  keyboardType?: any;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  multiline?: boolean;
}

const CommonTextInputView: React.FC<Props> = ({
  style,
  thisRef,
  nextRef,
  onChangeText,
  placeholder,
  keyboardType,
  returnKeyType = "next",
  maxLength,
  multiline,
}) => {
  const [value, setValue] = useState<string>("");
  const [focusBlurStyle, setFocusBlurStyle] = useState<TextStyle>({
    borderColor: "rgba(234, 233, 227, 1)",
  });

  return (
    <TextInput
      ref={thisRef}
      style={[styles.input, focusBlurStyle, style]}
      placeholder={placeholder}
      placeholderTextColor={"rgba(192, 190, 184, 1)"}
      maxLength={maxLength}
      onChangeText={(text) => {
        text =
          keyboardType === "number-pad" ? text.replace(/[^\d]/g, "") : text;
        setValue(text);
        onChangeText(text);
      }}
      value={value}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      onSubmitEditing={() => nextRef.current?.focus()}
      blurOnSubmit={false}
      onFocus={() => {
        setFocusBlurStyle({
          borderColor: "rgba(40, 80, 230, 1)",
        });
      }}
      onBlur={() => {
        setFocusBlurStyle({
          borderColor: "rgba(234, 233, 227, 1)",
        });
      }}
      multiline={multiline}
    />
  );
};

export default CommonTextInputView;

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    height: DynamicSize.iHeight(48),
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "rgba(234, 233, 227, 1)",
    marginTop: DynamicSize.iMargin(5),
    paddingVertical: DynamicSize.iMargin(12),
    paddingHorizontal: DynamicSize.iMargin(15),
    fontSize: 17,
    fontFamily: "circular-medium",
  },
});
