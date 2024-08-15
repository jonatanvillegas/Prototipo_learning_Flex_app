import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CardCurso from '../components/CardCurso';
import color from '../../color';

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.user}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>E</Text>
          </View>
          <Text style={styles.userText}>¿Qué sientes hoy?</Text>
        </View>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "Si sirves a la Naturaleza,
            {"\n"} ella te servirá a ti"
          </Text>
          <Text style={styles.quoteAuthor}>Confucio</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Section title="Te puede interesar" />
        <Section title="Plantas Medicinales" />
      </View>
    </ScrollView>
  );
};

const Section = ({ title }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      <CardCurso />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.COLOR_WHITE,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    width: '50%',
    borderRadius: 20,
    padding: 5,
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: color.COLOR_PRIMARIO,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: color.COLOR_WHITE,
    fontWeight: 'bold',
  },
  userText: {
    color: color.COLOR_WHITE,
    fontWeight: 'bold',
  },
  quoteContainer: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  quoteText: {
    fontStyle: 'italic',
    color: color.COLOR_BLACK,
  },
  quoteAuthor: {
    color: color.COLOR_BLACK,
    fontSize: 12,
    marginTop: 5,
  },
  contentContainer: {
    flex: 2,
    backgroundColor: color.COLOR_PRIMARIO,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: color.COLOR_WHITE,
    textAlign: 'center',
  },
  scrollView: {
    marginBottom: 20,
  },
});

export default Home;
