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

class Details extends Component {
  constructor(props) {
    super();
    this.state = {
      img: "",
      description: "",
      username: ""
    };
  }
  componentWillMount() {
    const { params } = this.props.navigation.state;
    const { urls } = params.item;
    const { description } = params.item;
    const { user } = params.item;

    this.setState({
      img: urls.regular,
      description: description,
      username: user.name
    });
  }
  //Storage
  Storage = async () => {
    const { navigate } = this.props.navigation;
    const Favs = [];
    const data = {
      img: this.state.img,
      description: this.state.description,
      username: this.state.username
    };
    Favs.push(data);
    try {
      const value = await AsyncStorage.getItem("database_fav");
      if (value !== null) {
        const d = JSON.parse(value);
        d.push(data);
        try {
          AsyncStorage.setItem("database_fav", JSON.stringify(d));
          navigate("Home");
        } catch (err) {
          Alert.alert("ERROR");
        }
      } else {
        try {
          AsyncStorage.setItem("database_fav", JSON.stringify(Favs));
          navigate("Home");
        } catch (err) {
          Alert.alert("ERROR");
        }
      }
    } catch (err) {
      Alert.alert("ERROR");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.img }} />
        <View style={{ backgroundColor: "white" }}>
          <Text>{this.state.description}</Text>
          <Text>{this.state.username}</Text>
        </View>
        <TouchableHighlight onPress={() => this.Storage()}>
          <View style={styles.myFavIcon}>
            <Icon style={styles.listIcon} name="star" size={18} color="blue" />
            <Text style={styles.text}>Añadir a Favoritos</Text>
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
export default Details;
