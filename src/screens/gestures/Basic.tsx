import React, {useCallback, useRef} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const SIZE = 40

function Basic() {
  const tanslateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const springOptions = {
    damping: 10,
    stiffness: 80,
  }
  const gestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      tanslateX.value = e.translationX
      translateY.value = e.translationY
    },
    onEnd: _ => {
      tanslateX.value = withSpring(0, springOptions)
      translateY.value = withSpring(0, springOptions)
    },
  })

  const onHandlerStateChange = useCallback(() => {}, [])

  const rCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tanslateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    }
  })
  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.circle, rCircleStyles]} />
      </PanGestureHandler>
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
    width: SIZE,
    height: SIZE,
    backgroundColor: 'orange',
    borderRadius: SIZE / 2,
  },
})
