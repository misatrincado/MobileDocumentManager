import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Icons } from '../../../components/atoms/IconBank';
import Button from '../../../components/atoms/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = ['Familia', 'Trabajo', 'Viajes', 'Entretenimiento'];
const STORAGE_KEY = '@documents';

const EditDocumentScreen = ({ route, navigation }) => {
  const { document } = route.params;

  const [description, setDescription] = useState(document?.description || '');
  const [name, setName] = useState(document?.name || '');
  const [selectedCategory, setSelectedCategory] = useState(document?.category || null);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const documents = stored ? JSON.parse(stored) : [];

      // Buscar el documento y actualizarlo
      const updatedDocuments = documents.map((doc) =>
        doc.id === document.id
          ? { ...doc, name, description, category: selectedCategory }
          : doc
      );

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocuments));

      Alert.alert('Guardado', 'El documento fue actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error guardando el documento:', error);
      Alert.alert('Error', 'No se pudo guardar el documento');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.ArrowLeftCircleIcon width={30} height={30} color="#131927" />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.centerTitle}>Editar ficha</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/stepper2.png')}
          style={styles.image}
        />
      </View>

      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Describe el archivo..."
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Nombre del archivo</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre del archivo"
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryOption,
              selectedCategory === cat && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.selectedCategoryText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button title="Guardar cambios" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  centerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 20,
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    minHeight: 100,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#F8FAFC',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#F8FAFC',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  categoryOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#fff',
    marginRight: 10,
    marginTop: 8,
  },
  selectedCategory: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    color: '#1E293B',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});

export default EditDocumentScreen;
