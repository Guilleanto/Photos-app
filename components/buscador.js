import React, { Component } from "react";
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  Keyboard,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { fetchData } from "../src/actions";
import { Url, appId } from "../src/api/api";
const { width, height } = Dimensions.get("window");

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      datos: [],
      fetching: false
    };
  }

  static navigationOptions = {
    header: null
  };

  deleteData() {
    this.setState({ value: "" });
  }

  Search(value) {
    this.setState({
      value: value
    });
  }

  _renderItem(item) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={() => navigate("Detail", { item })}>
        <Image style={styles.image} source={{ uri: item.urls.regular }} />
      </TouchableWithoutFeedback>
    );
  }
  renderList() {
    const img = this.state.datos;
    return (
      <FlatList
        data={img}
        style={{ flex: 1 }}
        numColumns={3}
        renderItem={({ item }) => this._renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{ marginTop: 5, MarginLeft: 5 }}
      />
    );
  }
  SearchImage() {
    let val = this.state.value;
    Keyboard.dismiss();
    this.fetchData(val);
  }
  fetchData(query) {
    const Uri = `${Url}?query=${query}&client_id=${appId}`;
    this.setState({
      fetching: true
    });
    fetch(Uri)
      .then(response => {
        return response.json();
      })
      .then(jsresp => {
        this.setState({
          datos: jsresp.results,
          fetching: false
        });
      });
  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => this.SearchImage()}>
            <Icon
              name="search"
              color="grey"
              size={25}
              style={styles.searchIcon}
            />
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="white"
            value={this.state.value}
            onChangeText={value => this.Search(value)}
            keyboardAppearance="dark"
            autoFocus={true}
          />
          {this.state.value ? (
            <TouchableWithoutFeedback onPress={() => this.deleteData()}>
              <Icon
                name="times-circle"
                color="grey"
                size={30}
                style={styles.iconInput}
              />
            </TouchableWithoutFeedback>
          ) : null}
          <TouchableWithoutFeedback
            style={styles.CancelButton}
            onPress={() => goBack()}
          >
            <View style={styles.containerButton}>
              <Text style={styles.textButton}>Cancelar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView>
          {this.state.fetching ? (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color="white"
            />
          ) : (
            this.renderList()
          )}
        </ScrollView>
      </View>
    );
  }
}

//mapStateToProps
const mapStateToProps = state => {
  return { data: state.date };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: query => dispatch(fetchData(query))
  };
};
//mapDispacthtoProps
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818"
  },
  header: {
    height: 45,
    backgroundColor: "#181818",
    borderBottomWidth: 1,
    borderColor: "#3a3a3a",
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    width: width - width / 4,
    height: 35,
    backgroundColor: "#323232",
    marginHorizontal: 10,
    paddingLeft: 40,
    borderRadius: 3,
    marginTop: 6
  },
  iconInput: {
    position: "absolute",
    top: 10,
    right: 90,
    backgroundColor: "transparent",
    zIndex: 1
  },
  image: {
    marginRight: 5,
    width: 100,
    height: 170
  },
  CancelButton: {},
  searchIcon: {
    position: "absolute",
    top: 7,
    left: 15,
    zIndex: 1,
    backgroundColor: "transparent"
  },
  containerButton: {},
  textButton: {
    color: "white"
  },
  loading: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
