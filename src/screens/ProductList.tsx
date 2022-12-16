import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Button, IconToggle } from "react-native-material-ui";
import { GetProductsByCategories, GetSideProducts } from "../services/fetch";

type Props = {
  dispatchEvent: Function;
  navigation: any;
  SocketConfig: Object;
  route: Object;
  User: Object;
  CartReprint: Object;
};

const { width } = Dimensions.get("screen");

const ProductList = (props: Props) => {
  const { navigation, route, SocketConfig, User, CartReprint } = props;
  const [productsList, setProducts] = React.useState([]);

  React.useEffect(() => {
    // SocketConfig.socket.emit("GET_PRODUCTS_BY_CATEGORY", {
    //   user: User,
    //   category: route.params.list.item.tabname,
    // });
    // SocketConfig.socket.on("LIST_PRODUCTS", (products: any) => {
    //   setProducts(products);
    // });
    handleProducts();
  }, []);

  const handleProducts = () => {
    const category = route.params.list.item.tabname;
    GetProductsByCategories(category, (callback: Function) => {
      callback.products.sort(function (a, b) {
        if (a.ItemName < b.ItemName) {
          return -1;
        }
        if (a.ItemName > b.ItemName) {
          return 1;
        }
        return 0;
      });
      setProducts(callback.products);
    });
  };

  const Item = (list: object) => {
    return (
      <View style={{ width: width / 2 }}>
        <Button
          onPress={() => {
            list.item.isEditable = true;

            if (list.item.isMulity) {
              const prod_id = list.item.productKey;
              GetSideProducts(prod_id, (callback: Function) => {
                props.dispatchEvent({
                  type: "ADDTOCART",
                  payload: {
                    items: list.item,
                  },
                });
                props.dispatchEvent({
                  type: "SHOW",
                  payload: {
                    items: callback.products,
                  },
                });
                let array = [];
                array = CartReprint.item;

                list.item.toPrint = 1;
                array.push(list.item);

                props.dispatchEvent({
                  type: "REPRINT",
                  items: array,
                });

                navigation.navigate("Cart", { isMulity: list.item.isMulity });
              });
            } else {
              // props.dispatchEvent({
              //   type: "REPRINT",
              //   items: array,
              // });
              let array = [];
              array = CartReprint.item;

              list.item.toPrint = 1;
              array.push(list.item);

              props.dispatchEvent({
                type: "REPRINT",
                items: array,
              });

              props.dispatchEvent({
                type: "ADDTOCART",
                payload: {
                  items: list.item,
                },
              });

              navigation.navigate("Cart", { isMulity: list.item.isMulity });
            }
          }}
          text={list.item.ItemName}
          rised
          key={list.item.productKey}
          style={{
            container: {
              backgroundColor: "#3b3b3b",
              height: 60,
              margin: 9,
              borderRadius: 10,
            },
            text: {
              color: "#fff",
            },
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.ScrollView}>
      <View style={{ flexDirection: "row" }}>
        <IconToggle onPress={() => navigation.goBack()} name="arrow-back-ios" />
        <Text style={{ marginTop: 13 }}>Product list</Text>
      </View>
      <FlatList
        data={productsList}
        numColumns={2}
        renderItem={Item}
        keyExtractor={(item) => item.productKey}
        style={styles.ScrollView}
      />
      <View style={{ height: "41%" }} />
    </SafeAreaView>
  );
};

function mapStateToProps(state: {
  CartReprint: any;
  Cart: any;
  SocketConfig: any;
  User: any;
}) {
  return {
    SocketConfig: state.SocketConfig,
    User: state.User,
    Cart: state.Cart,
    CartReprint: state.CartReprint,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
});
