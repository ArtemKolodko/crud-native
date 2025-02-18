import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabMoviesScreen from '../screens/movies/MoviesScreen';
import AddMovie from '../screens/movies/components/AddMovie';
import AboutScreen from '../screens/AboutScreen';
import { BottomTabParamList, TabMoviesParamList, AboutParamList } from '../types';
import ShowMovie from "../screens/movies/components/ShowMovie";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Movies"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Movies"
        component={TabUsersNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="library-movie" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="infocirlce" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const TabMoviesStack = createStackNavigator<TabMoviesParamList>();

function TabUsersNavigator() {
  return (
    <TabMoviesStack.Navigator>
      <TabMoviesStack.Screen
        name="TabMoviesScreen"
        component={TabMoviesScreen}
        options={{ headerTitle: 'Movies' }}
      />
      <TabMoviesStack.Screen
        name="AddMovieScreen"
        component={AddMovie}
        options={{ headerTitle: 'Add new movie' }}
      />
      <TabMoviesStack.Screen
        name="ShowMovieScreen"
        component={ShowMovie}
        options={{ headerTitle: 'About movie' }}
      />
    </TabMoviesStack.Navigator>
  );
}
const AboutStack = createStackNavigator<AboutParamList>();

function AboutNavigator() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: 'About' }}
      />
    </AboutStack.Navigator>
  );
}
