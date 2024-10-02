import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

export type StackPramsLst = {
  Dashboard: undefined;
  Order: {
    number: number | string;
    order_id: string;
  };
  Finish: {
    number: number | string;
    order_id: string;
  };
};

const Stack = createNativeStackNavigator<StackPramsLst>();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Finish"
        component={FinishOrder}
        options={{
          headerTitle: "Finalizando",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#1d1d2e",
          },
        }}
      />
    </Stack.Navigator>
  );
}
