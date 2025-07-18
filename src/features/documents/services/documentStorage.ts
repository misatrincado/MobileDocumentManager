import { Platform } from 'react-native';
import { pick } from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type DocumentMeta = {
  uri: string;
  name: string;
  type: string;
  date: string;
};

const STORAGE_KEY = 'documents';

export async function launchDocumentPicker(): Promise<DocumentMeta | null> {
  try {
    const res = await pick({
      type: [Platform.OS === 'android' ? 'application/pdf' : 'com.adobe.pdf'],
    });

    const doc: DocumentMeta = {
      uri: res[0].uri,
      name: res[0].name ?? 'Documento.pdf',
      type: 'pdf',
      date: new Date().toLocaleDateString(),
    };

    const current = await getStoredDocuments();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...current, doc]));
    return doc;
  } catch (err: any) {
    if (err.code === 'DOCUMENT_PICKER_CANCELED') return null;
    throw err;
  }
}

export async function getStoredDocuments(): Promise<DocumentMeta[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}
