import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Icons } from '../../../components/atoms/IconBank';

type Document = {
  id: string;
  name: string;
  uri: string;
  date: string;
  type: string;
};

const STORAGE_KEY = '@documents';

// Función para detectar si es imagen por la extensión o tipo
const isImageFile = (doc: Document) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const ext = doc.name.split('.').pop()?.toLowerCase() || '';
  return doc.type.startsWith('image') || imageExtensions.includes(ext);
};

const DocumentListScreen = ({ navigation }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  console.log('documents', documents)
  const isFocused = useIsFocused();

  const loadDocuments = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      console.log('Cargando documentos:', stored);
      const docs = stored ? JSON.parse(stored) : [];
      setDocuments(docs);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar los documentos.');
    }
  };

  useEffect(() => {
    if (isFocused) loadDocuments();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Document }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DocumentDetail', { document: item })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isImageFile(item) ? (
          <Image
            source={{ uri: item.uri }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <Icons.PdfIcon width={50} height={50} color="#3D82F7" />
        )}

        <View style={{ justifyContent: 'center', marginLeft: 14, flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.meta} numberOfLines={1}>
            {item.description || 'Sin descripción'}
          </Text>
          <Text style={styles.meta}>
            {item.date}  {item.category || 'Sin categoría'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay documentos guardados.</Text>
        }
      />
    </View>
  );
};

export default DocumentListScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#e1e4e8',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  meta: { fontSize: 12, color: '#666' },
  empty: { textAlign: 'center', marginTop: 32, color: '#888' },
});
