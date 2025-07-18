import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation } : any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Gestor Documental</Text>
      <Button title="Agregar Documento" onPress={() => navigation.navigate('AddDocument')} />
      <Button title="Ver Documentos" onPress={() => navigation.navigate('DocumentList')} />
    </View>
  );
};

export default HomeScreen;
