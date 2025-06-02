import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LikearPost from './LikearPost';

class MostrarPost extends Component {
  constructor(props) {
    super(props);
  }

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
    marginBottom: 10
  }
});
