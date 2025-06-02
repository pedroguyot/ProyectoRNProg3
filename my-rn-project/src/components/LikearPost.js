import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

export default class LikearPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantLikes: 0,
    };
  }

  componentDidMount() {
    if (this.props.data.likes) {
      const like = this.props.data.likes.includes(auth.currentUser.email);
      this.setState({
        like: like,
        cantLikes: this.props.data.likes.length,
      });
    }
  }

  darLike() {
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          like: true,
          cantLikes: this.state.cantLikes + 1,
        })
      );
  }

  sacarLike() {
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          like: false,
          cantLikes: this.state.cantLikes - 1,
        })
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.owner}>{this.props.data.owner}</Text>
        <Text style={styles.post}>{this.props.data.post}</Text>
        <Text style={styles.likes}>Likes: {this.state.cantLikes}</Text>
        {this.state.like ? (
          <TouchableOpacity style={styles.buttonUnlike} onPress={() => this.sacarLike()}>
            <Text style={styles.buttonText}>Quitar me gusta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonLike} onPress={() => this.darLike()}>
            <Text style={styles.buttonText}>Me Gusta</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  owner: {
    color: '#bbb',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
  },
  post: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 10,
  },
  likes: {
    color: '#999',
    marginBottom: 10,
  },
  buttonLike: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonUnlike: {
    backgroundColor: '#555',
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
