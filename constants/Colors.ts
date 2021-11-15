const activeTintColorLight = "rgba(45, 80, 230, 1)";
const inactiveTintColorLight = "rgba(150, 148, 138, 1)";
const activeTintColorDark = "#fff";
const inactiveTintColorDark = "rgba(150, 148, 138, 1)";

export default {
  light: {
    text: "#000",
    background: "#fff",
    activeTint: activeTintColorLight,
    inactiveTint: inactiveTintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: activeTintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    activeTint: activeTintColorDark,
    inactiveTint: inactiveTintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: activeTintColorDark,
  },
};
