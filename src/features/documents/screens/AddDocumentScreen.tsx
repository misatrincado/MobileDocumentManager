import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pick } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';

import { Icons } from '../../../components/atoms/IconBank';
import Button from '../../../components/atoms/Button';
import FileTypeOptions from '../components/FileTypeOptions ';

const STORAGE_KEY = '@documents';

const AddDocumentScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<'pdf' | 'image' | null>(null);

  const handlePickPDF = async () => {
    try {
      const result = await pick({
        allowMultiSelection: false,
        type: ['application/pdf'],
      });

      const file = Array.isArray(result) ? result[0] : result;
      if (!file) {
        Alert.alert('Cancelado', 'No se seleccionó ningún archivo.');
        return;
      }

      const newPath = `${RNFS.CachesDirectoryPath}/${file.name}`;
      const fileCopyUri = file.fileCopyUri || file.uri;

      await RNFS.copyFile(fileCopyUri, newPath);

      const newDocument = {
        id: Date.now().toString(),
        name: file.name || 'Documento',
        uri: file.uri,
        fileCopyUri: fileCopyUri,
        localUri: `file://${newPath}`,
        type: file.type || 'application/pdf',
        date: new Date().toLocaleDateString(),
      };

      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const documents = stored ? JSON.parse(stored) : [];
      documents.push(newDocument);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(documents));

      navigation.navigate('FillFormScreen', { document: newDocument });
    } catch (error) {
      console.error('Error seleccionando documento:', error);
      Alert.alert('Error', 'No se pudo seleccionar un documento PDF.');
    }
  };

  const handlePickImage = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.didCancel) return;

    const asset = result.assets?.[0];
    if (!asset?.uri) {
      Alert.alert('Error', 'No se pudo obtener la imagen.');
      return;
    }

    const newPath = `${RNFS.CachesDirectoryPath}/${asset.fileName || 'photo.jpg'}`;

    // Copiar archivo de imagen a ruta local de la app
    await RNFS.copyFile(asset.uri, newPath);

    const newDocument = {
      id: Date.now().toString(),
      name: asset.fileName || 'Imagen',
      uri: asset.uri,
      localUri: `file://${newPath}`,  // Usar la copia local para acceso futuro
      type: asset.type || 'image/jpeg',
      date: new Date().toLocaleDateString(),
    };

    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const documents = stored ? JSON.parse(stored) : [];
    documents.push(newDocument);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(documents));

    navigation.navigate('FillFormScreen', { document: newDocument });
  } catch (error) {
    console.error('Error seleccionando imagen:', error);
    Alert.alert('Error', 'No se pudo seleccionar la imagen.');
  }
};

  const handleSelectFile = () => {
    if (selectedType === 'pdf') {
      handlePickPDF();
    } else if (selectedType === 'image') {
      handlePickImage();
    } else {
      Alert.alert('Tipo no seleccionado', 'Selecciona un tipo de archivo primero.');
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
        <Text style={styles.centerTitle}>Cargar archivo</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/stepper1.png')}
          style={styles.image}
        />
      </View>

      <View>
        <Text style={styles.mainTitle}>¿Cuál tipo de archivo quieres subir?</Text>
      </View>

      <View>
        <FileTypeOptions onSelect={(type: 'pdf' | 'image') => setSelectedType(type)} selected={selectedType} />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button title="Seleccionar archivo" onPress={handleSelectFile} />
      </View>
    </View>
  );
};

export default AddDocumentScreen;

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
  mainTitle: {
    fontSize: 29,
    fontWeight: '900',
    color: '#1E293B',
  },
});
