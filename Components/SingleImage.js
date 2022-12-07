import { AutoFocus } from "expo-camera";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const SingleImage = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleEnabled = () => setIsEnabled((previousState) => !previousState);
  const image = props.image;
  const imageSource = image.item.uri;

  console.log(props.imageWidth);
  const onClickHandler = () => {
    props.onClick(props.image);
  };
  const onHoldHanlder = () => {
    toggleEnabled();
    props.onHold(image.item.id, !isEnabled);
  };
  return (
    <TouchableOpacity
      // style={styles.container}
      onPress={onClickHandler}
      onLongPress={onHoldHanlder}
      style={styles.container}
    >
      <ImageBackground
        source={{ uri: imageSource }}
        style={
          props.imageWidth === 1 ? styles.imageVertical : styles.imageHorizontal
        }
        resizeMode="cover"
      >
        {!isEnabled ? (
          <View style={styles.selectedContainer}>
            <Text style={styles.text}>{image.item.id}</Text>
          </View>
        ) : (
          <View style={styles.selectedContainer}>
            <Text style={styles.selected}>
              <Text style={styles.text}>{image.item.id}</Text>
            </Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageHorizontal: {
    width: Dimensions.get("window").width / 5,
    height: undefined,
    aspectRatio: 1,
  },
  imageVertical: {
    width: Dimensions.get("window").width,
    height: 500,
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
  container: {
    flex: 1,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: "rgba(255, 51, 0,0.5)",
    width: "100%",
    height: "100%",
    // fontSize: 50,
    // color: "red",
  },
  selectedContainer: {},
});

export default SingleImage;
