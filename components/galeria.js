import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  AsyncStorage,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

class Galeria extends Component {
  constructor(props) {
    super();
    this.state = {
      data: da
    };
    const da = [
      {
        img: "https://picsum.photos/200/300/?random",
        username: "test",
        descripcion: "test"
      }
    ];
  }

  componentWillUpdate() {
    this.chargeData();
  }
  componentDidMount() {
    this.chargeData();
  }

  chargeData = async () => {
    try {
      const value = await AsyncStorage.getItem("database_fav");
      if (value !== null) {
        this.setState({
          data: JSON.parse(value)
        });
      }
    } catch (err) {}
  };

  _renderItem(item) {
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback>
        <View>
          <Image style={styles.image} source={{ uri: item.img }} />
          <Text style={{ color: "white" }}>{item.username}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  async Clear() {
    await AsyncStorage.clear();
    this.chargeData();
  }

  render() {
    const datos = this.state.data;
    return (
      <ScrollView style={styles.container}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Tus Favoritas
        </Text>
        {datos !== null ? (
          <FlatList
            style={{ flex: 1 }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => this._renderItem(item)}
            data={this.state.data}
            columnWrapperStyle={{ marginTop: 5, MarginLeft: 5 }}
          />
        ) : (
          <Text style={{ color: "white", textAlign: "center" }}>
            No Hay Imagenes Guardadas
          </Text>
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    marginRight: 5,
    width: 100,
    height: 170
  }
});
export default Galeria;
