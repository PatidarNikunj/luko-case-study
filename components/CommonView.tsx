import React from "react";
import {
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { DynamicSize } from "../constants/DynamicSize";
import CommonPressableIcon from "./CommonPressableIcon";
import { CommonTextView } from "./CommonTextView";
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

interface Props {
  navigation?: any;
  navParams?: any;
  header?: string;
  children?: React.ReactChild;
  screenName?: string;
}

const CommonView: React.FC<Props> = ({
  navigation,
  navParams,
  header,
  children,
  screenName,
}) => {
  return (
    <>
      <StatusBar translucent={true} hidden={false} />
      <SafeAreaView style={styles.container}>
        {header && (
          <View style={styles.headerContainer}>
            <CommonTextView style={styles.headerTitle}>{header}</CommonTextView>
            {navigation && (
              <CommonPressableIcon
                iconName={"add-circle"}
                iconSize={28}
                onPress={() => {
                  navigation.navigate(screenName, navParams);
                }}
              />
            )}
          </View>
        )}
        <View style={styles.body}>{children}</View>
      </SafeAreaView>
    </>
  );
};

export default CommonView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: DynamicSize.iMargin(Platform.OS === "android" ? 70 : 50),
    paddingLeft: DynamicSize.iMargin(),
    paddingRight: DynamicSize.iMargin(),
  },
  headerTitle: {
    flex: 1,
    fontSize: 34,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  body: { flex: 1 },
});
