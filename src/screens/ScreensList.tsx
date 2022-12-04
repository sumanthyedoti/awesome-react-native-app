import React from 'react'
import {ScrollView} from 'react-native'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import stackedRoutes from '../routes'
import {ScreenItem} from '../components'

import type {RootStackParamList} from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenList'>

const Home = ({route}: Props) => {
  const {category} = route.params
  return (
    <ScrollView>
      {stackedRoutes[category].stack.map((routeInfo, i: number) => {
        return <ScreenItem key={i.toString()} route={routeInfo} />
      })}
    </ScrollView>
  )
}

export default Home
