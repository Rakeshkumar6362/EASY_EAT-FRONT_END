import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { Button, TextInput } from "react-native-paper";
const Cart = ({ navigation, route }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (route.params?.cartItems) {
      setCartItems(route.params?.cartItems);
    }
  }, [route.params.cartItems]);
  const renderCart = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            ₹{item.price}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              // padding:10
            }}
          >
            <Text
              style={{
                paddingHorizontal: 10,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Quantity : {item.count}
            </Text>
          </View>
          <View>
            <Text
              style={{
                paddingHorizontal: 10,
                fontWeight: "bold",
                marginBottom: 5,
                textAlign: "right",
                // justifyContent:'flex-end',
                // flexDirection:'row'
              }}
            >
              {" "}
              ₹{item.count * item.price}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const priceMenu = () => {
    let arr = [...cartItems];
    let totalprice = 0;

    arr.forEach((ele) => {
      totalprice += ele.count * ele.price;
    });
    let taxes = ((18*totalprice)/100).toFixed(2)
    let grandTotal = (parseInt(totalprice) + parseFloat(taxes)).toFixed(2)
    return (
      <View style={{
          paddingHorizontal:10,
          paddingVertical:10,
          backgroundColor:"white",
          marginBottom:5
      }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom:5
          }}
        >
          <Text style={{
              fontSize:15
          }}>Item Total</Text>
          <Text style={{
              color:"gray"
          }}>₹{totalprice}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom:5

          }}
        >
          <Text style={{
              color:"gray"
          }}>Taxes and Restaurant charges</Text>
          <Text style={{
              color:"gray"
          }}>₹{taxes}</Text>
        </View>
        <View
        style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom:5,
            marginTop:5
          }} >
          <Text  style={{
              color:'black',
              fontSize:16,
              fontWeight:'bold',
            }}>Grand Total</Text>
          <Text
           style={{
             color:'black',
             fontSize:16,
            fontWeight:'bold'
        }}>₹{grandTotal}</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <StatusBar />
        </SafeAreaView>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              //   width: 30,
              paddingHorizontal: 7,
              paddingBottom: 15,
              alignItems: "flex-start",
              // marginLeft: "auto",
              //   paddingTop: 3,
              flexDirection: "row",
              justifyContent: "flex-start",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              //   marginBottom: 15,
            }}
          >
            <Icon
              type="antdesign"
              size={20}
              name="arrowleft"
              color="black"
              onPress={() =>
                navigation.navigate("starters", { title: route.params.title })
              }
            />
            <Text
              style={{
                fontSize: 15,
                paddingHorizontal: 10,
                width: "100%",
                fontWeight: "bold",
                // paddingBottom:10,
              }}
            >
              {route.params.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Icon
              type="font-awesome"
              size={20}
              name="location-arrow"
              color="black"
              onPress={
                () => navigation.navigate("home")
                // setshowStarters(false)
              }
            />
            <Text
              style={{
                paddingHorizontal: 5,
              }}
            >
              Delivery at Work -2nd floor, Banashankari 3rd stage,Banashankari
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Icon
              type="material"
              size={20}
              name="timer"
              color="black"
              onPress={
                () => navigation.navigate("home")
                // setshowStarters(false)
              }
            />
            <Text
              style={{
                paddingHorizontal: 5,
              }}
            >
              Delivery in 30 mins.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Icon
              type="material"
              size={20}
              name="restaurant"
              color="black"
              onPress={
                () => navigation.navigate("home")
                // setshowStarters(false)
              }
            />
            <Text
              style={{
                paddingHorizontal: 5,
              }}
            >
              Always Send cutlery to this address
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              marginVertical: 20,
              paddingHorizontal: 10,
              paddingVertical: 20,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              Your Cart
            </Text>
            <FlatList data={route.params.cartItems} renderItem={renderCart} />
          </View>
          <View style={{
              marginBottom:10
          }}>{priceMenu()}</View>
          <View style={{
              backgroundColor:'white',
              paddingHorizontal:10,
              
          }}>
           <Text style={{
               fontWeight:"bold",
               fontSize:18,
               paddingTop:20
           }}>
               Delivery Instructions
           </Text>
           <Text style={{
               color:'gray',
               paddingBottom:30,
               paddingTop:10,
               lineHeight:20
           }}>
               The Restaurant is using theor own delivery partner to deliver this order. You can call them to give any delivery instruction after placing order
           </Text>
          </View>
        </ScrollView>
        {/* <IconButton >asgsdfgh

        </IconButton> */}
        <Button mode="contained" icon={'arrow-right'} theme={'dodgerblue'} dark={true} color="dodgerblue" contentStyle={{
          flexDirection:'row-reverse',
          justifyContent:'flex-start',
          height:50
        }}
        onPress={()=>{
          // navigation.goBack()
          navigation.navigate('placeOrder')
        }}
        >
          Place Order
        </Button>
      </SafeAreaProvider>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({});
