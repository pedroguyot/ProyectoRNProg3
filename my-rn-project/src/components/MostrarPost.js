import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LikearPost from './LikearPost';

class MostrarPost extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LikearPost data={this.props.postData.data} id={this.props.postData.id} />
            </View>
        );
    }
}

export default MostrarPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 12,
        padding: 15,
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    }
});

