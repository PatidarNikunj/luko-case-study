import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CommonView from "../components/CommonView";

interface InventoryProps {}

const HomeScreen = (props: InventoryProps) => {
  return (
    <CommonView header={"Home"}>
      <View style={styles.container}>
        <Ionicons name="home" size={100} color={"lightgrey"} />
      </View>
    </CommonView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
