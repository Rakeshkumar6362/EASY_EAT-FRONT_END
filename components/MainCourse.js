import React from "react";
import { StyleSheet, Text, View, Modal, ImageBackground } from "react-native";
import { Button } from "react-native-paper";

const MainCourse = ({navigation}) => {
  return (
    <View style={{
        backgroundColor:'#ffffff',
        height:'100%'
    }}>  
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop:'10%',
          backgroundColor: "#ffffff",
          height: "65%",
        }}
      >
        <ImageBackground
          source={{
            uri: "https://img.etimg.com/photo/msid-87491348/giphy.jpg",
          }}
          style={{
            height: "75%",
            width: "100%",
          }}
        ></ImageBackground>
      </View>
      <Text style={{
          textAlign:'center',
          fontWeight:'bold',
          fontSize:20,
          marginBottom:'auto'
      }}>
          FOOD ON WAY
      </Text>
      <Button mode="contained" icon={'arrow-right'} contentStyle={{
          flexDirection:'row-reverse',
        //   justifyContent:'flex-start',
          height:50
      }}
      onPress={()=>navigation.navigate('home')}
      color="dodgerblue"> 
          Order More
      </Button>
    </View>

  );
};

export default MainCourse;

const styles = StyleSheet.create({});
