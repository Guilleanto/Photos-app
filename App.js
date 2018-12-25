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
import HomeIndex from "./app/index";
import Header from "./components/Header";
type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
  }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <HomeIndex navigation={this.props.navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  }
});
