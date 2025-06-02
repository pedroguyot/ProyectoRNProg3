import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { db } from '../firebase/config'
import firebase from 'firebase'


export default class BorrarPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            borrado: false,
        }
    }

    borrarPost(){
        db
        .collection('users')
        .doc(this.props.id)
        .update({
            posts: firebase.firestore.FieldValue.arrayRemove(this.props.data.post)
        })
        .then(() => this.setState({
            borrado: true,
        }))
    }

  render() {
    return (
      <View style={styles.container}>
         <TouchableOpacity
                onPress={() => this.borrarPost()}
            >
                <Text>
                    Borrar Post
                </Text>
            </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
});