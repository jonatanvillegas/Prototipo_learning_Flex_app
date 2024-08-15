import React, { useRef, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import Notificaciones from '../src/pages/Notificaciones';
import Citas from '../src/pages/Citas';
import CreateCourse from '../src/pages/CreateCourse';
import Perfil from '../src/pages/Perfil';
import Register from '../src/pages/Register';
import { useAuth } from '../context/AuthProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent, SettingsScreen } from './Drawer';
import AdminHome from '../src/pages/AdminHome';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { animate1, animate2, circle1, circle2 } from '../Animated/animated';
import color from '../color';

const AuthStack = createStackNavigator();

const AppStack = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

//stack admin
const AdminStack = createStackNavigator();

const RootStack = createStackNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  const viewRef = useRef(null)
  const circleRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1)
      circleRef.current.animate(circle1)
      textRef.current.transitionTo({ scale: 1 })
    } else {
      viewRef.current.animate(animate2)
      circleRef.current.animate(circle2)
      textRef.current.transitionTo({ scale: 0 })
    }
  }, [focused])
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={1}
    >
      <Animatable.View
        ref={viewRef}
        duration={600}
        style={styles.container}>
        <View style={[styles.btn, { borderColor: focused ? color.COLOR_WHITE : color.COLOR_PRIMARIO }]}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <AntDesign name={item.icon} size={16} color={color.COLOR_WHITE} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const userScreen = [
  { routes: "Citas", label: "Citas", icon: "calendar", component: Citas },
  { routes: "Notificaciones", label: "Notificaciones", icon: "notification", component: Notificaciones },
  { routes: "Home", label: "Home", icon: "home", component: Home },
  { routes: "CreateCourse", label: "CreateCourse", icon: "pluscircleo", component: CreateCourse },
  { routes: "Perfil", label: "Perfil", icon: "user", component: Perfil },
]
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
  <AppStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        height: 65,
        borderRadius: 8,
        backgroundColor: color.COLOR_PRIMARIO,
        borderTopWidth: 1
      }
    }}
  >
    {
      userScreen.map((item, index) => {
        return (
          <AppStack.Screen key={index} name={item.routes} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })
    }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    width: 35,
    height: 35,
    borderWidth: 4,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,

  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "white",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.COLOR_PRIMARIO,
    borderRadius: 25
  }
})
