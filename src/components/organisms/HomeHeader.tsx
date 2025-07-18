import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UserInfo } from '../molecules/UserInfo';
import { Icons } from '../atoms/IconBank';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export const HomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <UserInfo
        name="Juan Pérez"
        address="Calle Falsa 123, Ciudad"
        avatarUri="https://i.pravatar.cc/100"
      />
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuButton}>
        <Icons.MenuIcon width={28} height={28} fill="#000" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 8,
  },
});