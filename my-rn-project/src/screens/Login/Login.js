import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { Component } from 'react';
import { auth } from '../../firebase/config';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    loguearUsuario(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                this.setState({ error: 'Credenciales Invalidas. Porfavor Reintente.' });
            })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                {this.state.error ? (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                ) : null}

                <TextInput style={styles.input}
                    keyboardType='emial-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    
                />

                <TextInput style={styles.input}
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    
                />

                <TouchableOpacity
                    onPress={() => this.loguearUsuario(this.state.email, this.state.password)}
                >

                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>¿No tenes cuenta? Regitrate aca</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 6,
        marginBottom: 10,
    },
    buttonSecondary: {
        backgroundColor: '#555',
        paddingVertical: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center'
    }
}) 