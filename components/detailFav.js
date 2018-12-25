import React, { Component } from "react";
import {
  TouchableHighlight,
  AsyncStorage,
  Alert,
  Text,
  View,
  StyleSheet,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class DetailsFav extends Component {
  constructor(props) {
    super();
    this.state = {
      img: "",
      description: "",
      username: "",
      item: ""
    };
  }
  componentWillMount() {
    const { params } = this.props.navigation.state;
    const { img } = params.item;
    const { description } = params.item;
    const { username } = params.item;
    const { item } = params;
    this.setState({
      img: img,
      description: description,
      username: username,
      item: item
    });
  }
  //Storage
  /*async Remove(item) {
      Alert.alert(item.toString())
    const { navigate } = this.props.navigation;
        try {
          await AsyncStorage.removeItem(item);
          navigate("Home");
          return true;
        } catch (err) {
          Alert.alert("ERROR", err.toString());
          return false;
        }
  };*/

  render() {
    const item = this.state.item;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <View style={{ backgroundColor: "white" }}>
          <Text>{this.state.description}</Text>
          <Text>{this.state.username}</Text>
        </View>
        <TouchableHighlight onPress={() => this.Storage(item)}>
          <View style={styles.myFavIcon}>
            <Icon style={styles.listIcon} name="trash" size={18} color="blue" />
            <Text style={styles.text}>Eliminar </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818"
  },
  image: {
    flex: 1,
    height: 80
  },
  myFavIcon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10
  },
  listIcon: {
    height: 25
  },
  text: {
    color: "#b3b3b3",
    fontSize: 16
  }
});
export default DetailsFav;
