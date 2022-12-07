import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Dimensions } from "react-native";
import Button from "../Button";
import * as MediaLibrary from "expo-media-library";
import SingleImage from "../SingleImage";

const Gallery = ({ navigation }) => {
  const [columnsAmount, setColumnsAmount] = useState(5);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [toRemove, setToRemove] = useState([]);
  const [images, setImages] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("brak uprawnień do czytania image-ów z galerii");
      }
      const downloadedImages = await MediaLibrary.getAssetsAsync({
        first: 25, // ilość pobranych assetów
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
    navigation.navigate("camera", {
      images: images,
      setImages: setImages,
      update: updatePage,
    }); //
  };

  const onClickImage = (image) => {
    navigation.navigate("bigphoto", {
      image: image.item,
      images: images,
      setImages: setImages,
      update: updatePage,
    });
  };

  const deleteSelected = async () => {
    let previousState = images;
    for (const id of toRemove) {
      console.log("deleted");
      await MediaLibrary.deleteAssetsAsync(id);
      previousState = previousState.filter((elem) => elem.id !== id);
    }
    setToRemove([]);
    setImages(previousState);
  };

  const onLongPressHandler = (image, isEnabled) => {
    console.log(image, isEnabled);
    if (isEnabled) {
      setToRemove([...toRemove, image]);
    } else {
      let update = toRemove;
      update = update.filter((elem) => elem !== image.id);
      setToRemove(update);
    }
    console.log(toRemove);
  };

  const updatePage = () => {
    setImages(images);
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
                  onClick={onClickImage}
                  onHold={onLongPressHandler}
                  imageWidth={columnsAmount}
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
                  imageWidth={columnsAmount}
                  onClick={onClickImage}
                  onHold={onLongPressHandler}
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
