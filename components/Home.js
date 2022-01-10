import { faBlackboard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  RefreshControl,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

//     id: 1,
//     image:
//       "https://media.istockphoto.com/photos/brushetta-set-and-glass-of-red-wine-small-sandwiches-with-picture-id544722402?k=20&m=544722402&s=612x612&w=0&h=lOdSmDFPS3ypiTmUnEkvTqRFd8dde7QZ07dVNLdIlgk=",
//     title: "Nandhini Deluxe",
//     subTitle: "Andhra, Biryani, chinese",
//   },
//   {
//     id: 2,
//     image:
//       "https://media.istockphoto.com/photos/roasted-whole-french-chicken-picture-id1192828034?k=20&m=1192828034&s=612x612&w=0&h=TUGYWNtQVV2DxjD1hKxHXbhAzj8s8bgupdx0RMo3EDo=",
//     title: "Chicking",
//     subTitle: "North Indian, kabab, chinese",
//   },
//   {
//     id: 3,
//     image:
//       "https://media.istockphoto.com/photos/four-kind-of-vegetable-juices-red-burgundy-orange-green-picture-id519553584?k=20&m=519553584&s=612x612&w=0&h=J5lncSHF5PhvKJx-foTM844QiIHxzDgfQIMirJ-DqEU=",
//     title: "BOX8 - Desi Meals",
//     subTitle: "North Indian, wraps, Fast Food",
//   },
//   {
//     id: 4,
//     image:
//       "https://media.istockphoto.com/photos/chocolate-ice-cream-in-a-glass-cup-picture-id936205852?k=20&m=936205852&s=612x612&w=0&h=PutImj427yDt5breC8CEFP4Tf-mMA1mHfZFG4XQH0Og=",
//     title: "Onesta",
//     subTitle: "Fast Food, Pizza, Pasta",
//   },
// ];
const Home = ({ navigation, route }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [restaurant, setRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [title, setTitle] = useState("");
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    getMenu();
  }, []);
  const getMenu = async () => {
    // await axios.get("http://localhost:3000/EASY_EAT")
    await axios
      .get("https://eat-easy.herokuapp.com/EASY_EAT/get")
      .then((data) => {
        setRestaurant(data.data);
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      setSearchText("");
      getMenu();
    });
  }, []);

  const searchRestaurant = () => {
    if (searchText.length) {
      let arr = [...restaurant];
      let arr1 = arr.filter((item) => {
        let name = item.title + item.subTitle;
        return name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      setRestaurant([...arr1]);
    } else {
      // setRestaurant(ImagesData);
      getMenu();
    }
  };
  useEffect(() => {
    if (searchText.length) {
      let arr = [...restaurant];
      let arr1 = arr.filter((item) => {
        let name = item.title + item.subTitle;
        return name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      setRestaurant([...arr1]);
    } else {
      // setRestaurant(ImagesDataget);
      getMenu();
    }
  }, [searchText]);
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 7000);
  }, []);
  const renderRestaurant = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          if (item._id === 1) {
            navigation.navigate("starters", {
              title: item.title,
              restaurantPhone: item.phoneNumber,
              phoneNumber: route.params.userData.phoneNumber,
              userName: route.params.userData.userName,
            });
          }
          if (item._id === 2) {
            navigation.navigate("starters", {
              title: item.title,
              restaurantPhone: item.phoneNumber,
              phoneNumber: route.params.userData.phoneNumber,
              userName: route.params.userData.userName,
            });
          }
          if (item._id === 3) {
            navigation.navigate("starters", {
              title: item.title,
              restaurantPhone: item.phoneNumber,
              userName: route.params.userData.userName,
              phoneNumber: route.params.userData.phoneNumber,
            });
          }
          if (item._id === 4) {
            navigation.navigate("starters", {
              title: item.title,
              restaurantPhone: item.phoneNumber,
              userName: route.params.userData.userName,
              phoneNumber: route.params.userData.phoneNumber,
            });
          }
        }}
      >
        <View
          style={{
            margin: 15,
            borderBottomColor: "black",
            borderLeftColor: "black",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={{
                height: 280,
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              borderLeftWidth: 1,
              borderLeftColor: "gray",
              borderRightWidth: 1,
              borderRightColor: "gray",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "left",
                fontWeight: "bold",
                paddingHorizontal: 10,
                paddingVertical: 5,
                //   marginLeft: 18,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontStyle: "italic",
              }}
            >
              {item.subTitle}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return showLoader ? (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: "#fcfefc",
      }}
      source={{
        uri: "https:c.tenor.com/2yQv-RptjeQAAAAC/fastfood.gif",
      }}
      resizeMode="contain"
    />
  ) : (
    <SafeAreaProvider>
      <SafeAreaView style={{}}>
        <StatusBar />

        {/* <View>
            <Text style={styles.heading}>WINE AND DINE</Text>
          </View> */}
      </SafeAreaView>
      <View
        style={{
          marginTop: 5,
          marginRight: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            backgroundColor: "green",
            // textAlign:'right',
            marginLeft: "auto",
            fontSize: 20,
            borderRadius: 50,
            width: 40,
            textAlign: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
            // padding:20
          }}
        >
          {route.params.userData.userName.charAt(0)}
        </Text>
      </View>

      <TextInput
        value={searchText}
        placeholder={"Restaurant name , cuisine, or a dish..."}
        onChangeText={(e) => setSearchText(e)}
        onSubmitEditing={searchRestaurant}
        style={{
          width: "95%",
          height: 40,
          borderColor: "gray",
          borderWidth: 1.5,
          borderRadius: 10,
          // margin: 'auto'
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          paddingHorizontal: 10,
          shadowColor: "black",
          shadowRadius: 10,
          marginVertical: 15,
        }}
      />

      <Text
        style={{
          fontSize: 20,
          marginLeft: 20,
          fontWeight: "bold",
        }}
      >
        {restaurant.length}{" "}
        {restaurant.length > 1 ? "Restaurants" : "Restaurant"} around you
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList data={restaurant} renderItem={renderRestaurant} />
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
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
});
