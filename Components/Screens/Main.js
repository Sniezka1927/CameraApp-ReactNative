import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Main = ({ navigation }) => {
  const enterApp = () => {
    navigation.navigate("gallery");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={enterApp}>
        <Text style={styles.title}>Camera App</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        show gallery pictures, take picture from camera, save photo to device
        ,delete photos from device, share photo
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29b6f6",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 56,
    color: "#000000",
  },
  text: {
    fontSize: 24,
    margin: 10,
    color: "#0086c3",
  },
});

export default Main;
