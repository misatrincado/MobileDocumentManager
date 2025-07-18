import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../../../components/atoms/IconBank';
import styles from './FileTypeOptions .style'; // Asegúrate que no tenga el espacio en el nombre real

const FileTypeOptions = ({ onSelect }: { onSelect?: (type: 'pdf' | 'image') => void }) => {
  const [selectedType, setSelectedType] = useState<'pdf' | 'image' | null>(null);

  const handleSelect = (type: 'pdf' | 'image') => {
    setSelectedType(type);
    if (onSelect) onSelect(type);
  };

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        style={[styles.card, selectedType === 'pdf' && styles.selectedCard]}
        onPress={() => handleSelect('pdf')}
      >
        <View style={[styles.iconBox, selectedType === 'pdf' && styles.selectedIconBox]}>
          <Icons.PdfIcon width={24} height={24} color={selectedType === 'pdf' ? 'white' : '#3D82F7'} />
        </View>
        <View style={styles.textBox}>
          <Text style={[styles.title, selectedType === 'pdf' && styles.selectedTitle]}>PDF</Text>
          <Text style={styles.subtitle}>formato de archivo documento universal</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, selectedType === 'image' && styles.selectedCard]}
        onPress={() => handleSelect('image')}
      >
        <View style={[styles.iconBox, selectedType === 'image' && styles.selectedIconBox]}>
          <Icons.ImgIcon width={24} height={24} color={selectedType === 'image' ? 'white' : '#3D82F7'} />
        </View>
        <View style={styles.textBox}>
          <Text style={[styles.title, selectedType === 'image' && styles.selectedTitle]}>Imagen</Text>
          <Text style={styles.subtitle}>PNG | JPG | TTF | WEBP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FileTypeOptions;
