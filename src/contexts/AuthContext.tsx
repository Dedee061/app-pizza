import { View, Text } from 'react-native'
import React, { Children, createContext, ReactNode, useState } from 'react'

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderPrps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderPrps) {
    
    const [user , setuser] = useState<UserProps>({
        id: '1',
        name: 'teste',
        email: 'teste@teste.com',
        token: '123123',
        
    })

    const isAuthenticated = !!user.name
    
    return(

        <AuthContext.Provider value={{user, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}