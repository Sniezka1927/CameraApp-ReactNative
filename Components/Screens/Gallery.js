import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Dimensions } from "react-native";
import Button from "../Button";
import * as MediaLibrary from "expo-media-library";
import SingleImage from "../SingleImage";
import { Camera } from "expo-camera";

const Gallery = ({ navigation }) => {
  const [columnsAmount, setColumnsAmount] = useState(1);
  // gallery
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [images, setImages] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("brak uprawnień do czytania image-ów z galerii");
      }
      const downloadedImages = await MediaLibrary.getAssetsAsync({
        first: 3, // ilość pobranych assetów
        mediaType: "photo", // typ pobieranych danych, photo jest domyślne
      });
      setImages(downloadedImages.assets);
    })();
    console.log("useEffect completed!");
  }, []);
  const toggleLayout = () => {
    if (columnsAmount === 1) setColumnsAmount(5);
    else setColumnsAmount(1);
  };
  const enableCamera = () => {
    navigation.navigate("camera", { addImage: addImage }); //
  };
  const deleteSelected = () => {};
  const selectImage = () => {};
  const onHoldImage = () => {};
  const addImage = (image) => {
    let newImages = images;
    newImages = newImages.push(image);
    console.log(newImages);
    setImages(newImages);
    console.log("added");
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button clickFunction={toggleLayout} text={"layout"}></Button>
        <Button clickFunction={enableCamera} text={"camera"}></Button>
        <Button clickFunction={deleteSelected} text={"delete"}></Button>
      </View>
      <View style={styles.listContainer}>
        {columnsAmount === 1 ? (
          <FlatList
            numColumns={1}
            key={1}
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
        ) : (
          <FlatList
            numColumns={5}
            key={5}
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
        )}
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
