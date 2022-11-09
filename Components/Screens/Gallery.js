import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Dimensions } from "react-native";
import Button from "../Button";
import * as MediaLibrary from "expo-media-library";
import SingleImage from "../SingleImage";

const Gallery = ({ navigation }) => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [images, setImages] = useState([]);

  useEffect(() => {
    requestPermission();
    const getImages = async () => {
      let obj = await MediaLibrary.getAssetsAsync({
        first: 2, // ilość pobranych assetów
        mediaType: "photo", // typ pobieranych danych, photo jest domyślne
      });
      setImages(obj.assets);
    };
    getImages();
  }, []);
  const toggleLayout = () => {};
  const enableCamera = () => {};
  const deleteSelected = () => {};
  const selectImage = () => {};
  const onHoldImage = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button clickFunction={toggleLayout} text={"layout"}></Button>
        <Button clickFunction={enableCamera} text={"camera"}></Button>
        <Button clickFunction={deleteSelected} text={"delete"}></Button>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={images}
          renderItem={(image) => {
            return (
              <SingleImage
                image={image}
                onHold={onHoldImage}
                onSelect={selectImage}
              />
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29b6f6",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  listContainer: {
    flex: 10,
  },
  list: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});
