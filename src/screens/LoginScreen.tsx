import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { StatusBar } from "react-native";
import { OutlinedTextField } from "@freakycoder/react-native-material-textfield";
import { Button } from "react-native-material-ui";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Toolbar } from "react-native-material-ui";
import { IconToggle } from "react-native-material-ui";
import { Asset } from "expo-asset";
import LottieView from "lottie-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login } from "../services/fetch";
import { showMessage } from "react-native-flash-message";

const dateNow = new Date();
const year = dateNow.getFullYear();

type Props = {
  dispatchEvent: Function;
  navigation: any;
  SocketConfig: Object;
};

const LoginScreen = (props: Props) => {
  const { navigation, SocketConfig } = props;

  const [text, setText] = React.useState("");
  const [isSet, setIset] = React.useState(false);
  const [IP, setIP] = React.useState("");

  let fieldRef = React.createRef();

  const onSubmit = () => {
    let { current: field } = fieldRef;
    handleLogin(field.value());
  };

  const formatText = (text: string) => {
    return text.replace(/[^+\d]/g, "");
  };

  const OnTextChange = (text: React.SetStateAction<string>) => {
    setText(text);
  };

  const handleLogin = (data: any) => {
    Login(data, (callback: any) => {
      // console.log(callback);

      if (callback.isLoggedIn) {
        props.dispatchEvent({
          type: "SETUSER",
          userInfo: callback,
        });

        // SocketConfig.emit("UserConnected", { dep_name: callback.config.userName });
        
      } else {
        showMessage({
          message: "There was some errors with your submission",
          description: "We're sorry your account is not found",
          type: "danger",
        });
      }
    });
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("ServerConfig");
      if (value !== null) {
        setIset(true);
        // console.log(value);
        setIP(value);
        // value previously stored
      } else {
        // console.log("no value");
        setIset(false);
      }
    } catch (e) {
      // error reading value
    }
  };  

  React.useEffect(() => {
    getData();
    setTimeout(() => {
      // SocketConfig.socket.on("USER_DATA", data=>{
      //   console.log(data);
      // })
    }, 2000);
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor="#405E8A"
        barStyle="light-content"
      />
      {/* <View
        style={{
          height: StatusBar.currentHeight,
          width: "100%",
          backgroundColor: "#405E8A",
        }}
      /> */}
      <Toolbar
        centerElement="Chesco Pos"
        rightElement={
          <View style={{ flexDirection: "row" }}>
            <IconToggle
              // style={{ paddingTop: 10 }}
              onPress={() =>
                props.dispatchEvent({
                  type: "REFRESH_NET",
                  loadType: "refresh_conn",
                })
              }
              name="refresh"
              color="#fff"
            />
            <IconToggle
              // style={{ paddingTop: 10 }}
              onPress={() => navigation.navigate("Server_setup")}
              name="settings"
              color="#fff"
            />
          </View>
        }
        style={{ container: { backgroundColor: "#7A8DA4" } }}
      />
      <ImageBackground
        source={{
          uri: Asset.fromModule(require("../../assets/img/bglogin.png")).uri,
        }}
        style={styles.image}
      >
        <View style={styles.card}>
          <View style={{ marginBottom: moderateScale(15) }}>
            <Text
              style={{ color: "#F7F9FA", textAlign: "center", fontSize: 18 }}
            >
              Welcome{" "}
            </Text>
            <Text style={{ color: "#F7F9FA", textAlign: "center" }}>
              Chesco Pos Mobile{" "}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: verticalScale(250),
              marginTop: moderateScale(10),
              backgroundColor: "#fff",
              borderRadius: 20,
            }}
          >
            <ScrollView
              style={{ height: "100%" }}
              contentContainerStyle={{
                width: "100%",
                height: verticalScale(300),
                paddingVertical: 20,
                // marginTop: moderateScale(30),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#3E3D32",
                }}
              >
                Login to continue
              </Text>
              <View
                style={{
                  padding: moderateScale(10),
                  marginTop: moderateScale(10),
                }}
              >
                <OutlinedTextField
                  label="Enter your pin"
                  // keyboardType="phone-pad"
                  // formatText={formatText}
                  onChangeText={OnTextChange}
                  onSubmitEditing={onSubmit}
                  ref={fieldRef}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(10),
                  marginTop: moderateScale(5),
                }}
              >
                <Button
                  disabled={isSet ? false : true}
                  raised
                  onPress={() => {
                    handleLogin(text);
                  }}
                  primary
                  text="Login"
                />
                {isSet ? null : (
                  <View style={{ marginTop: moderateScale(10) }}>
                    <Text style={{ color: "red", textAlign: "center" }}>
                      Server IP address is not set, Please set the IP
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          {/* {SocketConfig.isCon ? (
            <View
              style={{
                width: "100%",
                height: verticalScale(250),
                marginTop: moderateScale(10),
                backgroundColor: "#fff",
                borderRadius: 20,
              }}
            >
              <ScrollView
                style={{ height: "100%" }}
                contentContainerStyle={{
                  width: "100%",
                  height: verticalScale(300),
                  paddingVertical: 20,
                  // marginTop: moderateScale(30),
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#3E3D32",
                  }}
                >
                  Login to continue
                </Text>
                <View
                  style={{
                    padding: moderateScale(10),
                    marginTop: moderateScale(10),
                  }}
                >
                  <OutlinedTextField
                    label="Enter your pin"
                    // keyboardType="phone-pad"
                    // formatText={formatText}
                    onChangeText={OnTextChange}
                    onSubmitEditing={onSubmit}
                    ref={fieldRef}
                  />
                </View>
                <View
                  style={{
                    padding: moderateScale(10),
                    marginTop: moderateScale(5),
                  }}
                >
                  <Button
                    disabled={isSet ? false : true}
                    raised
                    onPress={() => {
                      handleLogin(text);
                    }}
                    primary
                    text="Login"
                  />
                  {isSet ? null : (
                    <View style={{ marginTop: moderateScale(10) }}>
                      <Text style={{ color: "red", textAlign: "center" }}>
                        Server IP address is not set, Please set the IP
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          ) : (
            <View style={styles.cardErrorCon}>
              <View style={{ height: "100%", width: "100%" }}>
                <LottieView
                  source={require("../../assets/lottie/7989-server-backup.json")}
                  autoPlay
                  loop
                />
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "tomato",
                    textAlign: "center",
                  }}
                >
                  Server failed to connect!
                </Text>
                <Text
                  style={{
                    color: "#3E3D32",
                    textAlign: "center",
                  }}
                >
                  We'll automatically connect again once we're connected
                </Text>
              </View>
            </View>
          )} */}
        </View>
        <View style={{ width: "100%", margin: "auto" }}>
          <Text style={{ color: "#F7F9FA", textAlign: "center" }}>
            Copyrights of chesco tech
          </Text>
          <Text style={{ color: "#F7F9FA", textAlign: "center" }}>{year}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

function mapStateToProps(state: { SocketConfig: any }) {
  return {
    SocketConfig: state.SocketConfig,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F7F8F8",
    textAlign: "center",
  },
  background: {
    height: "100%",
    width: "100%",
  },
  contents: {
    width: "100%",
    height: "100%",
  },
  card: {
    height: verticalScale(400),
    marginTop: moderateScale(1),
    padding: moderateScale(20),
    textAlign: "center",
  },
  cardErrorCon: {
    height: verticalScale(200),
    padding: moderateScale(20),
  },
  image: {
    flex: 1,
    paddingTop: -20,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
