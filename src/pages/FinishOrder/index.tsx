import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../service/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsLst } from "../../routes/app.routes";

type RouterDetailParams = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  };
};
type FinishRouterProp = RouteProp<RouterDetailParams, "FinishOrder">;

export default function FinishOrder() {
  const router = useRoute<FinishRouterProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsLst>>();

  async function handlerFinishOrder() {
    try {
      await api.put("/order/send", {
        order_id: router.params.order_id,
      });
      navigation.popToTop();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Você deseja finalizar esse pedido ?</Text>
      <Text style={styles.title}>Mesa {router.params.number}</Text>

      <TouchableOpacity style={styles.button} onPress={handlerFinishOrder}>
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
        <Feather name="shopping-cart" size={20} color={"#1d1d2e"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingHorizontal: "4%",
  },
  alert: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3fffae",
    flexDirection: "row",
    width: "65%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
  },
});
