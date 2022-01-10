// import {  } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import IceCream from "./components/IceCream";
import MainCourse from "./components/MainCourse";
import Starters from "./components/Starters";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import OtpVerification from "./components/OtpVerification";
import Register from "./components/Register";
let ImagesData = [
  {
    id: 1,
    image:
      "https://media.istockphoto.com/photos/brushetta-set-and-glass-of-red-wine-small-sandwiches-with-picture-id544722402?k=20&m=544722402&s=612x612&w=0&h=lOdSmDFPS3ypiTmUnEkvTqRFd8dde7QZ07dVNLdIlgk=",
    title: "starters",
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/photos/roasted-whole-french-chicken-picture-id1192828034?k=20&m=1192828034&s=612x612&w=0&h=TUGYWNtQVV2DxjD1hKxHXbhAzj8s8bgupdx0RMo3EDo=",
    title: "main course",
  },
  {
    id: 3,
    image:
      "https://media.istockphoto.com/photos/four-kind-of-vegetable-juices-red-burgundy-orange-green-picture-id519553584?k=20&m=519553584&s=612x612&w=0&h=J5lncSHF5PhvKJx-foTM844QiIHxzDgfQIMirJ-DqEU=",
    title: "Smoothies",
  },
  {
    id: 4,
    image:
      "https://media.istockphoto.com/photos/chocolate-ice-cream-in-a-glass-cup-picture-id936205852?k=20&m=936205852&s=612x612&w=0&h=PutImj427yDt5breC8CEFP4Tf-mMA1mHfZFG4XQH0Og=",
    title: "ice creams",
  },
];
export default function App() {
  const [showStarters, setshowStarters] = useState(false);
  const [showsmoothies, setshowsmoothies] = useState(false);
  const [showIcecream, setshowIcecream] = useState(false);
  const [showmaincourse, setshowmaincourse] = useState(false);
  const [showLoader, setshowLoader] = useState(true);
  const Stack = createNativeStackNavigator();

  //sjhdgbjsd

  useEffect(() => {
    setTimeout(() => {
      setshowLoader(false);
    }, 7000);
  }, []);
  // const renderImages = ({ item }) => {
  //   return (
  //     <View
  //       style={
  //         {
  //           // padding:2
  //         }
  //       }
  //     >
  //       <Pressable
  //         onPress={() => {
  //           if (item.id === 1) {
  //             setshowStarters(true);
  //           }
  //           if (item.id === 2) {
  //             setshowmaincourse(true);
  //           }
  //           if (item.id === 3) {
  //             setshowsmoothies(true);
  //           }
  //           if (item.id === 4) {
  //             setshowIcecream(true);
  //           }
  //         }}
  //       >
  //         <Image
  //           resizeMode="cover"
  //           style={{
  //             height: 135,
  //             width: 135,
  //             borderRadius: 100,
  //             // justifyContent:'center',
  //             // alignItems:'center',
  //             marginLeft: "auto",
  //             marginTop: 10,
  //           }}
  //           source={{
  //             uri: item.image,
  //           }}
  //         />
  //       </Pressable>
  //       <Text
  //         style={{
  //           textAlign: "right",
  //           textTransform: "uppercase",
  //           fontSize: 20,
  //           color: "white",
  //           padding: 2,
  //           borderBottomWidth: 1,
  //           borderBottomColor: "white",
  //           marginTop: 1,
  //           borderRadius: 20,
  //         }}
  //       >
  //         {item.title}
  //       </Text>
  //     </View>
  //   );
  // };
  return (
    // <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="icecream" component={IceCream} /> */}
        <Stack.Screen
          name="starters"
          component={Starters}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cart"
          component={Cart}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="placeOrder"
          component={MainCourse}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="otpVerification"
          component={OtpVerification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    //   {showLoader ? (
    //     <ImageBackground
    //       style={{
    //         flex: 1,
    //         backgroundColor: "#fcfefc",

    //       }}
    //       source={{
    //         uri: "https://c.tenor.com/2yQv-RptjeQAAAAC/fastfood.gif",
    //       }}
    //       resizeMode="contain"
    //     />
    //   ) : (
    //     <SafeAreaProvider>
    //       <SafeAreaView style={{}}>
    //         <StatusBar />
    //         <View>
    //           <Text style={styles.heading}>WINE AND DINE</Text>
    //         </View>
    //       </SafeAreaView>
    //       <View style={styles.body}>
    //         <ImageBackground
    //           blurRadius={2}
    //           resizeMode="cover"
    //           style={{
    //             // justifyContent:'center',
    //             flex: 1,
    //           }}
    //           source={{
    //             uri: "https://cdn.pixabay.com/photo/2018/02/20/14/51/menu-3167859_960_720.jpg",
    //           }}
    //         >
    //           <View
    //             style={{
    //               flex: 1,
    //               flexDirection: "row",
    //               justifyContent: "flex-end",
    //             }}
    //           >
    //             <View>
    //               <FlatList
    //                 // horizontal
    //                 renderItem={renderImages}
    //                 data={ImagesData}
    //               ></FlatList>
    //             </View>
    //           </View>
    //           {/* <Image
    //       style={{

    //       }}
    //       source={{
    //       uri:'https://images.pexels.com/photos/7997808/pexels-photo-7997808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    //       }}
    //       >

    //       </Image> */}
    //         </ImageBackground>
    //         {showStarters && <Starters setshowStarters={setshowStarters} />}
    //         {showmaincourse && (
    //           <MainCourse setshowmaincourse={setshowmaincourse} />
    //         )}
    //         {showsmoothies && <Smoothies setshowsmoothies={setshowsmoothies} />}
    //         {showIcecream && <IceCream setshowIcecream={setshowIcecream} />}
    //       </View>
    //     </SafeAreaProvider>
    //   )}
    // </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    // borderTopColor:'white',
    paddingTop: 2,
    marginTop: 0.4,
    // borderTopWidth:0.2,
    backgroundColor: "black",
    textAlign: "center",
    fontSize: 20,
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    // fontFamily:'Verdana'
  },
  body: {
    flex: 1,
    backgroundColor: "black",
    marginTop: 1,
  },
});
