import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../../firebase/config';
import MostrarPost from '../../components/MostrarPost';
import { FlatList } from 'react-native-web';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }

    componentDidMount() {


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
                <Text style={styles.title}>Home</Text>
                {this.state.loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <FlatList
                        style={styles.FlatList}
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <MostrarPost postData={item} />}
                    />
                )}
            </View>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 15,
        color: '#e0e0e0',
        textAlign: 'center',
    },
    FlatList: {
        width: '100%',
        flex: 1,
    },
});
