import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import React, {useCallback, useRef} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'

const SIZE = 40

function Basic() {
  const touchX = useSharedValue(0)
  const touchY = useSharedValue(0)
  const gestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      touchX.value += e.x - SIZE / 2
      touchY.value += e.y - SIZE / 2
    },
    onEnd: _ => {
      touchX.value = withSpring(0)
      touchY.value = withSpring(0)
    },
  })

  const onHandlerStateChange = useCallback(() => {}, [])

  const rCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: touchX.value,
        },
        {
          translateY: touchY.value,
        },
      ],
    }
  })
  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.circle, rCircleStyles]} />
      </PanGestureHandler>
    </View>
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
