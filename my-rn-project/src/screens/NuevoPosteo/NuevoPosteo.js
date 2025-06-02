import React, { Component } from "react";
import {Text,View,StyleSheet, TouchableOpacity,TextInput,FlatList,} from "react-native";
import { db, auth } from "../../firebase/config";

export default class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
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
      .then(()=> {
        this.setState({ value: '', });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear un nuevo posteo</Text>
        <TextInput
          placeholder="Escribe un posteo nuevo"
          value={this.state.value}
          onChangeText={(text) => this.setState({ value: text })}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => this.crearPost(this.state.value)}
        >
          <Text>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
