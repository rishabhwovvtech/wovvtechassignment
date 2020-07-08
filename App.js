
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Listing from './src/listing'
import Details from './src/details'

const MyStack = createStackNavigator({
  Listing: {
    screen: Listing,
    navigationOptions: {
      title: 'Listing',
      header:null
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'JSON Details'
    }
  }
},{
  defaultNavigationOptions:{
    headerTitleAlign:'center'
  }
})

const AppContainer = createAppContainer(MyStack);
class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  };
}


export default App;

// rishabh.kumar@wovvtech.com
// Adadmin@1234

//https://github.com/react-native-community/react-native-svg