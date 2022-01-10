import axios from "axios";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { Button, Checkbox } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Register = ({ navigation, route }) => {
  const [checked, setChecked] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  console.log(route.params.phone);
  return (
    <View>
      <SafeAreaProvider>
        <SafeAreaView>
          <StatusBar />
        </SafeAreaView>
      </SafeAreaProvider>
      <View
        style={{
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 0.6,
            borderBottomColor: "gray",
            marginVertical: 18,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              paddingHorizontal: 20,
              // paddingVertical: 10,
              marginBottom: 10,
            }}
          >
            Signup to EAT EASY
          </Text>
          <Icon
            type="antdesign"
            size={30}
            name="close"
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={(val) => {
            setFormDetails((prev) => {
              return { ...prev, userName: val };
            });
          }}
        />
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={(val) => {
            setFormDetails((prev) => {
              return {
                ...prev,
                email: val,
              };
            });
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={(val) => {
            setFormDetails((prev) => {
              return {
                ...prev,
                password: val,
              };
            });
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginBottom: 15,
            marginHorizontal: 10,
          }}
        >
          <Checkbox
            color="dodgerblue"
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
          />
          <Text
            style={{
              marginTop: 7,
            }}
          >
            Send me Occasional updates
          </Text>
        </View>
        <Button
          mode="contained"
          style={{
            backgroundColor: "tomato",
            padding: 8,
            marginHorizontal: 20,
          }}
          onPress={() => {
            let payload = [{ ...formDetails, phoneNumber: route.params.phone }];

            axios
              .post(
                `https://eat-easy.herokuapp.com/EASY_EAT/save/user`,
                payload
              )
              .then((data) => {
                if (data) {
                  ToastAndroid.show(
                    "Registered successfully",
                    ToastAndroid.LONG
                  );
                  navigation.navigate("otpVerification", {
                    phoneNumber: route.params.phone,
                    userData: data.data[0],
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Register
        </Button>
        <Text
          style={{
            color: "gray",
            textAlign: "center",
            letterSpacing: 0.3,
            marginVertical: 10,
          }}
        >
          By creating account, you agree to EASY EAT's Terms of service Cookie
          Policy, Privacy Policy and content Policies.
        </Text>
      </View>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  inputBox: {
    height: 50,
    padding: 5,
    // width: "100%",
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 0.5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginHorizontal: 20,
  },
});
