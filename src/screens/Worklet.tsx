import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import {runOnUI} from 'react-native-reanimated'

// import { Container } from './styles';

export default function Worklet() {
  function someWorklet(greeting) {
    'worklet'
    console.log(greeting, 'From the UI thread')
  }

  function onPress() {
    runOnUI(someWorklet)('Howdy')
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Worklet</Text>
    </TouchableOpacity>
  )
}
