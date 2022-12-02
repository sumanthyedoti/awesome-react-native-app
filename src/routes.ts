type Route = {
  name: string
  title: string
  component: string
}

// 'component' should match with the screen export name
const routes: Route[] = [
  {
    name: 'Home',
    title: 'Home',
    component: 'Home',
  },
  {
    name: 'Worklet',
    title: 'Worklet',
    component: 'Worklet',
  },
  {
    name: 'Basic',
    title: 'Basic',
    component: 'Basic',
  },
  {
    name: 'ScrollViewXInterpolation',
    title: 'ScrollViewX Interpolation',
    component: 'ScrollViewXInterpolation',
  },
  {
    name: 'ColorInterpolation',
    title: 'Color Interpolation',
    component: 'ColorInterpolation',
  },
  {
    name: 'BasicGesture',
    title: 'Basic Gesture',
    component: 'BasicGesture',
  },
]

export default routes
