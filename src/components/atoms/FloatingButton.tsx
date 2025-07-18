// src/components/atoms/FloatingButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Icons } from './IconBank';

type FloatingButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

const FloatingButton = ({ onPress, style }: FloatingButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Icons.PlusIcon width={50} height={50} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 140,   // pegado abajo (podés ajustar)
    right: 20,    // pegado a la derecha
    backgroundColor: '#007AFF',
    width: 70,
    height: 70,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FloatingButton;
