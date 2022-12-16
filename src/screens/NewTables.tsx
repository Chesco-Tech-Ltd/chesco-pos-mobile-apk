import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Toolbar, IconToggle, Button } from "react-native-material-ui";
import { connect } from "react-redux";
import { OutlinedTextField } from "@freakycoder/react-native-material-textfield";
import { default as NumberFormat } from "react-number-format";
import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import { showMessage } from "react-native-flash-message";

import POSStackScreen from "../roots";
import { SaveEditedTable, SaveTable } from "../services/fetch";

type Props = {
  dispatchEvent(arg0: { type: string }): unknown;
  navigation: any;
  SocketConfig: Object;
  CartReprint: Object;
  User: object;
  Cart: any;
  route: object;
};

const NewTables = (props: Props) => {
  const { navigation, CartReprint, User, Cart, route } = props;
  const [categories, setCategories] = React.useState([]);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [tableName, setTableName] = React.useState("");
  const [tableError, setTableError] = React.useState<string>("");

  const [visible, setVisible] = React.useState(false);
  const [loadingVisible, setLoadingVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20 };
  let fieldRef = React.createRef();

  const showModalLoading = () => setLoadingVisible(true);
  const hideModalLoading = () => setLoadingVisible(false);
  const containerStyleLoading = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
  };

  const routeType = () => {
    if (route.params.type === "edit") {
      props.dispatchEvent({
        type: "RESTATECART",
      });

      setTableName(route.params.table.name);
      // setGrandTotal(route.params.table.total);

      route.params.table.list.data.map((list: any) => {
        list.isEditable = false;
        list.initialQt = list.qnt;

        props.dispatchEvent({
          type: "ADDTOCART",
          payload: {
            items: list,
          },
        });
        
      });

      // props.dispatchEvent({
      //   type: "EDIT",
      // });
      // console.log(route.params.table);
    }
  };

  React.useEffect(() => {
    // SocketConfig.socket.emit("GETTABLENAMES");
    // SocketConfig.socket.emit("GETGROUPS", User);
    props.dispatchEvent({
      type: "RESTATECART",
    });
    
    GetCategories();
    routeType();
  }, []);

  React.useEffect(() => {
    CalculateTotal();
    // console.log(route.params.table.id);
  }, [props.Cart]);

  const GetCategories = () => {
    // SocketConfig.socket.on("USER_ALL_CATEGORIES", (categoriesList: []) => {
    //   setCategories(categoriesList);
    // });
  };

  const CalculateTotal = () => {
    var tempTotal = 0;
    // console.log(props.Cart.items);
    props.Cart.items.map((list: object) => {
      tempTotal = list.qnt * list.initalPrice + tempTotal;
    });

    setGrandTotal(tempTotal);
    // console.log(Math.round(tempTotal));
  };

  const handleSaveTable = () => {
    if (tableName !== "") {
      if (Cart.items.length === 0) {
        return setTableError("Error: Table list items can't be empty");
      } else {
        SubmitTable();
      }
    } else {
      setTableError("Error: Table name can't be empty");
    }
  };

  const onSubmit = () => {
    if (tableName !== "") {
      if (Cart.items.length === 0) {
        return setTableError("Error: Table list items can't be empty");
      } else {
        SubmitTable();
      }
    } else {
      setTableError("Error: Table name can't be empty");
    }
  };

  const SubmitTable = () => {
    let user = User.userInfo.config.userName,
      table: string,
      total: number,
      cart: [],
      tableKey: string;

    table = tableName;
    total = grandTotal;
    cart = Cart.items;
    tableKey = route.params.type === "edit" ? route.params.table.id : "";

    showModalLoading();

    if (route.params.type === "edit") {
      let rePrint = CartReprint.item;

      SaveEditedTable(
        table,
        cart,
        total,
        rePrint,
        tableKey,
        (callback: any) => {
          hideModalLoading();

          if (callback.isSet) {
            hideModal();

            props.dispatchEvent({
              type: "RESTATECART",
            });

            props.dispatchEvent({
              type: "RESET_UPDATED_TABLE",
            });

            showMessage({
              message: "Saved Successfully",
              description: "We have Saved the table Successfully",
              type: "success",
            });
          } else {
            showMessage({
              message: "Error saving table",
              description:
                "We're sorry this table already exists. Please chose a different table name",
              type: "danger",
            });
          }
        }
      );
      // SocketConfig.socket.emit("UPDATE_TABLE", {
      //   user: User,
      //   table: tableName,
      //   cart: Cart.items,
      // });

      // SocketConfig.socket.on("TABLES_EDITED", (info: any) => {
      //   if (info.tableInfo.length === 0) {
      //     showMessage({
      //       message: "Error saving table",
      //       description:
      //         "We're sorry this table already exists. Please chose a different table name",
      //       type: "danger",
      //     });
      //     hideModalLoading();
      //   } else {
      //     hideModal();
      //     hideModalLoading();

      //     props.dispatchEvent({
      //       type: "RESTATECART",
      //     });

      //     showMessage({
      //       message: "Saved Successfully",
      //       description: "We have Saved the table Successfully",
      //       type: "success",
      //     });
      //   }
      // });
    } else {
      SaveTable(user, table, total, cart, (callback: any) => {
        hideModalLoading();

        if (callback.isSet) {
          hideModal();

          props.dispatchEvent({
            type: "RESTATECART",
          });

          props.dispatchEvent({
            type: "RESET_UPDATED_TABLE",
          });

          showMessage({
            message: "Saved Successfully",
            description: "We have Saved the table Successfully",
            type: "success",
          });
        } else {
          showMessage({
            message: "Error saving table",
            description:
              "We're sorry this table already exists. Please chose a different table name",
            type: "danger",
          });
        }
      });
      // SocketConfig.socket.emit("SAVETABLE", {
      //   user: User,
      //   table: tableName,
      //   total: grandTotal,
      //   cart: Cart.items,
      // });

      // SocketConfig.socket.on("TABLESAVED", (info: any) => {
      //   if (info.tableInfo.length === 0) {
      //     showMessage({
      //       message: "Error saving table",
      //       description:
      //         "We're sorry this table already exists. Please chose a different table name",
      //       type: "danger",
      //     });
      //   } else {
      //     hideModal();

      //     props.dispatchEvent({
      //       type: "RESTATECART",
      //     });

      //     showMessage({
      //       message: "Saved Successfully",
      //       description: "We have Saved the table Successfully",
      //       type: "success",
      //     });
      //   }
      // });
    }
  };
  const username = User.userInfo.config.userName;
  const hearder_txt = "New Table | " + username
  
  return (
    <Provider>
      <View>
        <Toolbar
          leftElement={
            <IconToggle
              onPress={() => navigation.navigate("Tables")}
              name="arrow-back-ios"
              color="#fff"
            />
          }
          centerElement={hearder_txt}
          onRightElementPress={(label: string) => {
            // console.log(label);
          }}
          style={{ container: { backgroundColor: "tomato" } }}
        />
        <View style={styles.display}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#FDFDFD",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 28 }}>K {grandTotal}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>Table: </Text>
              <Text style={{ fontSize: 20, color: "tomato" }}>{tableName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                raised
                onPress={() => navigation.navigate("Cart")}
                text="Cart List"
              />
              <Button
                raised
                onPress={() => navigation.navigate("Products")}
                text="Products"
              />
              <Button
                primary
                onPress={() => {
                  if (route.params.type === "edit") onSubmit();
                  else showModal();
                }}
                raised
                text="Save table"
              />
            </View>
          </View>
          <View></View>
        </View>

        <Portal>
          <Modal
            visible={loadingVisible}
            // onDismiss={hideModal}
            contentContainerStyle={containerStyleLoading}
          >
            <Text>Saving please wait...</Text>
            <View style={{ marginTop: 10 }}></View>
          </Modal>

          <Modal
            visible={visible}
            // onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Enter Table Name </Text>
            <View style={{ marginTop: 10 }}>
              <OutlinedTextField
                label="Table name"
                onChangeText={setTableName}
                onSubmitEditing={onSubmit}
                ref={fieldRef}
              />
              {tableError ? (
                <Text style={{ color: "red" }}>{tableError}</Text>
              ) : null}
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
                primary
                onPress={() => handleSaveTable()}
                text={
                  route.params.type === "edit"
                    ? "Save Edited Table"
                    : "Save Table"
                }
              />
              <View style={{ marginRight: 10 }} />
              <Button raised accent onPress={() => hideModal()} text="Cancel" />
            </View>
          </Modal>
        </Portal>

        <View style={{ height: "100%" }}>
          <POSStackScreen />
        </View>
      </View>
    </Provider>
  );
};

function mapStateToProps(state: {
  RefreshTables: any;
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
    RefreshTables: state.RefreshTables,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTables);

const styles = StyleSheet.create({
  display: {
    backgroundColor: "#E5E5E5",
    height: 113,
    border: "none",
    borderBottomColor: "#C6C6C6",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  ScrollView: {
    flexDirection: "row",
  },
});
