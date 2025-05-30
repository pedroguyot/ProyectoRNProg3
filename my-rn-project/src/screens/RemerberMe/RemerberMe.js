import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

class RemerberMe extends Component {
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.replace('Home');
            } else {
                this.props.navigation.replace('Login');
            }
        });
    }

    render() {
        return (
          <View style={styles.container}>
            <Text>Cargando...</Text>
            <ActivityIndicator size="large" color="blue" />
          </View>
        );
      }
    }

export default RemerberMe;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
    }
  });