import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Dimensions } from "react-native";
import { Button } from "react-native-material-ui";
import { connect } from "react-redux";
import { GetCategories } from "../services/fetch";

type Props = { navigation: any; SocketConfig: Object; User: object };

const { width } = Dimensions.get("screen");
const Categories = (props: Props) => {
  const { navigation, SocketConfig, User } = props;
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    // SocketConfig.socket.emit("GETTABLENAMES");
    // SocketConfig.socket.emit("GETGROUPS", User);
    HandleGetCategories();
  }, []);

  const HandleGetCategories = () => {
    const branch = User.userInfo.config.brancheId;
    GetCategories(branch, (callback: Function) => {
      callback.tabs.sort(function (a, b) {
        if (a.tabname < b.tabname) {
          return -1;
        }
        if (a.tabname > b.tabname) {
          return 1;
        }
        return 0;
      });
      setCategories(callback.tabs);
    });
    // SocketConfig.socket.on("USER_ALL_CATEGORIES", (categoriesList: []) => {
    // });
  };

  const Item = (list: object) => {
    return (
      <View style={{ width: width/2 }}>
        <Button
          onPress={() => navigation.navigate("ProductList", { list })}
          text={list.item.tabname}
          rised
          key={list.item.tabname}
          style={{
            container: {
              backgroundColor: list.item.background,
              height: 70,
              margin: 9,
              borderRadius: 10,
            },
            text: {
              color: list.item.color,
            },
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.ScrollView}>
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={Item}
        keyExtractor={(item) => item.tabname}
        // style={styles.ScrollView}
      />
      <View style={{height: '41%'}}/>
    </SafeAreaView>
  );
};

function mapStateToProps(state: { SocketConfig: any; User: any }) {
  return {
    SocketConfig: state.SocketConfig,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
});
