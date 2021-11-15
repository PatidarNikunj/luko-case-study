import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CommonView from "../components/CommonView";

interface InventoryProps {}

const RealtyScreen = (props: InventoryProps) => {
  return (
    <CommonView header={"Realty"}>
      <View style={styles.container}>
        <Ionicons name="search" size={100} color={"lightgrey"} />
      </View>
    </CommonView>
  );
};

export default RealtyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

