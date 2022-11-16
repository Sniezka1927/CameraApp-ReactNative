import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const SingleImage = (props) => {
  const onHoldHandler = props.onSelect;
  const onClickHandler = props.onHold;
  const image = props.image;
  const imageSource = image.item.uri;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageSource }}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.text}>{image.item.id}</Text>
      </ImageBackground>
    </View>
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
});

export default SingleImage;
