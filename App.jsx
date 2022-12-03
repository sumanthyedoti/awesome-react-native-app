import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {navigationRef} from './src/rootNavigation'
import * as screens from './src/screens'
import {ScreensList} from './src/screens'
import Home from './src/screens/Home'
import stackedRoutes, {categories} from './src/routes'
import {enableFreeze} from 'react-native-screens'

enableFreeze()

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Awesome RN App'}}
        />
        {/* Items in catergories */}
        {Object.keys(stackedRoutes).map((route, i) => {
          return (
            <Stack.Screen
              key={i}
              name={stackedRoutes[route].name}
              component={ScreensList}
              options={{title: stackedRoutes[route].title}}
              initialParams={{
                name: stackedRoutes[route].name,
              }}
            />
          )
        })}
        {/* Screens */}
        {categories.flatMap(category => {
          return stackedRoutes[category].stack.map((screen, i) => {
            return (
              <Stack.Screen
                key={i}
                name={screen.name}
                component={screens[screen.name]}
                options={{title: screen.title}}
              />
            )
          })
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
