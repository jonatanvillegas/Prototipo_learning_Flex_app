import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import CreateCourse from '../src/pages/CreateCourse';
import { useAuth } from '../context/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent, SettingsScreen } from './Drawer';
import AdminHome from '../src/pages/AdminHome';

const AuthStack = createStackNavigator();

const AppStack = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

//stack admin
const AdminStack = createStackNavigator();

const RootStack = createStackNavigator();


const AdminNavigator = () => (
  <AdminStack.Navigator>
    <AdminStack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: false }} />
  </AdminStack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <AuthStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const AppNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Home"
      component={DrawerNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      }}
    />
    <AppStack.Screen
      name="CreateCourse"
      component={CreateCourse}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="pluscircleo" size={size} color={color} />
        ),
      }}
    />
  </AppStack.Navigator>
);
export const RootNavigator = () => {
  const { user } = useAuth();
  console.log(user?.admin);

  const isAdmin = user?.admin;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          isAdmin === "admin" ? (
            <RootStack.Screen name="Admin" component={AdminNavigator} />
          ) : (
            <RootStack.Screen name="App" component={AppNavigator} />
          )
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
