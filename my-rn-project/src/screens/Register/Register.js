import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { db, auth } from '../../firebase/config';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            userName: '',
            password: '',
            registered: false,
            error: ''
        };
    }

    registro(email, userName, password) {
        console.log('Email ingresado: ', this.state.email);
        console.log('Username ingresado: ', this.state.userName);
        console.log('Password ingresado: ', this.state.password);

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                db.collection('users').add({
                    email: auth.currentUser.email,
                    userName: userName,
                    createdAt: Date.now()
                })
                    .then(() => {
                        this.setState({ registered: true });
                        this.props.navigation.navigate('Home');
                    })
                    .catch(e => console.log(e));
            })
            .catch(error => {
                this.setState({ error: error.message })
                console.log(error)
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registrar Usuario</Text>

                {this.state.error ? (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                ) : null}


                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder='User Name'
                    onChangeText={text => this.setState({ userName: text })}
                    value={this.state.userName}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.registro(this.state.email, this.state.userName, this.state.password)}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Ir al Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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

});

export default Register;
