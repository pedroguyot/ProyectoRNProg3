import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activo: false,
        }
    }


    render() {
        return (
            <View>
                <Text>Pantalla Login</Text>
            </View>
        )
    }
}


export default Login;