import React from 'react'
import {ScrollView} from 'react-native'

import stackedRoutes from '../routes'
import {ScreenItem} from '../components'

const Home = ({navigation, route}) => {
  const {name} = route.params
  return (
    <ScrollView>
      {stackedRoutes[name].stack.map((route, i) => {
        console.log({route})
        return <ScreenItem key={i} route={route} />
      })}
    </ScrollView>
  )
}

export default Home
