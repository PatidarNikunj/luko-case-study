import React from "react";

import { Text, TextProps } from "./Themed";

export function CommonTextView(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "circular-medium" }]} />
  );
}
