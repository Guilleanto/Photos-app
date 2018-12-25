import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers";
import Routes from "./src/config/routers";
import dataReducer from './src/reducer/dataReducer'
import thunk from "redux-thunk";

//REDUX
const AppNavigator = createStackNavigator(
  Routes,
  {
    initialRouteName: "Home"
  },
  {
    headerMode: "screen"
  }
);
const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  data: dataReducer
});


const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const nav = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(nav);


const store = createStore(appReducer, undefined, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
