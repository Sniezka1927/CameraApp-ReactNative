import { View, Text, FlatList, StyleSheet } from "react-native";
import RadioGroup from "./RadioGroup";
const Settings = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          alignSelf: "center",
          fontSize: 24,
          margin: 20,
        }}
      >
        SETTINGS
      </Text>
      <FlatList
        data={props.settings}
        style={styles.settingsList}
        renderItem={(item) => (
          <RadioGroup
            changeSetting={props.changeSetting}
            title={item.item.setting}
            options={item.item.options}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  settingsList: {
    // paddingBottom: 20,
    // position: "absolute",
  },
});

export default Settings;
