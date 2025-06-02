import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perfil de {this.state.userName}</Text>
        <Text style={styles.text}>Email del Usuario: {this.state.user.email}</Text>
        <Text style={[styles.text, styles.subTitle]}>Tus Posts:</Text>

        {this.state.loading ? (
          <Text style={styles.text}>Cargando...</Text>
        ) : (
          this.state.posts.map((post) => (
            <View key={post.id} style={styles.post}>
              <Text style={styles.postText}>{post.data.post}</Text>
            </View>
          ))
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#121212',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#e0e0e0',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 20,
    fontWeight: '600',
  },
  text: {
    color: '#cfcfcf',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  post: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  postText: {
    color: '#f5f5f5',
    fontSize: 16,
  },
});
