import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CreateCourse() {
  const [curso, setCurso] = useState('');

  const handleGenerarCurso = () => {
    // Lógica para manejar la generación del curso
    alert(`Generar curso: ${curso}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.informacion}>
        <Text style={styles.informacionText}>
          Esta es una aplicación impulsada por IA para generar la estructura de un curso mediante un tema,
          entre más específico sea el tema el curso será generado de acuerdo a tus gustos o necesidades
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tema:</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nombre del curso"
          value={curso}
          onChangeText={text => setCurso(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGenerarCurso}>
        <Text style={styles.buttonText}>Generar curso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  informacion: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'rgba(51, 51, 51, 0.8)', // Color negro con opacidad
    padding: 10,
    borderRadius: 14,
    width: '90%',
    alignItems: 'center',
    marginBottom:100  
  },
  informacionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center', // Texto centrado
  },
  formContainer: {
    width: '100%',
    flexDirection: 'row', // Para alinear el label y el input en fila
    alignItems: 'center',
    marginBottom: 20,
  },
  labelContainer: {
    width: 60, // Ancho suficiente para el label "Tema"
    marginRight: 10, // Espacio entre el label y el input
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    flex: 1, // Para ocupar el espacio restante
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#333', // Color de fondo oscuro
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
