import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
        backgroundColor:'#1E42A1',
        padding:20,
        borderRadius: 5
    }}>
      <Text style={{color:'white', fontSize: 20, fontWeight:'900', textAlign:'center'}}>
        {title}</Text>
    </TouchableOpacity>
  )
}

export default Button