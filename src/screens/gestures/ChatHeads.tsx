import React from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated'

/*
NOTES:
- GestureDetector can recognize more than one gesture at the time
- GestureDetector is not compatible with Animated
*/

const SIZE = 60
const HEADER_HEIGHT = 100
const OFFSET = 8

const springOptions = {
  damping: 20,
  stiffness: 300,
}

interface AnimatedPosition {
  x: Animated.SharedValue<number>
  y: Animated.SharedValue<number>
  offset: number
}
const useFollowHead = ({x, y, offset = 0}: AnimatedPosition) => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions()
  const followX = useDerivedValue(() => {
    if (x.value < SCREEN_WIDTH / 2) {
      return withSpring(x.value + offset, springOptions)
    }
    return withSpring(x.value - offset, springOptions)
  })
  const followY = useDerivedValue(() => {
    return withSpring(
      interpolate(
        y.value,
        [0, SCREEN_HEIGHT - SIZE],
        [y.value + offset, y.value - offset],
      ),
      springOptions,
    )
  })

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: followX.value,
        },
        {
          translateY: followY.value,
        },
      ],
    }
  })
  return {x: followX, y: followY, rStyles}
}

function Basic() {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions()
  const translateX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2)
  const translateY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2)
  const context = useSharedValue({x: 0, y: 0})

  const pan = Gesture.Pan()
    .onStart(() => {
      // save last left position
      context.value = {x: translateX.value, y: translateY.value}
    })
    .onUpdate(e => {
      translateX.value = context.value.x + e.translationX
      translateY.value = context.value.y + e.translationY
    })
    .onEnd(() => {
      if (translateX.value < SCREEN_WIDTH / 2 - SIZE / 2) {
        translateX.value = 0
      } else {
        translateX.value = SCREEN_WIDTH - SIZE
      }
      if (translateY.value < 0) {
        translateY.value = 0
      } else if (translateY.value > SCREEN_HEIGHT - SIZE - HEADER_HEIGHT) {
        translateY.value = SCREEN_HEIGHT - SIZE - HEADER_HEIGHT
      }
    })
  const {
    x: firstX,
    y: firstY,
    rStyles: rFirstStyle,
  } = useFollowHead({
    x: translateX,
    y: translateY,
  })
  const {
    x: secondX,
    y: secondY,
    rStyles: rSecondStyle,
  } = useFollowHead({
    x: firstX,
    y: firstY,
    offset: OFFSET,
  })
  const {
    x: thirdX,
    y: thirdY,
    rStyles: rThirdStyle,
  } = useFollowHead({
    x: secondX,
    y: secondY,
    offset: OFFSET,
  })
  const {rStyles: rFourthStyle} = useFollowHead({
    x: thirdX,
    y: thirdY,
    offset: OFFSET,
  })
  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[styles.circle, styles.fourth, rFourthStyle]} />
      <Animated.View style={[styles.circle, styles.third, rThirdStyle]} />
      <Animated.View style={[styles.circle, styles.second, rSecondStyle]} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.circle, styles.first, rFirstStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  )
}
export default Basic

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  first: {
    backgroundColor: 'orange',
  },
  second: {
    backgroundColor: 'dodgerblue',
  },
  third: {
    backgroundColor: 'lawngreen',
  },
  fourth: {
    backgroundColor: 'fuchsia',
  },
})
