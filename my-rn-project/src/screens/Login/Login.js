import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../../components/firebase/config';
import { TextInput } from 'react-native-web';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    login(email, password) {
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
            <View style={styles.conteiner}>
                <Text style={styles.titulo}>Iniciar Sesion</Text>

                <TextInput
                    placeholder='Email'
                    keyboardType='emial-address'
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.setState.email}
                />

                <TextInput
                    placeholder='Contraseña'
                    keyboardType={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.setState.password}
                />

                {
                    this.state.error !== '' ? (
                        <Text style={styles.error}>{this.state.error}</Text>
                    ) : null
                }

                <TouchableOpacity
                    onPress={() => this.login(this.state.email, this.state.password)}>

                    <Text style={styles.botonText}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>¿No tenes cuenta? Regitrate aca</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: center
    },
    titulo: {
        fontWeight: 'bold',
    },
    botonText: {
        fontWeight: 'bold',
    }
})