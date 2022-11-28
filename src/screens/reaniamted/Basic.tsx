import React from 'react'
import {Button, StyleSheet, Text, useWindowDimensions, View} from 'react-native'
import Animated, {
  Easing,
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import {fontSize} from '../../constants'

const BOX_SIZE = 100

type BoxProps = {
  label: string
  style: StyleProps
}
const Box = ({label, style}: BoxProps) => {
  return (
    <Animated.View style={[styles.box, style]}>
      <Text style={styles.boxLabel}>{label}</Text>
    </Animated.View>
  )
}

export default function Basic() {
  const {width} = useWindowDimensions()
  const randomOffset = () => Math.random() * (width - BOX_SIZE)
  const offsetTimingX = useSharedValue(randomOffset())
  const offsetSpringX = useSharedValue(offsetTimingX.value)
  const animatedTimingStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetTimingX.value}],
    }
  })
  const animatedSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetSpringX.value}],
    }
  })
  const onPress = () => {
    const offset = randomOffset()
    offsetTimingX.value = withTiming(offset, {
      duration: 900,
      easing: Easing.out(Easing.exp),
    })
    offsetSpringX.value = withSpring(offset, {
      damping: 12,
      stiffness: 80,
    })
  }
  return (
    <View style={styles.container}>
      <Box style={animatedTimingStyles} label="withTiming" />
      <Box style={animatedSpringStyles} label="withSpring" />
      <Button title="Move" onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 6,
    backgroundColor: '#3355ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLabel: {
    color: 'white',
    fontSize: fontSize.xs,
  },
})
