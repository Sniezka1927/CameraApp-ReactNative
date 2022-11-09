import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
const Button = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.clickFunction}>
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0288D1",
    color: "#fff",
    margin: 10,
    fontSize: 24,
    padding: 10,
    borderColor: "#0288D1",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Button;
