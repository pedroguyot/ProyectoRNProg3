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
                    placeholder='Email'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}

                />

                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Password'
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}

                />

                <TouchableOpacity style={styles.button}
                    onPress={() => this.loguearUsuario(this.state.email, this.state.password)}
                >

                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary}
                    onPress={() => this.props.navigation.navigate('Register')}>
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
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 28,
        marginBottom: 25,
        textAlign: 'center',
        fontWeight: '700',
        color: '#e0e0e0',
    },
    input: {
        height: 48,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 18,
        backgroundColor: '#1e1e1e',
        fontSize: 16,
        color: '#f5f5f5',
    },
    button: {
        backgroundColor: '#0a84ff',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom: 12,
    },
    buttonSecondary: {
        backgroundColor: '#333',
        paddingVertical: 14,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
    },
    errorText: {
        color: '#e04848',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '600',
    },
});
