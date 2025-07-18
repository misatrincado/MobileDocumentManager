import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from '../atoms/Avatar';
import { TextAtom } from '../atoms/TextAtom';

type UserInfoProps = {
  name: string;
  address: string;
  avatarUri: string;
};

export const UserInfo = ({ name, address, avatarUri }: UserInfoProps) => (
  <View style={styles.container}>
    <Avatar uri={avatarUri} />
    <View style={styles.textContainer}>
      <TextAtom style={styles.name}>{name}</TextAtom>
      <TextAtom style={styles.address}>{address}</TextAtom>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  textContainer: { marginLeft: 12 },
  name: { fontWeight: 'bold', fontSize: 18 },
  address: { fontSize: 14, color: '#666' },
});