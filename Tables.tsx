import React from "react";
import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import { connect } from "react-redux";
import {
  Card,
  Divider,
  IconToggle,
  Toolbar,
  Button,
} from "react-native-material-ui";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
import NumberFormat from "react-number-format";
import { GetTables, SendOderToKitchen } from "../services/fetch";
import { showMessage } from "react-native-flash-message";

type Props = {
  dispatchEvent: Function;
  navigation: any;
  SocketConfig: Object;
  User: Object;
  Cart: Object;
  RefreshTables: Object;
};

const Tables = (props: Props) => {
  const { navigation, SocketConfig, User, RefreshTables } = props;
  const [activeSections, setactiveSections] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [totalCost, setTotalCost] = React.useState(0);
  const [isSent, setisSent] = React.useState(false);
  const [tables, setTables] = React.useState({
    data: [],
  });

  const _renderSectionTitle = (section: any) => {
    return <View>{/* <Text>{section.content}</Text> */}</View>;
  };

  const _updateSections = (activeSections: any) => {
    setactiveSections(activeSections);
    // console.log(activeSections);
  };

  React.useEffect(() => {
    HandleGetTables();
  }, [props]);

  const HandleGetTables = () => {
    const user = User.userInfo.config.userName;

    GetTables(user, (callback: any) => {
      if (callback.tables.length !== 0) {
        callback.tables.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setTables({ ...tables, data: callback.tables });
      } else {
      }
    });
  };

  const HandleSendToKitChen = (table: Object) => {
    // console.log(table);
    let user = User.userInfo;

    // SendOderToKitchen(user, table, (callback: any) => {

    // });
    if (!isSent) {
      setisSent(true);
      SocketConfig.socket.emit("oder-to-kitchen", {
        user: User.userInfo,
        table: table,
      });

      
     SocketConfig.socket.on("oder-to-kitchen-done", (printed: any) => {
         if (printed) {
           showMessage({
            message: "Table Order sent Successfully",
            description: "We sent order to kitchen successfully",
             type: "success",
           });
         } else {
           showMessage({
             message: "Error printing table order",
             description: "We have printed order already",
             type: "danger",
           });
        }
       });

      setTimeout(() => {
        setisSent(false);
      }, 5000);
    }
    // SendOderToKitchen(table, (callback: any)=>{

    // })
  };

  const renderItem = () => {
    // console.log(tables);



    return (
      <Accordion
        sections={tables.data}
        activeSections={activeSections}
        renderSectionTitle={_renderSectionTitle}
        renderHeader={(data) => {
          let totalProducts = data.list.data.length;
          let totalItemsCost = 0;

          data.list.data.map((num: any) => {
            totalItemsCost = num.initalPrice * num.qnt + totalItemsCost;
            // totalItemsCost = 20000001;
          });

          


          return (
            <Card>
              <View
                style={{
                  padding: moderateScale(5),
                  height: verticalScale(140),
                  width: "100%",
                }}
              >
                <View
                  style={{
                    paddingTop: moderateScale(15),
                    paddingBottom: moderateScale(15),
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        height: verticalScale(50),
                        width: scale(50),
                        borderRadius: moderateScale(50),
                        borderColor: "tomato",
                        borderWidth: 1,
                        borderStyle: "solid",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialIcons
                        name="backup-table"
                        size={34}
                        color="tomato"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          marginLeft: moderateScale(10),
                          fontSize: 20,
                        }}
                      >
                        {data.name}
                      </Text>
                      <Text
                        style={{
                          marginLeft: moderateScale(10),
                          fontSize: 13,
                        }}
                      >
                        {data.date}
                      </Text>
                      <Text
                        style={{
                          marginLeft: moderateScale(10),
                          fontSize: 13,
                        }}
                      >
                        {data.time}
                      </Text>
                    </View>
                  </View>
                  {/* <View>
            <IconToggle name="add-circle-outline" color="teal" />
          </View> */}
                </View>
                <Divider />
                <View
                  style={{
                    marginTop: moderateScale(5),
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text>Total items {totalProducts}</Text>
                  </View>
                  <View style={{ marginRight: moderateScale(5) }}>
                    <NumberFormat
                      value={data.total}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"k"}
                      renderText={(formattedValue) => (
                        <Text
                          style={{
                            marginLeft: moderateScale(10),
                            fontSize: 22,
                            color: "tomato",
                          }}
                        >
                          Total K{totalItemsCost.toLocaleString('en-US')}
                          {/* Total {formattedValue} */}
                        </Text>
                      )}
                    />
                  </View>
                </View>
              </View>
            </Card>
          );
        }}
        renderContent={(data) => {
          // console.log(data.list.data);

          return (
            <View style={styles.dropList}>
              <View
                style={{
                  padding: moderateScale(1),
                  // height: verticalScale(30),
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onPress={() =>
                    navigation.navigate("NewTable", {
                      type: "edit",
                      table: data,
                    })
                  }
                  icons="add"
                  raised
                  text="Add To Table"
                />
                <Button
                  disabled={isSent}
                  onPress={() => HandleSendToKitChen(data)}
                  icons="add"
                  raised
                  text="Send to kitchen | Bar"
                />
              </View>
              <Divider />

              {data.list.data.map((item: any) => (
                <View>
                  <Divider />
                  <View
                    style={{
                      padding: moderateScale(15),
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{item.ItemName}</Text>
                    <Text>
                      {item.qnt} * {item.initalPrice} ={" "}
                      {item.qnt * item.initalPrice}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          );
        }}
        onChange={_updateSections}
        underlayColor="#E2C0B9"
      />
    );
  };

  const username = User.userInfo.config.userName;
  const header_txt = "Table | " + username

  return (
    <View style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor="#AA422F"
        barStyle="light-content"
      />
      <Toolbar
        centerElement={header_txt}
        // searchable={{
        //   autoFocus: true,
        //   placeholder: "Search",
        // }}
        rightElement={[
          <IconToggle
            onPress={() => {
              navigation.navigate("NewTable", { type: "new" });
              props.dispatchEvent({
                type: "RESTATECART",
              });
            }}
            name="add"
            color="#fff"
          />,
          <View style={{ flexDirection: "row" }}>
            <IconToggle
              // style={{ paddingTop: 10 }}
              onPress={() => HandleGetTables()}
              name="refresh"
              color="#fff"
            />
          </View>,
        ]}
        style={{ container: { backgroundColor: "tomato" } }}
      />
      <ScrollView
        style={{ padding: moderateScale(7), paddingBottom: moderateScale(30) }}
      >
        {tables.data.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text style={{ textAlign: "center" }}>Tables List Empty</Text>
            <Button
              raised
              accent
              onPress={() => navigation.navigate("NewTable", { type: "new" })}
              text="Create new tables"
            />
          </View>
        ) : null}

        {renderItem()}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state: {
  Cart: any;
  RefreshTables: any;
  SocketConfig: any;
  User: any;
}) {
  return {
    SocketConfig: state.SocketConfig,
    User: state.User,
    Cart: state.Cart,
    RefreshTables: state.RefreshTables,
  };
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    dispatchEvent: (data: any) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  dropList: {
    padding: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
  },
});
