/*
  - svg animation
  - infinite animation
*/
import React, {useState, useEffect} from 'react'
import {Dimensions, StyleSheet, Switch} from 'react-native'
import Animated, {
  withRepeat,
  useAnimatedStyle,
  interpolateColor,
  useDerivedValue,
  withTiming,
  useSharedValue,
  Easing,
} from 'react-native-reanimated'

const {width} = Dimensions.get('window')
const CIRCLE_SIZE = width / 3.6

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const colors = {
  [Theme.DARK]: {
    bgPrimary: '#050505',
    bgSecondary: '#333',
    fgPrimary: '#f0f0f0',
  },
  [Theme.LIGHT]: {
    bgPrimary: '#f0f0f0',
    bgSecondary: '#e0e0e0',
    fgPrimary: '#2f2f2f',
  },
}

const ColorInterpolation: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT)

  const isDark01 = useDerivedValue(() => {
    return theme === Theme.DARK
      ? withTiming(1, {duration: 600})
      : withTiming(0, {duration: 600})
  }, [theme])

  const rContainerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isDark01.value,
        [1, 0],
        [colors.dark.bgSecondary, colors.light.bgSecondary],
      ),
    }
  })

  const rCircleStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isDark01.value,
        [1, 0],
        [colors.dark.bgPrimary, colors.light.bgPrimary],
      ),
    }
  })

  // const degrees = useSharedValue(0)
  // const rotationTimingOptions = {
  //   duration: 4000,
  //   easing: Easing.linear,
  // }
  // useEffect(() => {
  //   if (theme === Theme.DARK) {
  //     degrees.value = withRepeat(
  //       withTiming(degrees.value + 360, rotationTimingOptions),
  //       -1,
  //       false,
  //     )
  //   } else {
  //     degrees.value = withRepeat(
  //       withTiming(degrees.value - 360, rotationTimingOptions),
  //       -1,
  //       false,
  //     )
  //   }
  // }, [theme])
  //
  // const rIconViewStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         rotate: degrees.value + 'deg',
  //       },
  //     ],
  //   }
  // })

  return (
    <Animated.View style={[styles.container, rContainerStyles]}>
      <Animated.View style={[styles.circle, rCircleStyles]}>
        <Switch
          value={theme === Theme.DARK}
          onValueChange={isTrue => {
            setTheme(isTrue ? Theme.DARK : Theme.LIGHT)
          }}
          trackColor={{true: 'violet', false: 'yellow'}}
          thumbColor="#f5f5f5"
        />
      </Animated.View>
    </Animated.View>
  )
}

export default ColorInterpolation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
