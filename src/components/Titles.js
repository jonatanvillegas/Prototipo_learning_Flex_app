import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { titulos } from '../../Data/TitulosData'; // Asegúrate de importar tus datos de títulos correctamente

const Titles = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {titulos.map((topic, index) => (
        <View key={index} style={styles.topicItem}>
          <Text style={styles.topicTitle}>{topic.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  topicItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#333', // Añade un fondo blanco para cada elemento
  },
  topicTitle: {
    fontSize: 16,
    color:"white",
    fontWeight: 'bold',
  },
});

export default Titles;
