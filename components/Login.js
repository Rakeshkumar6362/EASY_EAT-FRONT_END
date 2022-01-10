import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Keyboard,
  BackHandler,
  Alert,
  Pressable,
  ToastAndroid,
} from "react-native";
import { color } from "react-native-elements/dist/helpers";
import { Button } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [phoneNumber, setphoneNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (phoneNumber === null) {
      const keyboardhide = Keyboard.addListener(
        "keyboardDidHide",
        keyboardDidhide
      );
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  }, [showModal]);

  const keyboardDidhide = () => {
    input_ref.current.blur();
  };

  const input_ref = useRef();
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,

          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          backgroundColor: "white",
          // height:'100%',
          // marginBottom: 10,
          flex: 1,
        }}
      >
        {/* <SafeAreaProvider>
          <SafeAreaView>
            <StatusBar />
          </SafeAreaView>
        </SafeAreaProvider> */}

        <View style={{ flex: 1 }}>
          {/* <ImageBackground
            source={{
              uri: "https://media.istockphoto.com/photos/assorted-indian-food-for-lunch-or-dinner-rice-lentils-paneer-dal-picture-id996188546?k=20&m=996188546&s=170667a&w=0&h=Xywj9SoJsLpaRUeyuWLXz_dkeRZkRxvVUSLKlmw-6xg=",
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              // height: 480,
              // flex:1
            }}
          /> */}
          <View style={{ flex: 3 }}>
            <ImageBackground
              source={{
                uri: "https://media.istockphoto.com/photos/assorted-indian-food-for-lunch-or-dinner-rice-lentils-paneer-dal-picture-id996188546?k=20&m=996188546&s=170667a&w=0&h=Xywj9SoJsLpaRUeyuWLXz_dkeRZkRxvVUSLKlmw-6xg=",
              }}
              style={{ flex: 1, justifyContent: "center" }}
            />
          </View>
          <Text
            style={{
              // flex: 1,
              fontSize: 25,
              fontWeight: "bold",
              // justifyContent:''
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            India's #1 Food Delivery and Dining App
          </Text>

          <View
            style={{
              // flex: 1,
              // marginBottom: 10,
              paddingHorizontal: 10,
              paddingBottom: 10,
              borderRadius: 5,
              borderTopWidth: 0.5,
              // alignItems: "center",
              borderColor: "gray",
            }}
          >
            <Text
              style={{
                position: "absolute",
                top: -12,
                left: "40%",
                // fontWeight: "bold",
                backgroundColor: "#FFFFFF",
                textAlign: "center",
                paddingHorizontal: 3,
                marginBottom: 5,
              }}
            >
              login or signup
            </Text>
            <TextInput
              maxLength={10}
              style={styles.inputBox}
              onChangeText={(value) => {
                if (value) setphoneNumber(value);
                else setphoneNumber(null);
              }}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              // onFocus={()=>input_ref.current.focus()}
              ref={input_ref}
            ></TextInput>

            <Button
              mode="contained"
              color="#de3737"
              style={{
                marginHorizontal: 25,
                marginVertical: 10,
                borderRadius: 10,
              }}
              contentStyle={{
                paddingVertical: 3,
              }}
              labelStyle={{
                color: "white",
                textTransform: "capitalize",
                fontSize: 17,
              }}
              onPress={async () => {
                if (phoneNumber === null) {
                  input_ref.current.focus();
                } else if (phoneNumber.length !== 10) {
                  // setShowModal(true);debugger
                  console.log("asdasd");
                  ToastAndroid.show("Please Enter a valid phoneNumber",ToastAndroid.LONG)
                  Keyboard.dismiss();
                } else {
                  await axios
                    .get(
                      `https://eat-easy.herokuapp.com/EASY_EAT/getExistingUser/${phoneNumber}`
                    )
                    .then((data) => {
                      if (data.data.length) {
                        console.log(data.data[0]);
                        navigation.navigate("otpVerification", { phoneNumber ,userData:data.data[0]});
                      } else {
                        console.log(phoneNumber);
                        navigation.navigate("register", { phone: phoneNumber});
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
            >
              Continue
            </Button>
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontWeight: "normal",
                fontSize: 13,
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              By continuing, you agree to our Terms of Service Privacy Policy
              Content Policy
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Please Enter Valid Phone Number
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    borderColor: "gray",
  },
  centeredView: {
    // position:"absolute",bottom:0,
    marginTop: "auto",
    // borderWidth:1,
    // backgroundColor:'red'
  },
  modalView: {
    // margin: 10,
    // backgroundColor: "white",
    borderRadius: 30,
    borderColor: "gray",
    marginHorizontal: 50,
    borderWidth: 0.5,
    backgroundColor: "white",
    // opacity:,
    padding: 0,
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    color: "black",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
