import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pick } from '@react-native-documents/picker';

const STORAGE_KEY = '@documents';

const AddDocumentScreen = ({ navigation }) => {
  const handlePickPDF = async () => {
    try {
      const result = await pick({
        allowMultiSelection: false,
        type: ['application/pdf'],  // Solo PDFs
      });

      if (!result) {
        Alert.alert('Cancelado', 'No se seleccionó ningún documento.');
        return;
      }

      // El pick devuelve un array si allowMultiSelection es true, si no, objeto simple
      const file = Array.isArray(result) ? result[0] : result;

      if (!file) {
        Alert.alert('Error', 'No se seleccionó un archivo válido.');
        return;
      }

      // Guardar en AsyncStorage
      const storedDocs = await AsyncStorage.getItem(STORAGE_KEY);
      const documents = storedDocs ? JSON.parse(storedDocs) : [];

      documents.push({
        id: Date.now().toString(),
        name: file.name || 'Sin nombre',
        uri: file.uri,
        type: file.type || 'application/pdf',
        date: new Date().toISOString(),
      });

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(documents));

      Alert.alert('Éxito', 'Documento PDF guardado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error seleccionando PDF:', error);
      Alert.alert('Error', 'No se pudo seleccionar un documento PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar PDF" onPress={handlePickPDF} />
    </View>
  );
};

export default AddDocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
