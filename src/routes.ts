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
    name: 'RNDefaultScreen',
    title: 'RN Default Screen',
    component: 'RNDefaultScreen',
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
]

export default routes
