import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIENENIDO A PHOTOAPP</Text>
      <TouchableWithoutFeedback onPress={() => navigate("Search")}>
        <Icon name="search" color="white" size={25} />
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15
  },
  title: {
    color: "white"
  }
});
export default Header;
