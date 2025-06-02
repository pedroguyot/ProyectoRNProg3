import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home/Home';       // Tu Home real o un componente menú
import Perfil from '../screens/Perfil/Perfil';
import NuevoPosteo from '../screens/NuevoPosteo/NuevoPosteo';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      <Tab.Screen name="NuevoPosteo" component={NuevoPosteo} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
