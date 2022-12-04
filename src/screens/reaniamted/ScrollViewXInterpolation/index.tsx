import React from 'react'
import {Text, StyleSheet} from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'

import Page from './Page'

const words = ['Hello', 'React', 'Native']

const ScrollViewXInterpolation: React.FC = () => {
  const scrollOffsetX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffsetX.value = event.contentOffset.x
    },
  })
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      style={styles.container}>
      {words.map((word, index) => {
        return (
          <Page
            key={index.toString()}
            title={word}
            index={index}
            translateX={scrollOffsetX}
          />
        )
      })}
    </Animated.ScrollView>
  )
}

export default ScrollViewXInterpolation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
})
