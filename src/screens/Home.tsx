import React from 'react'
import {ScrollView} from 'react-native'
import stackedRoutes, {categories} from '../routes'

import {CategoryItem} from '../components'

const Home = () => {
  return (
    <ScrollView>
      {categories.map((category, i) => {
        return <CategoryItem key={i} route={stackedRoutes[category]} />
      })}
    </ScrollView>
  )
}

export default Home
