import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase/config';
import BorrarPost from '../../components/BorrarPost';
import MostrarPerfil from '../../components/MostrarPerfil';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => console.log('Error en logout', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>

        <MostrarPerfil user={auth.currentUser} />

        <View style={styles.section}>
          <BorrarPost />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: '700',
    color: '#e0e0e0',
  },
  section: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0a84ff',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  }
});
