import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const SingleImage = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleEnabled = () => setIsEnabled((previousState) => !previousState);
  const image = props.image;
  const imageSource = image.item.uri;

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
      style={
        props.imageWidth === 1
          ? styles.containerVertical
          : styles.containerHorizontal
      }
    >
      <ImageBackground
        source={{ uri: imageSource }}
        style={styles.image}
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
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
  containerVertical: {
    flex: 1,
    borderWidth: 1,
    width: "20%",
  },
  containerHorizontal: {
    flex: 1,
    borderWidth: 1,
    width: "100%",
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
