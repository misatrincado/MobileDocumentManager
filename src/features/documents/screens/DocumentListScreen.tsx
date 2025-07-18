import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Document = {
  id: string;
  name: string;
  uri: string;
  date: string;
  type: 'pdf' | 'image';
};

const STORAGE_KEY = '@documents';

const DocumentListScreen = ({ navigation }: any) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const loadDocuments = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setDocuments(JSON.parse(json));
    } catch (e) {
      Alert.alert('Error', 'No se pudieron cargar los documentos.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadDocuments);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: Document }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DocumentViewer', { document: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>{item.date} - {item.type.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay documentos cargados.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDocument')}
      >
        <Text style={styles.addButtonText}>+ Agregar Documento</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  name: { fontSize: 16, fontWeight: 'bold' },
  details: { fontSize: 12, color: '#555' },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
  addButton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
