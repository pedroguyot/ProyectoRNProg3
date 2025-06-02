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
        likes: firebase.firestore.FieldValue.arrayUnion(
          auth.currentUser.email
        ),
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
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
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
        <Text>{this.props.data.owner}</Text>
        <Text>{this.props.data.post}</Text>
        <Text>Likes: {this.state.cantLikes}</Text>
        {this.state.like ? (
          <TouchableOpacity onPress={() => this.sacarLike()}>
            <Text>Me Gusta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.darLike()}>
            <Text>Me Gusta</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    FlatList: {
        width: '100%',
        flex: 1
    }
});