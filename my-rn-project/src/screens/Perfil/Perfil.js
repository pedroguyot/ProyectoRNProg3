import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db, auth } from '../../firebase/config';
import Usuario from '../../components/Usuario';

export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }




  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => console.log('error en logout', error))
  }

  render() {
    return (
      <View>
        <Text>Mi Perfil</Text>

        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

