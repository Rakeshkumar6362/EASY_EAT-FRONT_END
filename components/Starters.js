import axios from "axios";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";
import { Switch } from "react-native-elements/dist/switch/switch";
// import { Icon } from "react-native-vector-icons/icon";

const Starters = ({ setshowStarters = () => {}, navigation, route }) => {
  const [isEnabled, setisEnabled] = useState(true);
  const [isNonEnabled, setIsNonEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [renderMenuItems, setRenderMenuItems] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [showCount, setShowCount] = useState(false);
  const [showAdd, setshowAdd] = useState(true);
  const [title, setTitle] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [vegMenu, setVegMenu] = useState([]);
  const [nonVegMenu, setNonVegMenu] = useState([]);

  useEffect(() => {
    if (route.params) {
      setTitle(route.params.title);
    }
  }, [route.params?.title]);
  useEffect(async () => {
    await axios
      .get("https://eat-easy.herokuapp.com/EASY_EAT/get")
      .then((data) => {
        data &&
          data.data.forEach((ele) => {
            if (route.params.title === ele.title) {
              setVegMenu(ele.vegMenu);
              setNonVegMenu(ele.nonVegMenu);
            }
          });
      });
  }, [refreshing]);
  useEffect(() => {
    if (isEnabled && !isNonEnabled) {
      setRenderMenuItems([...vegMenu]);
    }
    if (isNonEnabled && !isEnabled) {
      setRenderMenuItems([...nonVegMenu]);
    }
    if (isEnabled && isNonEnabled) {
      setRenderMenuItems([...nonVegMenu, ...vegMenu]);
    }
    if (!isNonEnabled && !isEnabled) {
      setRenderMenuItems([]);
    }
  }, [isNonEnabled, isEnabled, vegMenu, nonVegMenu]);
  const renderVeg = () => {
    setisEnabled(!isEnabled);
  };
  const renderNonVeg = () => {
    setIsNonEnabled(!isNonEnabled);
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      setRenderMenuItems([...vegMenu]);
      setIsNonEnabled(false);
      setisEnabled(true);
    });
  }, []);

  const searchMenu = () => {};
  useEffect(() => {
    setTimeout(() => {
      setShowActivity(false);
    }, 2000);
  }, []);
  useEffect(() => {
    if (searchText.length) {
      let arr = [...renderMenuItems];
      let arr1 = arr.filter(
        (item) =>
          item.name.toLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1
      );
      setRenderMenuItems(arr1);
    } else {
      if (isEnabled && !isNonEnabled) {
        setRenderMenuItems([...vegMenu]);
      }
      if (isNonEnabled && !isEnabled) {
        setRenderMenuItems([...nonVegMenu]);
      }
      if (isEnabled && isNonEnabled) {
        setRenderMenuItems([...nonVegMenu, ...vegMenu]);
      }
      if (!isNonEnabled && !isEnabled) {
        setRenderMenuItems([]);
      }
    }
  }, [searchText]);

  const renderCart = () => {
    let temp = 0;
    let price = 0;
    renderMenuItems.map((ele) => {
      if (ele.count > 0) {
        temp += ele.count;
        price += ele.price * ele.count;
      }
    });
    if (temp > 0) {
      return (
        <Pressable
          onPress={
            () => {
              let temp = [];
              renderMenuItems.forEach((ele) => {
                if (ele.count > 0) {
                  temp.push(ele);
                }
              });
              setCartItems([...temp]);
              // navigation.goBack();
              navigation.navigate("cart", {
                title: route.params.title,
                cartItems: temp,
                restaurantPhone:route.params.restaurantPhone,
                phoneNumber:route.params.phoneNumber,
                userName:route.params.userName
              });
            }
            // setshowStarters(false)
          }
        >
          <View
            style={{
              backgroundColor: "dodgerblue",
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                }}
              >
                {temp} ITEMS
              </Text>
              <Text
                style={{
                  color: "white",
                }}
              >
                {price} plus taxes
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  color: "white",
                  fontSize: 20,
                }}
              >
                Next
              </Text>
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Icon
                  type="antdesign"
                  size={20}
                  name="arrowright"
                  color="white"
                />
              </View>
            </View>
          </View>
        </Pressable>
      );
    }
  };

  const renderVegMenu = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 4,
          borderBottomWidth: 0.3,
          marginBottom: 10,
          marginHorizontal: 10,
          borderBottomColor: "grey",
        }}
      >
        <View
          style={{
            width: "50%",
            //   marginBottom:5
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}
          >{`₹ ${item.price}`}</Text>
          <Text
            style={{
              fontSize: 15,
              color: "gray",
              marginBottom: 25,
            }}
          >
            {item.description}
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              height: 100,
              marginTop: 4,
              marginBottom: 5,
              width: 100,
              borderRadius: 10,
            }}
          />
          {/* <TouchableOpacity
            style={{
              backgroundColor: "dodgerblue",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginBottom: 20,
            }}
          > */}
          {item.count === 0 && (
            <Text
              onPress={() => {
                let arr = renderMenuItems;
                setRenderMenuItems(
                  arr.map((ele) => {
                    if (ele._id == item._id) {
                      ele.count = ele.count + 1;
                    }
                    return ele;
                  })
                );
              }}
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 15,
                backgroundColor: "dodgerblue",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
            >
              ADD +
            </Text>
          )}
          {item.count >= 1 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "dodgerblue",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  let arr = [...renderMenuItems];
                  if (item.count >= 1) {
                    setRenderMenuItems([
                      ...arr.map((ele) => {
                        if (ele._id === item._id) {
                          ele.count = ele.count - 1;
                        }
                        return ele;
                      }),
                    ]);

                    // setRenderMenuItems((item) => {
                    //   ({
                    //     ...item,
                    //     count:--item.count
                    //   })
                    // });
                  }
                  arr.map((ele) => {
                    if (ele.id === item.id) {
                      if (ele.count === 1) {
                        setShowCount(false);
                        setshowAdd(true);
                      }
                    }
                  });
                }}
              >
                -
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}
              >
                {item.count}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  if (item.count >= 1) {
                    // setRenderMenuItems((item) => {
                    //   ({
                    //     ...item,
                    //     count:++item.count
                    //   })
                    // });
                    let arr = [...renderMenuItems];
                    setRenderMenuItems([
                      ...arr.map((ele) => {
                        if (ele._id === item._id) {
                          ele.count = ele.count + 1;
                        }
                        return ele;
                      }),
                    ]);
                  }
                }}
              >
                +
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      {showActivity ? (
        <ImageBackground
          resizeMode="contain"
          source={{
            uri: "https://htmlburger.com/blog/wp-content/uploads/2021/07/The-Best-50-Website-Preloaders-Around-the-Web-Example-07a.gif",
          }}
          style={{
            flex: 1,
            backgroundColor: "#fbfbfb",
          }}
        ></ImageBackground>
      ) : (
        <>
          <View
            style={{
              width: 30,
              paddingLeft: 7,
              alignItems: "flex-start",
              backgroundColor: "#fffff",
              // marginLeft: "auto",
              paddingTop: 3,
              flexDirection: "row",
              justifyContent: "flex-start",
              //   marginBottom: 15,
            }}
          >
            <Icon
              type="antdesign"
              size={30}
              name="arrowleft"
              color="black"
              onPress={
                () => navigation.navigate("home")
                // setshowStarters(false)
              }
            />
          </View>
          <Text
            style={{
              color: "black",
              fontSize: 22,
              fontWeight: "normal",
              paddingTop: 4,
              paddingLeft: 7,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 7,
              color: "gray",
              marginBottom: 10,
            }}
          >
            We’re always in the mood for food
          </Text>
          <View
            style={{
              paddingLeft: -10,
            }}
          >
            <TextInput
              value={searchText}
              placeholder={"Search within the menu..."}
              onChangeText={(e) => setSearchText(e)}
              onSubmitEditing={searchMenu}
              style={{
                width: "95%",
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                // margin: 'auto'
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 10,
                shadowColor: "black",
                shadowRadius: 10,
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingLeft: 7,
            }}
          >
            <Switch
              thumbColor={isEnabled ? "green" : "grey"}
              trackColor={{
                false: "grey",
                true: "#90ee90",
              }}
              onValueChange={renderVeg}
              value={isEnabled}
            />
            <Text
              style={{
                marginTop: 12,
                marginRight: 20,
              }}
            >
              Veg
            </Text>
            <Switch
              trackColor={{
                false: "grey",
                true: "#ffcccb",
              }}
              thumbColor={isNonEnabled ? "red" : "grey"}
              onValueChange={renderNonVeg}
              value={isNonEnabled}
            />
            <Text
              style={{
                marginTop: 12,
              }}
            >
              Non-Veg
            </Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {renderMenuItems.length ? (
              <>
                <FlatList
                  keyExtractor={(item, index) => index + 1}
                  data={renderMenuItems}
                  renderItem={renderVegMenu}
                ></FlatList>
              </>
            ) : isNonEnabled || isEnabled ? (
              <ActivityIndicator
                color={"blue"}
                size={"large"}
                style={{
                  marginTop: 250,
                }}
              />
            ) : (
              <Image
                source={{
                  uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b52cad60636009.5a5478f0990fa.gif",
                }}
                style={{
                  height: 500,
                  width: "100%",
                }}
              ></Image>
            )}
          </ScrollView>

          <View>{renderCart()}</View>
        </>
      )}
    </View>
  );
};

export default Starters;

const styles = StyleSheet.create({});
