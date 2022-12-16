import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Button, Badge } from "react-native-material-ui";

type Props = {
  dispatchEvent: Function;
  navigation: any;
  SocketConfig: Object;
  Cart: Object;
  route: Object;
  User: Object;
  sides: Object;
};

const CartList = (props: Props) => {
  const { sides, Cart } = props;
  const [productsList, setProducts] = React.useState([]);

  const Item = (list: object) => {
    let badgeCount = 0;
    const index = Cart.items.findIndex(
      (x: { productKey: any }) => x.productKey === list.item.productKey
    );
    if (Cart.items[index]) {
      badgeCount = Cart.items[index].qnt;
    }

    return (
      <View>
        <Badge
          size={24}
          text={badgeCount.toString()}
          style={{
            container: {
              right: -1,
              display: badgeCount === 0 ? "none" : "flex",
            },
          }}
        >
          <Button
            onPress={() => {
              props.dispatchEvent({
                type: "ADDTOCART",
                payload: {
                  items: list.item,
                },
              });
            }}
            text={list.item.ItemName}
            rised
            key={list.item.productKey}
            style={{
              container: {
                backgroundColor: "#3b3b3b",
                height: 70,
                width: 140,
                margin: 9,
                borderRadius: 10,
              },
              text: {
                color: "#fff",
              },
            }}
          />
        </Badge>
      </View>
    );
  };

  return (
    <FlatList
      data={sides.items}
      numColumns={2}
      renderItem={Item}
      keyExtractor={(item) => item.productKey}
      //   style={styles.ScrollView}
    />
  );
};

function mapStateToProps(state: {
  sides: any;
  Cart: any;
  SocketConfig: any;
  User: any;
}) {
  return {
    sides: state.sides,
    Cart: state.Cart,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },
});
