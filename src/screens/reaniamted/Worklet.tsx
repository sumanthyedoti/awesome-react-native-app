import React from 'react'
import {Text, View, Button, StyleSheet} from 'react-native'
import {runOnUI, runOnJS} from 'react-native-reanimated'
import {fontSize} from '../../constants'

// import { Container } from './styles';

export default function Worklet() {
  function someWorklet(greeting: string) {
    'worklet'
    console.log(
      greeting,
      ' from the UI thread. I can call methods from the RN thread',
    )
    runOnJS(callback)('argument_from_UI_thread')
  }

  function callback(text: string) {
    console.log(`Running on the RN thread with '${text}'`)
  }

  function onPress() {
    runOnUI(someWorklet)('Howdy')
  }
  return (
    <View style={styles.container}>
      <Button onPress={onPress} title="Run Worklet" />
      <Text style={styles.note}>You don't see anything on the interface</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  text: {
    fontSize: fontSize.lg,
    fontWeight: '500',
  },
  note: {
    paddingTop: 20,
    fontSize: fontSize.xs,
  },
})
