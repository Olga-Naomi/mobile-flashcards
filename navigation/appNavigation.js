import React from 'react'
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DeckDetails from '../components/DeckDetails';
import Quiz from '../components/Quiz';
import QuizDetails from '../components/QuizDetails';
import AddCard from '../components/AddCard';
import { black, white } from "../utils/colors";

const Stack = createStackNavigator();

const Tabs = createBottomTabNavigator()

const TabNav = () => (
  <Tabs.Navigator
    initialRouteName="DeckList"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        if (route.name === "Add Deck") {
          icon = (
            <FontAwesome name="plus-square" size={size} color={color} />
          );
        } else if (route.name === "Deck List") {
          icon = (
            <Ionicons name="ios-bookmarks" size={size} color={color} />
          );
        }
        return icon;
      }
    })}
    tabBarOptions={{
      header: null,
      activeTintColor: Platform.OS === "ios" ? black : white,
      showIcon: true,
      style: {
        height: 80,
        backgroundColor: Platform.OS === "ios" ? white : black,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }}
  >
    <Tabs.Screen name="Deck List" component={DeckList} />
    <Tabs.Screen name="Add Deck" component={AddDeck} />
  </Tabs.Navigator>
);


export const MainNav = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={{ headerShown: false }} />
    <Stack.Screen
      name="DeckDetails"
      component={DeckDetails}
      options={{
        headerTintColor: black, headerStyle: {
          backgroundColor: white,
        }
      }} />
      <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerTintColor: black, headerStyle: {
          backgroundColor: white,
        }
      }} />
      <Stack.Screen
      name="QuizDetails"
      component={QuizDetails}
      options={{
        headerTintColor: black, headerStyle: {
          backgroundColor: white,
        }
      }} />
      <Stack.Screen
      name="AddCard"
      component={AddCard}
      options={{
        headerTintColor: black, headerStyle: {
          backgroundColor: white,
        }
      }} />
  </Stack.Navigator>
);