import React, { Component } from 'react';
import HomeScreen from './Screen/HomeScreen'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from './Constants/Colors'
import HotelDetail from './Screen/HotelDetail';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.light,
  },
};

const Stack = createStackNavigator()

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer theme={MyTheme}>

        <Stack.Navigator initialRouteName="Login">

          {/* HomeScreen */}
          <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null, }} />

          {/* DetailsScreen */}
          <Stack.Screen name="Detail" component={HotelDetail} options={{ header: () => null,}} />

        </Stack.Navigator>

      </NavigationContainer>
    )
  }
}