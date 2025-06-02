import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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

  borrarPost(postId) {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post borrado con éxito");
      })
      .catch((error) => {
        console.log("Error borrando post: ", error);
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Perfil de {this.state.userName}
        </Text>
        <Text style={styles.text}>Email del Usuario: {this.state.user.email}</Text>
        <Text style={styles.text}>Tus Posts:</Text>
        {this.state.loading ? (
          <Text style={styles.text}>Cargando...</Text>

        ) : (
          this.state.posts.map((post) => (
            <View key={post.id} style={styles.post}>
              <Text style={styles.postText}>{post.data.post}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.borrarPost(post.id)}
              >
                <Text style={styles.deleteButtonText}>Borrar comentario</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e0e0e0",
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    color: "#cfcfcf",
    fontSize: 16,
    marginBottom: 10,
  },
  post: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
  },
  postText: {
    color: "#f5f5f5",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

