import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../../firebase/config';
import NuevoPosteo from '../NuevoPosteo/NuevoPosteo';
import { FlatList } from 'react-native-web';
import RemerberMe from '../RemerberMe/RemerberMe';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }

    componentDidMount() {
        <RemerberMe />

        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let posteos = [];

                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                this.setState({
                    posts: posteos,
                    loading: false
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Home </Text>
                <Text>Ir a posteos</Text>
                {this.state.loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (

                    <FlatList style={styles.FlatList}
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <NuevoPosteo postData={item} />}
                    />
                )}
            </View>
        )
    }
}

export default Home;

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