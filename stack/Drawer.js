
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Drawer = createDrawerNavigator();


export const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);

export const CustomDrawerContent = (props) => {
    const handleLogout = () => {
      signOut(auth)
        .then(() => {
          Alert.alert('Logout Successful', 'You have been logged out.');
          props.navigation.navigate('Auth', { screen: 'Login' }); // Navegar a Login dentro de Auth Navigator
        })
        .catch((error) => {
          console.error('Error logging out:', error);
          Alert.alert('Error', 'There was a problem logging out.');
        });
    };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
