import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import { white } from "./utils/colors";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducers/'
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { MainNav } from "./navigation/appNavigation";
import { setLocalNotification } from './utils/notifications';
import middleware from './middleware'
import Title from './components/Title';
import { navigationRef } from './navigation/RootNavigation';




function Bar({ backgroundColor, ...props }) {
  return (
    <Fragment>
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        <Title />
      </View>
    </Fragment>

  )
}

class App extends React.Component {

  componentDidMount() {
    setLocalNotification();


  }


  render() {

    return (
      <Provider store={createStore(reducer, middleware)}>
        <Bar backgroundColor={white} barStyle="light-content" />
        <NavigationContainer ref={navigationRef}>
          <MainNav />
        </NavigationContainer>
      </Provider>

    );
  }
}

export default App
