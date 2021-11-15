import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, Platform, StyleSheet, View } from "react-native";
import { CommonTextView } from "../components/CommonTextView";
import CommonView from "../components/CommonView";
import { ScreenProps, ValuableType } from "../constants/AppInterfacesTypes";
import { DynamicSize } from "../constants/DynamicSize";

const InventoryScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [myInventory, setMyInventory] = useState<ValuableType[]>([]);

  const _renderItem = (item: ValuableType, index: number) => {
    const itemStyle = StyleSheet.create({
      container: {
        height: DynamicSize.iHeight(),
        width: DynamicSize.iWidth(),
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        shadowColor: `${
          Platform.OS === "android"
            ? "rgba(6, 8, 13, 1)"
            : "rgba(6, 8, 13, 0.2)"
        }`,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 9,
        marginLeft: DynamicSize.iMargin(),
        marginTop: DynamicSize.iMargin(),
      },
      image: {
        height: DynamicSize.iWidth(),
        width: "100%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      },
      textContainer: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: DynamicSize.iMargin(15),
        paddingBottom: DynamicSize.iMargin(15),
        paddingLeft: DynamicSize.iMargin(),
        paddingRight: DynamicSize.iMargin(),
      },
      name: {
        fontSize: 19,
        lineHeight: 26,
      },
      price: { color: "rgba(107, 102, 81, 1)" },
    });

    return (
      <View style={itemStyle.container}>
        <Image
          style={itemStyle.image}
          source={{
            uri: item.photo,
          }}
        />
        <View style={itemStyle.textContainer}>
          <CommonTextView
            style={itemStyle.name}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            {item.name}
          </CommonTextView>
          <CommonTextView style={itemStyle.price}>
            {`€${item.purchasePrice}`}
          </CommonTextView>
        </View>
      </View>
    );
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const updateInventory = (valuables: ValuableType) => {
    setMyInventory([...myInventory, valuables]);
    setTotalPrice(totalPrice + valuables.purchasePrice);
  };

  const emptyList = (
    <View style={styles.emptyContainer}>
      <Ionicons name="sad-outline" size={50} color={"lightgrey"} />
      <CommonTextView style={styles.emptyText}>
        No Valuables to show!
      </CommonTextView>
    </View>
  );
  return (
    <CommonView
      navigation={navigation}
      navParams={{
        onAdd: updateInventory,
        totalPrice: totalPrice,
      }}
      header={"Inventory"}
      screenName={"Modal"}
    >
      {!myInventory.length ? (
        emptyList
      ) : (
        <FlatList
          style={styles.list}
          data={myInventory}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          ListFooterComponent={() => {
            return <View />;
          }}
          ListFooterComponentStyle={styles.listFooter}
          renderItem={({ item, index }) => _renderItem(item, index)}
        />
      )}
    </CommonView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: {},
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "lightgrey" },
  list: { flex: 1 },
  listFooter: { height: DynamicSize.iMargin() },
});
