import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { OutlinedTextField } from "@freakycoder/react-native-material-textfield";
import { Button } from "react-native-material-ui";
import { Snackbar } from "react-native-material-ui";
import { moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dbconfig = () => {
  let fieldRef = React.createRef();
  const [text, setText] = React.useState("");
  const [defaultText, setDefaultText] = React.useState(
    "Enter Server IP Address"
  );
  const [isVisible, setIsVisible] = React.useState(false);

  const onSubmit = () => {
    let { current: field } = fieldRef;
    storeData(field.value());
    getData();
  };

  const OnTextChange = (text) => {
    setText(text);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("ServerConfig");
      if (value !== null) {
        setDefaultText(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const HandleSetValue = () => {
    storeData(text);
    getData();
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("ServerConfig", value);
      setIsVisible(true);
    } catch (e) {
      // saving error
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.main}>
      <Text style={{ padding: 10 }}>Server Settings</Text>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            padding: moderateScale(10),
            marginTop: moderateScale(10),
          }}
        >
          <OutlinedTextField
            label={defaultText}
            // formatText={formatText}
            onChangeText={OnTextChange}
            onSubmitEditing={onSubmit}
            ref={fieldRef}
          />
          <View
            style={{
              padding: moderateScale(10),
              marginTop: moderateScale(5),
            }}
          >
            <Button
              onPress={HandleSetValue}
              raised
              primary
              text="Save Changes"
            />
          </View>
        </View>
      </View>
      <View>
        <Snackbar
          visible={isVisible}
          message="Saved successfully"
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
    </View>
  );
};

export default Dbconfig;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});
