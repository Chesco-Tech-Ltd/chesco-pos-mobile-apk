import React from "react";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { Card, Button, IconToggle } from "react-native-material-ui";
import { connect } from "react-redux";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Chip, Divider, Modal, Portal } from "react-native-paper";
import CartList from "./cartList";
import { getAllProduct, getExtraMessages } from "../services/fetch";

type Props = {
  dispatchEvent: Function;
  navigation: any;
  SocketConfig: Object;
  User: Object;
  Cart: Object;
  route: any;
  sides: Object;
  CartType: Object;
  CartReprint: Object;
};

const Cart = (props: Props) => {
  const [cartList, setCartList] = React.useState([]);
  const { navigation, Cart, sides, CartReprint } = props;
  const [visible, setVisible] = React.useState(false);
  const [sidesList, setSidesList] = React.useState([]);
  const [reprints, setReprints] = React.useState([]);
  const [SelectedProducts, setSelectedProducts] = React.useState();
  const [selectedProduct, setSelectedProduct] = React.useState([]);

  const [selectedItem, setSelectedItem] = React.useState<any>();
  const [messageList, setMessageList] = React.useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
  };

  const containerStyle2 = {
    backgroundColor: "white",
    padding: 10,
    margin: 20,
    borderRadius: 5,
  };

  React.useEffect(() => {
    if (sides.open) {
      setSidesList(sides.items);
    }
  }, [props]);

  React.useEffect(() => {
    getAllProduct((callback: any) => {
      const array = [];
      callback.products.map((list: any) => {
        list.id = list.productKey;
        list.title = list.ItemName;
        array.push(list);
      });
      setSelectedProduct(array);
      // console.log(array);
    });
  }, []);

  const getExtraMessagesList = () => {
    getExtraMessages((callback: Function) => {
      setMessageList(callback.extraMsg);
    });
  };

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={false}
        closeOnSubmit={false}
        // initialValue={{ id: "2" }} // or just '2'
        onSelectItem={(list) => {
          // console.log(list);
          if (list !== null) {
            list.isEditable = true;

            props.dispatchEvent({
              type: "ADDTOCART",
              payload: {
                items: list,
              },
            });
          }
        }}
        dataSet={selectedProduct}
        textInputProps={{
          placeholder: "Search Product...",
          autoCorrect: false,
          autoCapitalize: "none",
          style: {
            borderRadius: 25,
            borderColor: "#D9D9D9",
            backgroundColor: "#fff",
            borderWidth: 1,
            borderStyle: "solid",
            color: "#000",
            paddingLeft: 18,
          },
        }}
      />
      <ScrollView>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            flex: 1,
            padding: 2,
            justifyContent: "space-around",
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Name</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Total Price</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>Quantity</Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "red" }}>Remove</Text>
          </View>
        </View>

        {Cart.items.length === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ padding: 10, fontSize: 20 }}>Empty List</Text>
            <Button
              onPress={() => navigation.navigate("Products")}
              style={{
                container: {
                  backgroundColor: "#0072A8",
                },
                text: {
                  color: "#fff",
                },
              }}
              rised
              text={"Add products"}
            />
          </View>
        ) : null}

        {Cart.items.map((item: Object, i: React.Key | null | undefined) => {
          return (
            <Card style={{ padding: 8 }} key={i}>
              <View
                style={{
                  height: 90,
                  flexDirection: "row",
                  flex: 1,
                  padding: 2,
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    width: 110,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Image style={{width: 75, height: 75}} source={ item.src } /> */}
                  <Text style={{ color: "black" }}>{item.ItemName}</Text>
                </View>
                <View
                  style={{
                    width: 70,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 17 }}>
                    K {item.initalPrice * item.qnt}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconToggle
                    onPress={() => {
                      props.dispatchEvent({
                        type: "ADDQU",
                        items: Cart.items,
                        productKey: item.productKey,
                        amountInstore: item.amountInstore,
                        input: null,
                      });

                      let array = [];
                      array = CartReprint.item;

                      const index = array.findIndex(
                        (x: { productKey: any }) =>
                          x.productKey === item.productKey
                      );

                      if (index !== -1) {
                        array[index].toPrint++;
                      } else {
                        item.toPrint = 1;
                        array.push(item);
                      }
                      props.dispatchEvent({
                        type: "REPRINT",
                        items: array,
                      });
                      // setReprints(array);
                    }}
                    color="#000"
                    size={30}
                    name="add-circle"
                  />

                  <TextInput
                    underlineColorAndroid="transparent"
                    style={{
                      textAlign: "center",
                      fontSize: 26,
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                    keyboardType="numeric"
                    value={item.qnt.toString()}
                    editable={false}
                  />

                  <IconToggle
                    disabled={
                      item.isEditable
                        ? false
                        : item.initialQt === item.qnt
                        ? true
                        : false
                    }
                    onPress={() => {
                      props.dispatchEvent({
                        type: "REMOVEQU",
                        items: Cart.items,
                        productKey: item.productKey,
                        input: null,
                      });

                      let array = [];
                      array = CartReprint.item;

                      const index = array.findIndex(
                        (x: { productKey: any }) =>
                          x.productKey === item.productKey
                      );
                      if (index !== -1) {
                        array[index].toPrint--;
                        if (array[index].toPrint === 0) {
                          array.splice(index, 1);
                        }
                      }

                      props.dispatchEvent({
                        type: "REPRINT",
                        items: array,
                      });
                      // setReprints(array);
                    }}
                    color="#000"
                    size={28}
                    name="remove-circle-outline"
                  />
                </View>
                <IconToggle
                  disabled={!item.isEditable}
                  onPress={() => {
                    props.dispatchEvent({
                      type: "DELETEQU",
                      items: Cart.items,
                      productKey: item.productKey,
                      input: null,
                    });
                  }}
                  color="red"
                  size={40}
                  name="remove-circle"
                />
              </View>
              <View style={{ padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                <Divider />
              </View>
              <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                <Text>Extra Message</Text>
                <View style={{ width: 100 }}>
                  <Button
                    raised
                    onPress={() => {
                      setSelectedItem(item);
                      showModal();
                      getExtraMessagesList();
                    }}
                    text="Add"
                  />
                </View>

                <View style={{ padding: 10, width: "50%" }}>
                  {item.extraMsg ? (
                    <Chip
                      style={{ backgroundColor: "#FBDADA" }}
                      icon="information"
                      onPress={() => console.log("Pressed")}
                    >
                      {item.extraMsg}
                    </Chip>
                  ) : null}
                </View>
              </View>
            </Card>
          );
        })}
        <View
          style={{
            height: 360,
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={{ color: "#AAAAAA" }}>=== List End ===</Text>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          // onDismiss={hideModal}
          contentContainerStyle={containerStyle2}
        >
          <Text>Extra Messages</Text>
          <View
            style={{
              width: "100%",
              marginTop: 10,
              height: "60%",
              padding: 10,
            }}
          >
            <ScrollView style={{ padding: 10 }}>
              {messageList.map((list) => (
                <View style={{ margin: 10 }}>
                  <Button
                    primary
                    icon="restaurant"
                    raised
                    onPress={() => {
                      const index = Cart.items.findIndex(
                        (x: { productKey: any }) =>
                          x.productKey === selectedItem.productKey
                      );
                      if (Cart.items[index]) {
                        Cart.items[index].extraMsg = list.msg;
                        hideModal();
                      }
                    }}
                    text={list.msg}
                  />
                </View>
              ))}
            </ScrollView>
            <View style={{ marginRight: 10 }} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Button
              raised
              accent
              style={{ containerStyle: { width: 120 } }}
              onPress={hideModal}
              text="Close"
            />
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={sides.open}
          // onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Select sides</Text>
          <View
            style={{
              width: "100%",
              marginTop: 10,
              height: "90%",
            }}
          >
            <CartList />
            <View style={{ marginRight: 10 }} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Button
              raised
              accent
              style={{ containerStyle: { width: 120 } }}
              onPress={() =>
                props.dispatchEvent({
                  type: "HIDE",
                })
              }
              text="Close"
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

function mapStateToProps(state: {
  CartReprint: any;
  CartType: any;
  sides: any;
  Cart: any;
  SocketConfig: any;
  User: any;
}) {
  return {
    SocketConfig: state.SocketConfig,
    User: state.User,
    Cart: state.Cart,
    sides: state.sides,
    CartType: state.CartType,
    CartReprint: state.CartReprint,
  };
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
