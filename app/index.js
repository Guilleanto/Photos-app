import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert
} from "react-native";
import Galeria from "../components/galeria";

import Icon from "react-native-vector-icons/FontAwesome";

type Props = {};
export default class HomeIndex extends Component<Props> {
  constructor() {
    super();

    this.state = {
      name: ""
    };
  }
  changeTitle(name) {
    this.setState({ name });
  }
  buttonPress() {
    if (this.state.name) {
      Alert.alert(this.state.name);
    } else {
      Alert.alert("Campos Vacios");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Galeria navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 10,
    color: "white"
  },
  buttonSearch: {
    backgroundColor: "orange",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});
