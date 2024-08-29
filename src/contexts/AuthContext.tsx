import { View, Text } from "react-native";
import React, {
  Children,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { api } from "../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (info: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderPrps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderPrps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function GetUser() {
      // pegar os dados do user!

      const useInfo = await AsyncStorage.getItem("@pizzaria");
      let hasUser: UserProps = JSON.parse(useInfo || "{}");

      // verificando se receber as informação do user

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }
      setLoading(false);
    }

    GetUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      // console.log(reponse.data)
      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@pizzaria", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer ${token} `;

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);
    } catch (err) {
      console.log("Error" + err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
