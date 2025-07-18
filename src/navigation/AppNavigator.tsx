import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/screens/HomeScreen';
import AddDocumentScreen from '../features/documents/screens/AddDocumentScreen';
import DocumentListScreen from '../features/documents/screens/DocumentListScreen';
import DocumentDetailScreen from '../features/documents/screens/DocumentDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotifyScreen from '../features/notify/screens/NotifyScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icons } from '../components/atoms/IconBank';
import { HomeHeader } from '../components/organisms/HomeHeader';
import FillFormScreen from '../features/documents/screens/FillFormScreen';
import DocumentSavedScreen from '../features/documents/screens/DocumentSavedScreen';
import EditDocumentScreen from '../features/documents/screens/EditDocumentScreen ';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{ 
        title: 'Inicio', headerShown: false,
      
        }} />
      <Stack.Screen name="AddDocument" component={AddDocumentScreen} options={{ title: 'Agregar Documento', headerShown: false, }} />
      <Stack.Screen name="DocumentList" component={DocumentListScreen} options={{ title: 'Lista de Documentos' }} />
      <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} options={{ title: 'Ver Documento', headerShown: false, }} />
      <Stack.Screen name="FillFormScreen" component={FillFormScreen} options={{ title: 'Rellenar ficha', headerShown: false, }} />
      <Stack.Screen name="DocumentSavedScreen" component={DocumentSavedScreen} options={{ title: 'Documento Guardado', headerShown: false, }} />
      <Stack.Screen name="EditDocumentScreen" component={EditDocumentScreen} options={{ title: 'Editar Documento', headerShown: false, }} />
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
            return <Icons.HouseIcon width={50} color={color} />;
          } else if (route.name === 'Notificaciones') {
            iconName = 'notifications-outline';
            return <Icons.BellIcon width={50} color={color} />;
          }

          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          marginHorizontal: 26, // Esto agrega espacio a izquierda y derecha
          height: 90,
          backgroundColor: '#E1EFFC', // blanco con transparencia
          borderRadius: 20,
          paddingBottom: 10,
          paddingTop: 25,
          borderWidth: 1,
          borderColor: '#ddd',
          // shadowColor: '#000',
          // shadowOffset: { width: 0, height: 4 },
          // shadowOpacity: 0.1,
          // shadowRadius: 6,
          // elevation: 6, // Android
        },
      })}
    >
      <Tab.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Notificaciones" component={NotifyScreen} />
    </Tab.Navigator>
  )
}
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="Notificaciones" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  )
}

export default AppNavigator;
