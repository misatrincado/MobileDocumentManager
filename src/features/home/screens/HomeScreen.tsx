import React from 'react';
import { View, Text, Button } from 'react-native';
import { HomeHeader } from '../../../components/organisms/HomeHeader';
import DocumentListScreen from '../../documents/screens/DocumentListScreen';
import FloatingButton from '../../../components/atoms/FloatingButton';

const HomeScreen = ({ navigation }: any) => {

  const onAddDocument = () => {
    navigation.navigate('AddDocument');
  };

  return (
    <View style={{flex:1}}>
      <View style={{}}>
        <HomeHeader />
        <DocumentListScreen navigation={navigation} />
      </View>
      <FloatingButton onPress={onAddDocument} />
    </View>
  );
};

export default HomeScreen;
