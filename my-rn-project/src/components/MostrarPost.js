import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { db } from '../firebase/config'
import NuevoPost from '../screens/NuevoPosteo/NuevoPost'

class MostrarPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            loading: true,
        }
    }

    componentDidMount(){
        this.obtenerPosts();
    }
    
    obtenerPosts(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    posts: posts,
                    loading: false,
                });
            },
            error => console.log(error)
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Posts</Text>

                {this.state.loading ? (
                    <Text> Cargando Posts...</Text>
                ):(
                    <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <NuevoPost data={item.data} id={item.id}/>
                    )}
                    />
                )}

            </View>
        )
    }

}

export default MostrarPost;