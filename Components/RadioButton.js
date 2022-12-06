import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const RadioButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.selectSetting(props.optionName)}
      style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
    >
      <View style={styles.button}>
        {props.selected ? <View style={styles.highlight}></View> : <View />}
      </View>
      <Text style={styles.text}> {props.optionName} </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  button: {
    width: 30,
    height: 30,
    borderColor: "#3443eb",
    borderWidth: 1,
    borderRadius: 100,
    marginRight: 5,
    justifyContent: "center",
  },
  highlight: {
    width: 20,
    height: 20,
    backgroundColor: "#3443eb",
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: "center",
  },
});
export default RadioButton;
