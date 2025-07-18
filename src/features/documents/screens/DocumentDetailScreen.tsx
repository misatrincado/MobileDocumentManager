import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icons } from '../../../components/atoms/IconBank';

const STORAGE_KEY = '@documents';

const DocumentDetailScreen = ({ route, navigation }) => {
  const { document } = route.params;

  if (!document || !document.localUri || !document.type) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el documento.</Text>
      </View>
    );
  }

  const isImage = document.type.startsWith('image/');
  const isPDF = document.type === 'application/pdf';
  const source = { uri: document.localUri };

  const handleDelete = async () => {
    Alert.alert(
      'Eliminar documento',
      '¿Seguro quieres eliminar este documento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem(STORAGE_KEY);
              const documents = stored ? JSON.parse(stored) : [];
              const filteredDocs = documents.filter((doc) => doc.id !== document.id);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDocs));
              navigation.goBack();
            } catch (error) {
              console.error('Error eliminando documento:', error);
              Alert.alert('Error', 'No se pudo eliminar el documento.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.ArrowLeftCircleIcon width={30} height={30} color="#131927" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={{ fontWeight: 'bold' }}>{document.name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleDelete} style={{ marginRight: 20 }}>
            <Icons.TrashIcon width={30} height={35} color="#ff0000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditDocumentScreen', { document })}
          >
            <Icons.PencilBoxIcon width={30} height={35} color="#ff0000" />
          </TouchableOpacity>
        </View>
      </View>

      {isPDF ? (
        <Pdf
          source={source}
          style={styles.pdf}
          onError={(error) => {
            console.log('PDF error:', error);
            Alert.alert('Error', 'No se pudo cargar el PDF.');
          }}
          onLoadComplete={(numberOfPages) => {
            console.log(`Total páginas: ${numberOfPages}`);
          }}
        />
      ) : isImage ? (
        <Image
          source={source}
          style={styles.image}
          resizeMode="contain"
          onError={() => {
            Alert.alert('Error', 'No se pudo cargar la imagen.');
            navigation.goBack();
          }}
        />
      ) : (
        <View style={styles.center}>
          <Text>Tipo de documento no soportado.</Text>
        </View>
      )}
    </View>
  );
};

export default DocumentDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
