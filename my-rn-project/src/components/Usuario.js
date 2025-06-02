import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config'


export default class Usuario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: false,
        }
    }

    componentDidMount() {
        if (this.props.data.posts) {
            const posts = this.props.data.posts.includes(auth.currentUser.email)

            this.setState({
                posts: posts,
            })
        }


    }

    mostrarPosts() {
        db
            .collection('users')
            .doc(this.props.id)
            .update({
                posts: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                posts: true,
                cantPosts: this.state.cantPosts + 1
            }))
    }

    borrarPost() {
        db
            .collection('users')
            .doc(this.props.id)
            .update({
                posts: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState({
                posts: false,
                cantPosts: this.state.cantPosts - 1
            }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.data.owner}</Text>
                <Text>Posteos: {this.state.cantSeguidores}</Text>
                {
                    this.state.posts ?
                        <TouchableOpacity
                            onPress={() => this.borrarPost()}
                        >
                            <Text>
                                Borrar Post
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.mostrarPosts()}
                        >
                            <Text>
                                Mostrar Posts
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}
