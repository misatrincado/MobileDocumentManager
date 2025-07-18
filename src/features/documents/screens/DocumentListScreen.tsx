import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  ScrollView,
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
  description?: string;
  category?: string;
};

const STORAGE_KEY = '@documents';

const isImageFile = (doc: Document) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const ext = doc.name.split('.').pop()?.toLowerCase() || '';
  return doc.type.startsWith('image') || imageExtensions.includes(ext);
};

const categories = ['Todas', 'Familia', 'Trabajo', 'Viajes', 'Entretenimiento'];

const DocumentListScreen = ({ navigation }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const isFocused = useIsFocused();

  const loadDocuments = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const docs = stored ? JSON.parse(stored) : [];
      setDocuments(docs);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar los documentos.');
    }
  };

  useEffect(() => {
    if (isFocused) loadDocuments();
  }, [isFocused]);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Todas' || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
      <TextInput
        placeholder="Buscar por nombre o descripción..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.selectedCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.selectedText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={{maxHeight:540}}>

        <FlatList
          data={filteredDocuments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>No hay documentos guardados.</Text>
          }
        />
      </ScrollView>
    </View>
  );
};

export default DocumentListScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCategory: {
    backgroundColor: '#3D82F7',
    borderColor: '#3D82F7',
  },
  categoryText: {
    fontSize: 10,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
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
