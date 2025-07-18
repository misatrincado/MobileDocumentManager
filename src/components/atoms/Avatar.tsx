import React from 'react';
import { Image, StyleSheet } from 'react-native';

type AvatarProps = { uri: string; size?: number };

export const Avatar = ({ uri, size = 50 }: AvatarProps) => (
  <Image source={require('../../assets/images/avatar.png')} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
);

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
});