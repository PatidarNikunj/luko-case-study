import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CommonView from "../components/CommonView";

interface InventoryProps {}

const MenuScreen = (props: InventoryProps) => {
  return (
    <CommonView header={"Menu"}>
      <View style={styles.container}>
        <Ionicons name="menu" size={100} color={"lightgrey"} />
      </View>
    </CommonView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
