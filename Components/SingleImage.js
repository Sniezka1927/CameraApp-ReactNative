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
      style={styles.container}
      onPress={onClickHandler}
      onLongPress={onHoldHanlder}
    >
      <ImageBackground
        source={{ uri: imageSource }}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.text}>{image.item.id}</Text>
        <View style={styles.selectedContainer}>
          {isEnabled ? <Text style={styles.selected}>+</Text> : null}
        </View>
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
  container: {
    flex: 1,
    borderWidth: 1,
  },
  selected: {
    fontSize: 50,
    color: "red",
  },
  selectedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleImage;
