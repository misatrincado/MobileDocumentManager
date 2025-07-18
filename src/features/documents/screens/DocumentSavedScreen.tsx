import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icons } from '../../../components/atoms/IconBank'; // Tus íconos personalizados
import Button from '../../../components/atoms/Button';

const DocumentSavedScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
    // Aquí puedes guardar la calificación si quieres
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Icons.CheckCircleIcon width={140} height={140} color="#3D82F7" />
        <Text style={styles.title}>¡Archivo guardado!</Text>
        <Text style={styles.subtitle}>
          Gracias por utilizar nuestra app,{'\n'}¡Valora nuestra atención!
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((val) => (
            <TouchableOpacity key={val} onPress={() => handleRate(val)}>
              {val <= rating ? (
                <Icons.StarIcon width={52} height={52} color="#3D82F7" />
              ) : (
                <Icons.StarOutlineIcon width={52} height={52} color="#3D82F7" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <Button title="Volver a inicio" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1E293B',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default DocumentSavedScreen;
