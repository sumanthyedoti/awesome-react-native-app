type Screen = {
  name: string
  title: string
}
export type Stack = Screen[]

export const categories = ['Reanimated', 'GestureHandler'] as const
type Categories = typeof categories[number]

type Stacks = {
  [K in Categories]: {
    name: string
    title: string
    stack: Stack
  }
}

// 'name' should match with the screen export name
const stackedRoutes: Stacks = {
  Reanimated: {
    name: 'Reanimated',
    title: 'Reanimated',
    stack: [
      {
        name: 'Worklet',
        title: 'Worklet',
      },
      {
        name: 'ReanimatedBasic',
        title: 'Basic',
      },
      {
        name: 'ScrollViewXInterpolation',
        title: 'ScrollViewX Interpolation',
      },
      {
        name: 'ColorInterpolation',
        title: 'Color Interpolation',
      },
    ],
  },
  GestureHandler: {
    name: 'GestureHandler',
    title: 'Gesture Handler',
    stack: [
      {
        name: 'BasicGesture',
        title: 'Basic Gesture',
      },
    ],
  },
}

export default stackedRoutes
