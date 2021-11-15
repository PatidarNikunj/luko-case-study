import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CommonView from "../components/CommonView";

interface InventoryProps {}

const InsuranceScreen = (props: InventoryProps) => {
  return (
    <CommonView header={"Insurance"}>
      <View style={styles.container}>
        <Ionicons name="umbrella" size={100} color={"lightgrey"} />
      </View>
    </CommonView>
  );
};

export default InsuranceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
