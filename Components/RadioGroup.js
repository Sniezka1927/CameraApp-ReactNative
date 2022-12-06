import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import RadioButton from "./RadioButton";

const RadioGroup = (props) => {
  const options = props.options;
  const title = props.title;
  const [selected, setSelected] = useState(
    Object.keys(options)[Object.keys(options).length - 1]
  );

  const changeSelected = (optionName) => {
    setSelected(optionName);
    props.changeSetting(title, optionName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {Object.keys(options).map((e) => (
        <RadioButton
          optionName={e}
          selectSetting={changeSelected}
          selected={e === selected}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: "#e8eafa",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    paddingBottom: 100,
  },
});
export default RadioGroup;
