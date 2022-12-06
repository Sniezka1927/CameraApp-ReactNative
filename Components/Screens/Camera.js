import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  BackHandler,
  ToastAndroid,
  Animated,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Settings from "../Settings";

const CameraScreen = ({ route, navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [settingsStartPos, setSettingsStartPos] = useState(
    new Animated.Value(Dimensions.get("window").height)
  );
  const [hidden, setHidden] = useState(true);
  let settings = [];
  let settingsObj = {};
  Object.keys(Camera.Constants).forEach((e) => {
    if (typeof Camera.Constants[e] == "object")
      if (Object.keys(Camera.Constants[e]).length > 1) {
        settings.push({ setting: e, options: Camera.Constants[e] });
        settingsObj[e] = 0;
      }
  });
  const [cameraSettings, setCameraSettings] = useState(settingsObj);

  console.log(cameraSettings);
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
      let toPos = null;
      if (hidden) toPos = 0;
      else toPos = Dimensions.get("window").height;

      //animacja
      Animated.spring(settingsStartPos, {
        toValue: toPos,
        velocity: 1,
        tension: 0,
        friction: 10,
        useNativeDriver: true,
      }).start();
      setHidden((previousState) => !previousState);
    }
  };

  const changeSetting = (setting, option) => {
    let settings = cameraSettings;
    settings[setting] = Camera.Constants[setting][option];
    setCameraSettings(settings);
    console.log("94", cameraSettings);
    // console.log(settings.FlashMode);
    console.log(type);
    console.log(settings.Type);
  };

  const flip = () => {
    let settings = cameraSettings;
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );

    console.log(type);
    settings.Type = type;
    setCameraSettings(settings);
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{ translateY: settingsStartPos }],
          },
        ]}
      >
        <Settings
          settings={settings}
          changeSetting={changeSetting}
          style={styles.settingsContainer}
        />
      </Animated.View>
      <Camera
        onCameraReady={() => console.log("camera ready")}
        AutoFocus={cameraSettings.AutoFocus}
        whiteBalance={cameraSettings.WhiteBalance}
        flashMode={cameraSettings.FlashMode}
        type={cameraSettings.Type}
        VideoQuality={cameraSettings.VideoQuality}
        ratio={"1:1"}
        ref={(ref) => setCamera(ref)}
        style={styles.fixedRatio}
      ></Camera>
      <View style={styles.buttonContainer}>
        <Button
          title="Flip Image"
          onPress={() => {
            flip();
          }}
        ></Button>
        <Button title="Take Picture" onPress={() => takePicture()} />
        <Button title="Settings" onPress={() => settingsHandler()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  settingsContainer: {
    position: "absolute",
  },
  fixedRatio: {
    width: "100%",
    height: "50%",
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 110,
  },
  animatedView: {
    zIndex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0288D1",
    opacity: 0.8,
    height: Dimensions.get("window").height,
    width: "50%",
  },
  text: {
    fontSize: 72,
    color: "red",
  },
});

export default CameraScreen;
