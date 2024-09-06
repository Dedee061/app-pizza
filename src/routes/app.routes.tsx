import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from '../pages/Dashboard'
import Order from '../pages/Order'


export type StackPramsLst = {
  Dashboard: undefined,
  Order: undefined
}

const Stack = createNativeStackNavigator<StackPramsLst>()

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
      <Stack.Screen name="Order" component={Order} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}