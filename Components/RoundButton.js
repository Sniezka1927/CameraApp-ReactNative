import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

const RoundButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={{
        ...styles.container,
        left: props.left,
        width: props.width,
        height: props.height,
      }}
    >
      <View style={styles.content}>
        <Image source={props.src} style={styles.png}></Image>
        {/* <Text style={styles.content}>{props.text}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0288D1",
    width: 100,
    height: 100,
    alignSelf: "center",
    opacity: 0.8,
    borderWidth: 1,
    borderRadius: 100,
  },
  content: {
    textAlign: "center",
    justifyContent: "center",
    paddingTop: "20%",
    alignSelf: "center",
  },
  png: {
    width: 50,
    height: 50,
  },
});

export default RoundButton;
