import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { db, auth } from "../../firebase/config";

export default class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: props.data,
      id: props.id,
    };
  }

  crearPost() {
    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        post: this.state.value,
        likes: [],
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({ value: '' });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear un nuevo posteo</Text>
        <TextInput
          placeholder="Escribe un posteo nuevo"
          placeholderTextColor="#888"
          value={this.state.value}
          onChangeText={(text) => this.setState({ value: text })}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.crearPost()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#eee',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#0a84ff',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});