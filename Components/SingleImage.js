import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";

const SingleImage = (props) => {
  const onHoldHandler = props.onSelect;
  const onClickHandler = props.onHold;
  const image = props.image;
  //   console.log(image);
  const imageSource = image.item.uri;
  //   console.log(imageSource);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageSource }}
        style={styles.image}
        resizeMode="cover"
      ></ImageBackground>
      {/* <Image source={{ uri: imageSource }} style={styles.image}></Image> */}
      <Text>{image.item.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,

    // backgroundColor: "red",
  },
  text: {},
  container: {
    flex: 1,
    borderWidth: 1,
  },
});

export default SingleImage;
