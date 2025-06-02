import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from '../screens/Register/Register'
import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name='Register'
                component={Register}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }} />
            <Stack.Screen
                name='Home'
                component={BottomTabs}
                options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

export default StackNavigation