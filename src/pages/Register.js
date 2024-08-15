import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import color from '../../color';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


export default function Register() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    const handleRegister = async () => {
        const cleanedEmail = email.trim(); // Elimina los espacios en blanco
        if (cleanedEmail === "" || password === "") {
            Alert.alert('Error', 'Por favor, introduce un correo electrónico y una contraseña válidos.');
            return;
        }

        // Validar el formato del correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(cleanedEmail)) {
            Alert.alert('Error', 'El formato del correo electrónico no es válido.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, cleanedEmail, password);
            const user = userCredential.user;
            console.log('Usuario registrado:', user);

            // Actualizar el perfil del usuario con el nombre
            await updateProfile(user, { displayName: nombre });

            // Crear un documento en Firestore con el uid del usuario
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                displayName: nombre,
                createdAt: new Date(),
            });

            Alert.alert('Registro exitoso', 'El usuario se ha registrado exitosamente.');

            // Redirigir a la vista de inicio de sesión
            navigation.navigate('Login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error en el registro:', errorCode, errorMessage);
            Alert.alert('Error en el registro', errorMessage);
        }

        // Limpiar campos de entrada
        setNombre('');
        setEmail('');
        setPassword('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.restante}>
                <Image
                    source={require("../../assets/favicon.png")}
                    style={styles.imagen}
                />
            </View>
            <View style={styles.Bg}>
                <Text style={styles.loginText}>Registro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#aaa"
                    value={nombre}
                    onChangeText={text => setNombre(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    Bg: {
        flex: 2,
        width: '100%',
        backgroundColor: color.COLOR_PRIMARIO,
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    restante: {
        flex: 1,
        width: '100%',
        backgroundColor: color.COLOR_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        fontWeight: "bold"
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: '#000',
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        padding: 10,
        marginTop: 30,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 10,
    },
    googleButton: {
        flexDirection: "row",
        backgroundColor: '#DB4437',
        borderRadius: 20,
        width: '100%',
        paddingVertical: 12,
        marginVertical: 10,
        marginTop: 30,
        justifyContent: "center",
    },
    linkText: {
        color: '#fff',
        fontSize: 14,
        marginVertical: 5,
        textAlign: "justify"
    },
    imagen: {},
});
