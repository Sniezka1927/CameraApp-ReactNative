import { StyleSheet, Text, View, Image, ToastAndroid } from "react-native";
import Button from "../Button";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

const BigPhoto = ({ route, navigation }) => {
  const image = route.params.image;
  console.log(image);

  const shareImage = async () => {
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) await Sharing.shareAsync(image.uri);
    else
      ToastAndroid.showWithGravity(
        "Unable to share image.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
  };
  const deleteImage = async () => {
    await MediaLibrary.deleteAssetsAsync(image.id);
    let newImages = route.params.images;
    newImages = newImages.filter((elem) => elem.id !== image.id);
    route.params.setImages(newImages);
    // await route.params.update();
    navigation.navigate("gallery");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: image.uri }} style={styles.image}></Image>

      <View style={styles.buttonContainer}>
        <Button clickFunction={shareImage} text={"share"}></Button>
        <Button clickFunction={deleteImage} text={"delete"}></Button>
      </View>
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
  image: {
    width: "70%",
    height: "60%",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default BigPhoto;
