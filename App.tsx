import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from './src/rootNavigation';
import routes from './src/routes';
import * as screens from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {routes.map((screen, i) => {
          return (
            <Stack.Screen
              key={i}
              name={screen.name}
              component={screens[screen.component]}
              options={{title: 'Awesome RN App'}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
