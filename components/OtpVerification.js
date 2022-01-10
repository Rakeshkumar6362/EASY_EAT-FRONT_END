import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const OtpVerification = ({ navigation, route }) => {
  const [OTP, setOTP] = useState([]);
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://eat-easy.herokuapp.com/EASY_EAT/getOtp/${route.params.phoneNumber}`
      )
  }, []);
  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid(false);
      }, 2000);
    }
  }, [invalid]);
  const otp1 = useRef();
  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();
  const otp5 = useRef();
  const otp6 = useRef();

  return (
    <View>
      <SafeAreaProvider>
        <SafeAreaView>
          <StatusBar />
        </SafeAreaView>
      </SafeAreaProvider>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 5,
          }}
        >
          <Icon
            type="antdesign"
            size={25}
            name="arrowleft"
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{
              fontSize: 20,
              letterSpacing: 2,
              marginLeft: 10,
            }}
          >
            OTP Verification
          </Text>
        </View>
        <Text
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 15,
          }}
        >
          We have sent a verifation code to
        </Text>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
            fontSize: 20,
            marginBottom: 50,
          }}
        >{`+91-${route.params.phoneNumber}`}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <TextInput
            autoFocus={true}
            ref={otp1}
            keyboardType="number-pad"
            style={[styles.inputBox, { borderColor: invalid ? "red" : "gray" }]}
            maxLength={1}
            onChangeText={(val) => {
              val.length ? otp2.current.focus():otp1.current.focus()
              setOTP((prev) => {
                prev[0] = val;
                return prev;
              });
            }}
          />
          <TextInput
            ref={otp2}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              val.length ? otp3.current.focus():otp1.current.focus()
              setOTP((prev) => {
                prev[1] = val;
                return prev;
              });
            }}
            style={[styles.inputBox, { borderColor: invalid ? "red" : "gray" }]}
          />
          <TextInput
            ref={otp3}
            keyboardType="number-pad"
            maxLength={1}
            style={[styles.inputBox, { borderColor: invalid ? "red" : "gray" }]}
            onChangeText={(val) => {
              val.length ? otp4.current.focus() :otp2.current.focus()
              setOTP((prev) => {
                prev[2] = val;
                return prev;
              });
            }}
          />
          <TextInput
            ref={otp4}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              val.length ? otp5.current.focus():otp3.current.focus()
              setOTP((prev) => {
                prev[3] = val;
                return prev;
              });
            }}
            style={[styles.inputBox, { borderColor: invalid ? "red" : "gray" }]}
          />
          <TextInput
            ref={otp5}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              val.length ? otp6.current.focus():otp4.current.focus()
              setOTP((prev) => {
                prev[4] = val;
                return prev;
              });
            }}
            style={[styles.inputBox, { borderColor: invalid ? "red" : "gray" }]}
          />
          <TextInput
            ref={otp6}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
                if(val.length==0){
                    otp5.current.focus()
                }
              setOTP((prev) => {
                prev[5] = val;
                return prev;
              });
            }}
            style={[styles.inputBox, { borderColor: invalid ? "red" : "gray" }]}
          />
        </View>
        {invalid && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginVertical: 10,
              fontSize: 12,
            }}
          >
            The OTP entered is Invalid/Incorrect. Please try again
          </Text>
        )}
        <View>
          <Button
            onPress={() => {
              console.log(route.params.userData);
            }}
            mode="contained"
            labelStyle={
              {
                //   color: "tomato",
              }
            }
            style={{
              marginHorizontal: 20,
              marginVertical: 50,
              paddingVertical: 10,
              //   borderColor: "tomato",
              //   backgroundColor:'tomato',
              borderWidth: 1,
            }}
          >
            Resend SMS
          </Button>
          <Button
            onPress={() => {
              if (OTP.join("").length === 6) {
                axios
                  .get(
                    `https://eat-easy.herokuapp.com/EASY_EAT/verifyOtp/${
                      route.params.phoneNumber
                    }/${OTP.join("")}`
                  )
                  .then((data) => {
                    if (data.data.status === "approved") {
                      navigation.goBack();
                      navigation.navigate("home",{userData:route.params.userData});
                    } else {
                      setInvalid(true);
                    }
                  });
              } else {
                setInvalid(true);
              }
            }}
            mode="contained"
            labelStyle={
              {
                //   color: "tomato",
              }
            }
            style={{
              marginHorizontal: 20,
              //   marginVertical: 50,
              paddingVertical: 10,
              //   borderColor: "",
              backgroundColor: "dodgerblue",
              borderWidth: 1,
            }}
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  inputBox: {
    height: 50,
    textAlign: "center",
    color: "grey",
    width: 45,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
