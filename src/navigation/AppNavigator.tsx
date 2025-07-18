import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import AddDocumentScreen from '../features/documents/screens/AddDocumentScreen';
import DocumentListScreen from '../features/documents/screens/DocumentListScreen';
import DocumentDetailScreen from '../features/documents/screens/DocumentDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotifyScreen from '../features/notify/screens/NotifyScreen';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{ title: 'Inicio', headerShown: false }} />
      <Stack.Screen name="AddDocument" component={AddDocumentScreen} options={{ title: 'Agregar Documento' }} />
      <Stack.Screen name="DocumentList" component={DocumentListScreen} options={{ title: 'Lista de Documentos' }} />
      <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} options={{ title: 'Ver Documento' }} />
    </Stack.Navigator>
  );
};
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Notificaciones') {
            iconName = 'notifications-outline';
          }

          // return <Ionicons name={iconName} size={size} color={color} />;
          return <Text>asdas</Text>;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Home" component={DrawerNavigator} options={{headerShown:false}} />
      <Tab.Screen name="Notificaciones" component={NotifyScreen} />
    </Tab.Navigator>
  )
}
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
     <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        {/* <Drawer.Screen name="Notificaciones" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
  )
}

export default AppNavigator;
