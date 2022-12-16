import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

type Props = {
  navigation: any;
  dispatchEvent: Function;
};

const User = (props: Props) => {
  const { navigation } = props;

  React.useEffect(() => {
    props.dispatchEvent({
      type: "RESET_USER",
    });
  }, []);

  return (
    <View>
      <Text>User Logout</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
