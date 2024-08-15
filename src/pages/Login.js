import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import color from '../../color';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useAuth();
    const navigation = useNavigation();

    const handleLogin = async () => {
        const cleanedEmail = email.trim();
        if (cleanedEmail === "" || password === "") {
            Alert.alert('Error', 'Por favor, introduce un correo electrónico y una contraseña válidos.');
            return;
        }
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, cleanedEmail, password);
            const user = userCredential.user;
    
            // Obtener el documento del usuario desde Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser({ uid: user.uid, ...userData });
                console.log('Usuario logueado y datos obtenidos:', userData);
                Alert.alert('Inicio de sesión exitoso', 'El usuario ha iniciado sesión exitosamente.');
                // Aquí puedes redirigir al usuario a otra pantalla o realizar alguna acción adicional
            } else {
                console.error('No se encontraron datos del usuario en Firestore');
                Alert.alert('Error', 'No se encontraron datos del usuario en Firestore.');
            }
        } catch (error) {
            const errorMessage = error.message;
            console.error('Error en el inicio de sesión:', errorMessage);
            Alert.alert('Error en el inicio de sesión', errorMessage);
        }
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
                <Text style={styles.loginText}>Ingresa</Text>
            
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton} onPress={() => console.log("Google Login")}>
                    <FontAwesome name="google" size={24} color="white" />
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.linkText} onPress={()=> navigation.navigate('Register')}>Don't have an account yet? Create one</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: color.COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    Bg: {
        flex: 2,
        width: '100%',
        backgroundColor: color.COLOR_PRIMARIO,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        color: color.COLOR_WHITE,
        marginBottom: 20,
        fontWeight: "bold"
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: color.COLOR_WHITE,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: "#000",
    },
    button: {
        backgroundColor: color.COLOR_WHITE,
        borderRadius: 20,
        width: '60%',
        padding: 10,
        marginTop: 40,
    },
    buttonText: {
        color:color.COLOR_SECUNDARIO,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    googleButton: {
        flexDirection: "row",
        backgroundColor: '#DB4437',
        borderRadius: 20,
        width: '60%',
        paddingVertical: 12,
        marginVertical: 10,
        marginTop: 30,
        justifyContent: "center",
    },
    linkText: {
        color: "white",
        fontSize: 14,
        marginVertical: 5,
        textAlign: "justify"
    },
});
