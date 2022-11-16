import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, BackHandler } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CameraScreen = ({ route, navigation }) => {
  const addImage = route.params.addImage;
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    })();
  }, []);
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const asset = await MediaLibrary.createAssetAsync(data.uri);
      setImage(asset);
      console.log("picture set");
    }
  };
  const handleBackPress = async () => {
    //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
    //...
    //powrót do ekranu poprzedniego
    console.log("backpress");
    console.log(image);
    await addImage(image);
    navigation.navigate("gallery");
    return true;
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    // <View style={{ flex: 1 }}>
    <View style={styles.cameraContainer}>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.fixedRatio}
        type={type}
        ratio={"1:1"}
      />
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
    </View>

    // {/* </View> */}
  );
};
const styles = StyleSheet.create({
  cameraContainer: {
    // flex: 1,
    // flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default CameraScreen;
