import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db, auth } from '../../firebase/config';

export default class Posteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nuevoPost: '',
            posts: [],
        };
    }
 
    componentDidMount() {

    }


}