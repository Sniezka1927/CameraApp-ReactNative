import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  BackHandler,
  ToastAndroid,
  Animated,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
const CameraScreen = ({ route, navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [settingsStartPos, setSettingsStartPos] = useState(
    new Animated.Value(500)
  );
  const [hidden, setHidden] = useState(true);
  const [settings, setSettings] = useState({
    WhiteBalance: Camera.Constants.WhiteBalance,
    FlashMode: Camera.Constants.FlashMode,
    Ratios: ["4:3", "16:9"],
    Sizes: [],
  });

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus.status !== "granted") alert("Odmowa dostępu...");
      else setHasCameraPermission(true);
      setHasCameraPermission(cameraStatus.status === "granted");
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      console.log("useEffect completed!");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const asset = await MediaLibrary.createAssetAsync(data.uri);
      // setImage(asset);
      let previousImages = route.params.images;
      previousImages.push(asset);
      route.params.setImages(previousImages);
      ToastAndroid.showWithGravity(
        "Picture taken",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const handleBackPress = async () => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    console.log("backpress");
    await route.params.update();
    navigation.navigate("gallery");
    return true;
  };

  const settingsHandler = async () => {
    if (camera) {
      console.log(settings);
      const sizes = await camera.getAvailablePictureSizesAsync("16:9");
      setSettings({ ...settings, Sizes: sizes });

      let toPos = null;
      if (hidden) toPos = 0;
      else toPos = 500;

      //animacja

      Animated.spring(settingsStartPos, {
        toValue: toPos,
        velocity: 1,
        tension: 0,
        friction: 10,
        useNativeDriver: true,
      }).start();

      setHidden((prevState) => !prevState);

      console.log(settingsStartPos);
    }
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
      >
        <Animated.View
          style={[
            styles.animatedView,
            {
              transform: [{ translateY: settingsStartPos }],
            },
          ]}
        >
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
          <Text style={styles.test}>ANIMATE ME!</Text>
        </Animated.View>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Settings" onPress={() => settingsHandler()} />
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
  animatedView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00ff00",
    height: 500,
  },
  text: {
    fontSize: 72,
    color: "red",
  },
});

export default CameraScreen;
