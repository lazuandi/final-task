import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Header } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import MainApp from "./screens/HomeScreen";
import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Provider } from 'react-redux'
import store from './redux/store'
import ProductList from './screens/ProductList'
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./loginscreen";


const RootStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    HomeScreen: HomeScreen
  },
  {
    initialRouteName: 'LoginScreen',
  }
)

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// export default class App extends Component {

//   render(){
//     return (
//       <Provider store={store}>
//         <ProductList/>
//       </Provider>
//     )
//   }
// }
