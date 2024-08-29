import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { AuthContext } from "../contexts/AuthContext";

export default function Router() {
  const {isAuthenticated, loading} = useContext (AuthContext)
    

  if (loading) {
    
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"#1D1D2E"}}>
        <ActivityIndicator size={60} color={'#3FFFA3'}/>
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
