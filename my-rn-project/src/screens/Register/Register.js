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

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            console.log(user)
            if (user) {
                this.props.navigation.replace('Home');
                console.log('Salio bien')
            }
        });
    }

    registro(email, userName, password) {
        if (userName === '') {
            this.setState({ error: 'El nombre de usuario es obligatorio' });
            return;
        }

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


export default Register;
