import React from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import {navigate} from '../rootNavigation'
import {fontSize} from '../constants'

type Props = {
  route: {
    name: string
    title: string
    component: string
  }
}

const ScreenListItem: React.FC<Props> = ({route}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate(route.name)
      }}
      style={styles.container}>
      <Text style={styles.text}>{route.title}</Text>
    </TouchableOpacity>
  )
}

export default ScreenListItem

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  text: {
    fontSize: fontSize.md,
    fontWeight: '500',
  },
})
