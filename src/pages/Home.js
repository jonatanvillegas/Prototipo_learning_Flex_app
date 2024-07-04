import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Titles from '../components/Titles';
import CardCurso from '../components/CardCurso';

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/imagenAprendiendo.jpg")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Aprendizaje Flexible</Text>
        <Text style={styles.subtitle}>Habilidades para tu presente y tu futuro</Text>
      </View>
      <View style={styles.scrollContainer}>
        <Titles />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Mis cursos</Text>
        <Text style={styles.subtitle}>Sigue tu camino al exito</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <CardCurso />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 10,
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'left',
  },
  scrollContainer: {
    width: '100%',
    height: 65,
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
    marginBottom: 20, // Ajusta el margen inferior según sea necesario
  },
});

export default Home;
