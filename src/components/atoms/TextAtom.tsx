import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export const TextAtom = ({ children, style, ...props }: TextProps) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
});