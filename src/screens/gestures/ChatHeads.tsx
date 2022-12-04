import React from 'react'
import {StyleSheet} from 'react-native'
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
} from 'react-native-reanimated'

/*
NOTES:
- GestureDetector can recognize more than one gesture at the time
- GestureDetector is not compatible with Animated
*/

const SIZE = 60
const OFFSET = 6

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
  const followX = useDerivedValue(() => {
    return withSpring(x.value - offset, springOptions)
  })
  const followY = useDerivedValue(() => {
    return withSpring(y.value + offset / 2, springOptions)
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
  return {x: followX, y: followY, rStyles, offset: offset || OFFSET}
}

function Basic() {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const context = useSharedValue({x: 0, y: 0})

  const pan = Gesture.Pan()
    .onStart(_ => {
      // save last left position
      context.value = {x: translateX.value, y: translateY.value}
    })
    .onUpdate(e => {
      translateX.value = context.value.x + e.translationX
      translateY.value = context.value.y + e.translationY
    })
  const {
    x: firstX,
    y: firstY,
    rStyles: rFirstStyle,
    offset: offsetFirst,
  } = useFollowHead({
    x: translateX,
    y: translateY,
  })
  const {
    x: secondX,
    y: secondY,
    rStyles: rSecondStyle,
    offset: offsetSecond,
  } = useFollowHead({
    x: firstX,
    y: firstY,
    offset: offsetFirst,
  })
  const {
    x: thirdX,
    y: thirdY,
    rStyles: rThirdStyle,
  } = useFollowHead({
    x: secondX,
    y: secondY,
    offset: offsetSecond,
  })
  return (
    <GestureHandlerRootView style={styles.container}>
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
    justifyContent: 'center',
    alignItems: 'center',
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
})
