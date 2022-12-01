import React from 'react'
import {View, Dimensions, StyleSheet, Text} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

const {width, height} = Dimensions.get('window')
const SIZE = width * 0.58

interface Props {
  title: string
  index: number
  translateX: Animated.SharedValue<number>
}

const Props: React.FC<Props> = ({title, index, translateX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
  const boxReStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    )
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [SIZE / 2, SIZE / 4, SIZE / 2],
      Extrapolation.CLAMP,
    )
    return {
      borderRadius: borderRadius,
      transform: [{scale}],
    }
  })
  const textReStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 3, 0, -height / 3],
      Extrapolation.CLAMP,
    )
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP,
    )
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    )
    return {
      transform: [
        {
          translateY,
        },
        {scale},
      ],
      opacity,
    }
  })
  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.box, boxReStyles]}>
        <Animated.View style={[styles.textContainer, textReStyles]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const boxBg = 'midnightblue'

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: boxBg,
    marginBottom: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderColor: boxBg,
    borderStyle: 'solid',
    borderWidth: 6,
  },
  textContainer: {},
  text: {
    fontSize: 50,
    color: '#f0f0f0',
    textTransform: 'uppercase',
    fontWeight: '700',
    translateY: 100,
  },
})

export default Props
