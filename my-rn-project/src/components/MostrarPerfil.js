import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { db } from "../firebase/config";

export default class MostrarPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      posts: [],
      loading: true,
      userName: "",
    };
  }

  componentDidMount() {
    db.collection("users")
      .where("email", "==", this.state.user.email)
      .get()
      .then((docs) => {
        const userData = docs.docs[0].data();
        this.setState({ userName: userData.userName });
      });

    db.collection("posts")
      .where("owner", "==", this.state.user.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        Perfil de {this.state.userName} 
        </Text>
        <Text>Email del Usuario: {this.state.user.email}</Text>
        <Text>Tus Posts:</Text>
        {this.state.loading ? (
          <Text>Cargando...</Text>
        ) : (
          this.state.posts.map((post) => (
            <View key={post.id} style={styles.post}>
              <Text>{post.data.post}</Text>
            </View>
          ))
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
