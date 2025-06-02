import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home/Home';       
import Perfil from '../screens/Perfil/Perfil';
import NuevoPosteo from '../screens/NuevoPosteo/NuevoPosteo';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }} />
      <Tab.Screen name="Nuevo Posteo" component={NuevoPosteo} options={{ tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" /> }} />
    </Tab.Navigator>
  );
}
