import { Dimensions } from "react-native";

export const DynamicSize = {
  iWidth: (componentWidth: number = 157.5) =>
    parseFloat("" + (Dimensions.get("window").width * componentWidth) / 375),
  iHeight: (componentHeight: number = 265) =>
    parseFloat("" + (Dimensions.get("window").height * componentHeight) / 812),
  iMargin: (componentMargin: number = 20) =>
    parseFloat("" + (Dimensions.get("window").width * componentMargin) / 375),
};
