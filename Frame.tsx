import React from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { showMessage } from "react-native-flash-message";

window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

import MaterialBottomTabNavigator from "./src/RootBottomNav";
import RootStackScreen from "./src/RootLoginNav";

type Props = {
  Actions: any;
  dispatchEvent: Function;
};

const AppFrame = (props: Props) => {
  const [isLogedIn, setIsLogedIn] = React.useState(false);
  const [Load, setLoad] = React.useState(true);
  const [socket, setSocket] = React.useState();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("ServerConfig");
      if (value !== null) {
        setSocket(io(`http://${value}:3200`, { jsonp: false }));
        const socketIo = io(`http://${value}:3200`, { jsonp: false });

        // console.log(io(`https://switch-smart.herokuapp.com/`, { jsonp: false }));

        socketIo.on("connect", () => {
          // console.log("connect");
          props.dispatchEvent({
            type: "SocketConnected",
            payload: socketIo,
          });
        });

        socketIo.on("disconnect", () => {
          // socketIo.emit("disconnect", {});
          // console.log("dis-connect");
          props.dispatchEvent({
            type: "SocketDisconnceted",
            payload: {},
          });
        });

        // socketIo.on(
        //   "USER_DATA",
        //   (data: { isLoggedIn: any; config: { userName: any } }) => {
        //     // console.log(data);
        //     if (data.isLoggedIn) {
        //       props.dispatchEvent({
        //         type: "SETUSER",
        //         userInfo: data.config,
        //       });

        //       socketIo.emit("UserConnected", {
        //         dep_name: data.config.userName,
        //       });

        //       setTimeout(() => {
        //         setIsLogedIn(true);
        //       }, 700);
        //     } else {
        //       showMessage({
        //         message: "There was some errors with your submission",
        //         description: "We're sorry your account is not found",
        //         type: "danger",
        //       });
        //     }
        //     // props.dispatchEvent({
        //     //   type: "SocketDisconnceted",
        //     //   payload: {},
        //     // });
        //   }
        // );
      } else {
        props.dispatchEvent({
          type: "SocketDisconnceted",
          payload: {},
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    if (Load) {
      getData();
      setLoad(false);
    }

    if (props.User.isSet) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }

    if (props.Actions.isWorking) {
      if (props.Actions.loadType === "refresh_conn") {
        // getData();
        props.dispatchEvent({
          type: "RESET_ACTION",
          loadType: "",
        });
      }
    }
  }, [props]);

  // return <MaterialBottomTabNavigator />;
  if (isLogedIn) return <MaterialBottomTabNavigator />;
  else return <RootStackScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapStateToProps(state: {
  User: any;
  SocketConfig: any;
  Actions: any;
}) {
  return {
    SocketConfig: state.SocketConfig,
    Actions: state.Actions,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);
