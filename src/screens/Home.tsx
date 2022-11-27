import React from 'react'
import {ScrollView} from 'react-native'
import routes from '../routes'

import ScreenListItem from '../components/ScreenListItem'

const Home = () => {
  return (
    <ScrollView>
      {routes.map((route, i) => {
        // skip first route
        if (i === 0) {
          return null
        }
        return <ScreenListItem key={i} route={route} />
      })}
    </ScrollView>
  )
}

export default Home
