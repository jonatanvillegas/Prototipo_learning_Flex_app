import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';


export default function AdminHome() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersList = querySnapshot.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .filter(user => !user.admin); // Filtra los usuarios que no tienen la propiedad 'admin'
            setUsers(usersList);
          };
  
      fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
          // Eliminar el documento del usuario de Firestore
          await deleteDoc(doc(db, 'users', userId));
          
          // Buscar y eliminar el usuario autenticado
          const userToDelete = auth.currentUser;
          if (userToDelete) {
            await deleteUser(userToDelete);
          }
          
          // Actualizar la lista de usuarios en el estado
          setUsers(users.filter(user => user.id !== userId));
          
          Alert.alert('Usuario eliminado', 'El usuario ha sido eliminado exitosamente.');
        } catch (error) {
          console.error('Error eliminando el usuario:', error);
          Alert.alert('Error', 'Hubo un error al eliminar el usuario.');
        }
      };

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Admin User</Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      {users.map((user) => (
        <View key={user.id} style={styles.tableRow}>
          <Text style={styles.cell}>{user.id}</Text>
          <Text style={styles.cell}>{user.email}</Text>
          <Text style={styles.cell}>{user.displayName}</Text>
          <View style={styles.cell}>
            <Button
              title="Delete"
              color="red"
              onPress={() => handleDelete(user.id)}
            />
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 16,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
},
table: {
  borderWidth: 1,
  borderColor: '#ccc',
},
tableHeader: {
  flexDirection: 'row',
  backgroundColor: '#f7f7f7',
},
tableRow: {
  flexDirection: 'row',
},
headerText: {
  flex: 1,
  padding: 8,
  fontWeight: 'bold',
},
cell: {
  flex: 1,
  padding: 8,
  borderWidth: 1,
  borderColor: '#ccc',
},
});