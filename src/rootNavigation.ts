import {
  createNavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params?: NavigatorScreenParams) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
