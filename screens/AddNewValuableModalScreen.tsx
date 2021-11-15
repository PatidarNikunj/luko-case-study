import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import CommonPressableText from "../components/CommonPressableText";
import CommonTextInputView from "../components/CommonTextInputView";
import { CommonTextView } from "../components/CommonTextView";
import CommonView from "../components/CommonView";
import { ScreenProps, ValuableType } from "../constants/AppInterfacesTypes";
import Colors from "../constants/Colors";
import { DynamicSize } from "../constants/DynamicSize";
import {
  ButtonText,
  Category,
  ErrorAndWarningString,
  InputHeader,
  PlaceHolders,
} from "../constants/Strings";
import useColorScheme from "../hooks/useColorScheme";

const AddNewValuableModalScreen: React.FC<ScreenProps> = ({
  navigation,
  route,
}) => {
  const ColorScheme = useColorScheme();
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [purchasePriceError, setPurchasePriceError] = useState<boolean>(false);
  const [purchasePriceHigh, setPurchasePriceHigh] = useState<boolean>(false);
  const [categoryType, setCategoryType] = useState<string>("");
  const [categoryTypeError, setCategoryTypeError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");
  const [imageUriError, setImageUriError] = useState<boolean>(false);
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [enableAdd, setEnableAdd] = useState<boolean>(false);
  const nameRef = useRef<TextInput | null>(null);
  const priceRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImageUriError(false);
    if (!result.cancelled) {
      setImageUri(result.uri);
    } else {
      setImageUriError(true);
    }
  };

  useEffect(() => {
    validateInput();
  }, [name, purchasePrice, categoryType, imageUri]);

  const validateInput = () => {
    if (!name || purchasePrice < 1 || !categoryType || !imageUri) {
      setEnableAdd(false);
    } else {
      setEnableAdd(true);
    }
  };

  const addItem = () => {
    let totalPrice = route.params.totalPrice + purchasePrice;
    if (totalPrice > 40000) {
      alert(ErrorAndWarningString.priceLimitExceedMsg);
      return;
    }
    if (enableAdd) {
      const valuableItem: ValuableType = {
        id: new Date().getMilliseconds(),
        name: name,
        purchasePrice: purchasePrice,
        type: categoryType,
        description: description,
        photo: imageUri,
      };
      navigation.goBack();
      route.params.onAdd(valuableItem);
    }
  };

  const HeaderView = (
    <View style={styles.headerViewContainer}>
      <CommonPressableText
        title={ButtonText.cancel}
        onPress={() => {
          navigation.goBack(null);
        }}
      />
      <CommonPressableText
        title={ButtonText.add}
        textStyle={{
          color: enableAdd ? Colors[ColorScheme].activeTint : "lightgrey",
        }}
        onPress={addItem}
        isDisabled={!enableAdd}
      />
    </View>
  );

  const AddPhotoView = (
    <View style={styles.addPhotoContainer}>
      {imageUri ? (
        <ImageBackground
          style={styles.addPhotoImageBG}
          imageStyle={styles.addPhotoImageStyle}
          source={{
            uri: imageUri,
          }}
        >
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              styles.addPhotoButton,
            ]}
            onPress={() => setImageUri("")}
          >
            <Ionicons name={"trash"} size={20} color={"#FFFFFF"} />
          </Pressable>
        </ImageBackground>
      ) : (
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            styles.addPhotoButtonEmpty,
          ]}
          onPress={pickImage}
        >
          <Ionicons
            name="camera"
            size={44}
            color={Colors[ColorScheme].activeTint}
          />
          <CommonTextView style={{ fontSize: 17 }}>
            {ButtonText.addPhoto}
          </CommonTextView>
        </Pressable>
      )}
      {imageUriError ? (
        <CommonTextView style={styles.errorMsg}>
          {ErrorAndWarningString.imageNotSelectedMsg}
        </CommonTextView>
      ) : null}
    </View>
  );

  const NameFieldView = (
    <View style={styles.fieldContainer}>
      <CommonTextView>{InputHeader.name}</CommonTextView>
      <CommonTextInputView
        thisRef={nameRef}
        nextRef={priceRef}
        onChangeText={(text: string) => {
          setName(text);
          setNameError(text.trim() === "" ? true : false);
        }}
        placeholder={PlaceHolders.name}
        maxLength={50}
      />
      {nameError ? (
        <CommonTextView style={styles.errorMsg}>
          {ErrorAndWarningString.nameIsEmptyMsg}
        </CommonTextView>
      ) : null}
    </View>
  );

  const DropDownList = () => {
    const listStyle = {
      height: "auto",
      width: "auto",
      marginTop: DynamicSize.iMargin(1),

      paddingHorizontal: 10,
    };

    return (
      <FlatList
        style={listStyle}
        data={Category}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: index % 2 === 0 ? "white" : "lightgrey",
                  padding: DynamicSize.iMargin(5),
                  borderBottomLeftRadius:
                    index === Category.length - 1 ? 10 : 0,
                  borderBottomRightRadius:
                    index === Category.length - 1 ? 10 : 0,
                },
              ]}
              onPress={() => {
                setCategoryType(item.category);
                setDropDownVisible(!dropDownVisible);
              }}
            >
              <CommonTextView
                style={{ fontFamily: "circular-bold", fontSize: 16 }}
              >
                {item.category}
              </CommonTextView>
              {item.category === categoryType && (
                <Ionicons
                  name="checkmark-circle-outline"
                  size={15}
                  color={Colors[ColorScheme].activeTint}
                />
              )}
            </Pressable>
          );
        }}
      />
    );
  };

  const CategoryFieldView = (
    <View
      style={{
        marginTop: DynamicSize.iMargin(),
      }}
    >
      <CommonTextView>{InputHeader.category}</CommonTextView>
      <Pressable
        style={[
          styles.categoryView,
          {
            justifyContent: "center",
            marginTop: DynamicSize.iMargin(5),
          },
        ]}
        onPress={() => {
          if (dropDownVisible && !categoryType) {
            setCategoryTypeError(true);
          } else {
            setCategoryTypeError(false);
          }
          setDropDownVisible(!dropDownVisible);
        }}
      >
        <CommonTextView>
          {categoryType ? categoryType : PlaceHolders.type}
        </CommonTextView>
        <Ionicons
          style={styles.inlineIcon}
          name="chevron-down-outline"
          size={10}
          color="red"
        />
      </Pressable>
      {categoryTypeError ? (
        <CommonTextView style={styles.errorMsg}>
          {ErrorAndWarningString.categoryNotSelectedMsg}
        </CommonTextView>
      ) : null}
      {dropDownVisible && <DropDownList />}
    </View>
  );

  const PriceFieldView = (
    <View
      style={{
        marginTop: DynamicSize.iMargin(),
      }}
    >
      <CommonTextView>{InputHeader.value}</CommonTextView>
      <View
        style={{
          justifyContent: "center",
          marginTop: DynamicSize.iMargin(5),
        }}
      >
        <CommonTextInputView
          thisRef={priceRef}
          style={{
            marginTop: DynamicSize.iMargin(0),
            paddingLeft: DynamicSize.iMargin(15),
            paddingRight: DynamicSize.iMargin(30),
          }}
          nextRef={descriptionRef}
          onChangeText={(text: string) => {
            const value = parseFloat(text);
            setPurchasePrice(value);
            setPurchasePriceError(text.trim() === "" ? true : false);

            if (text) {
              if (value <= 40000) {
                setPurchasePriceHigh(false);
              } else {
                setPurchasePriceHigh(true);
              }
            } else {
              setPurchasePrice(0);
              setPurchasePriceHigh(false);
            }
          }}
          placeholder={PlaceHolders.price}
          keyboardType={"number-pad"}
          maxLength={10}
        />
        <CommonTextView style={styles.inlineIcon}>€</CommonTextView>
      </View>
      {purchasePriceHigh || purchasePriceError ? (
        <CommonTextView style={styles.errorMsg}>
          {ErrorAndWarningString.purchasePriceIsEmptyMsg}
        </CommonTextView>
      ) : null}
    </View>
  );
  const DescriptionFieldView = (
    <View
      style={{
        marginTop: DynamicSize.iMargin(),
      }}
    >
      <CommonTextView>{InputHeader.description}</CommonTextView>
      <CommonTextInputView
        style={{
          height: DynamicSize.iHeight(128),
          paddingTop: DynamicSize.iMargin(10),
          textAlignVertical: "top",
        }}
        thisRef={descriptionRef}
        onChangeText={(text: string) => {
          setDescription(text);
        }}
        placeholder={PlaceHolders.description}
        maxLength={300}
        multiline={true}
      />
    </View>
  );
  return (
    <CommonView navigation={navigation} screenName={"Modal"}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "position"}
          style={styles.keyboardAvoidingView}
        >
          {HeaderView}
          <ScrollView showsVerticalScrollIndicator={false}>
            {AddPhotoView}
            {NameFieldView}

            {CategoryFieldView}
            {PriceFieldView}
            {DescriptionFieldView}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </CommonView>
  );
};

export default AddNewValuableModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: DynamicSize.iMargin(Platform.OS === "android" ? 70 : 16),
    marginLeft: DynamicSize.iMargin(),
    marginRight: DynamicSize.iMargin(),
  },
  keyboardAvoidingView: { flex: 1 },
  fieldContainer: {
    marginTop: DynamicSize.iMargin(),
  },
  headerViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addPhotoContainer: {
    alignItems: "center",
    marginTop: DynamicSize.iMargin(26),
  },
  addPhotoImageBG: {
    height: DynamicSize.iWidth(150),
    width: DynamicSize.iWidth(150),
  },
  addPhotoImageStyle: {
    borderRadius: DynamicSize.iWidth(150),
  },
  addPhotoButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(217, 87, 98, 1)",
    borderRadius: 50,
    padding: DynamicSize.iMargin(8),
  },
  addPhotoButtonEmpty: {
    justifyContent: "center",
    alignItems: "center",
    height: DynamicSize.iWidth(150),
    width: DynamicSize.iWidth(150),
    borderWidth: 2,
    borderRadius: DynamicSize.iWidth(150),
    borderColor: "rgba(200, 200, 200, 1)",
    borderStyle: "dashed",
  },
  categoryView: {
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
  inlineIcon: {
    position: "absolute",
    right: 0,
    marginRight: DynamicSize.iMargin(12),
    color: "rgba(107, 102, 81, 1)",
    fontSize: 17,
  },
  errorMsg: {
    marginLeft: DynamicSize.iMargin(2),
    marginTop: DynamicSize.iMargin(5),
    color: "red",
  },
});
