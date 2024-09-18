import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../service/api";
import ModalPicker from "../../components/ModalPicker";

type RouterDetailsParams = {
  Order: {
    number: number | string;
    order_id: string;
  };
};

export type categoryProps = {
  id: string | number;
  name: string;
};

type ProductProps = {
  id: string 
  name: string;
  price: number;
}

type OrderRouteProps = RouteProp<RouterDetailsParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [qtd, setQtd] = useState("");
  const [category, setCategory] = useState<categoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<categoryProps>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

  const [products, setProducts] = useState<ProductProps[] | []>([]) 
  const [productsSelected, setProductsSelected] = useState<ProductProps | undefined>()
  const [modalProductVisible, setModalProductVisible] = useState(false)

  const [amount, setAmoumt] = useState("1");


  //listando categorias

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get("/category");

      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadInfo();
  }, []);

  async function handlerCloseorder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });
      navigation.goBack();
    } catch (e) {}
  }

  function handlerChangeCategory(item: categoryProps ){
    setCategorySelected(item)
  }

  // listando produtos

  useEffect(() => {

    async function loadProducts() {
      const response = await api.get(`/category/product`, {
        params: {
          category_id: categorySelected?.id,
        },
      });
      setProducts(response.data)
      setProductsSelected(response.data[0])
    }

    loadProducts()
  }, [categorySelected])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={handlerCloseorder}>
          <Feather name="trash-2" size={28} color="#ff3f4b" />
        </TouchableOpacity>
      </View>

      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color: "#fff" }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0&& (
        <TouchableOpacity style={styles.input}>
        <Text style={{ color: "#fff" }}>{productsSelected?.name}</Text>
      </TouchableOpacity>
      )} 

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmoumt}
        />
      </View>
        {/* SAI DAI CURIOSUKKKKJ  */}
      <View style={styles.action}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Avançar</Text>
        </TouchableOpacity>
      </View>


      <Modal transparent={true} visible={modalCategoryVisible} animationType="fade">
          <ModalPicker 
            handlerCloseModal={() => setModalCategoryVisible(false)}
            options={category}
            selectedItemm={handlerChangeCategory}
          />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D2E",
    paddingEnd: "4%",
    paddingVertical: "6%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 5,
    width: "100%",
    height: 40,
    marginBottom: 12,
    color: "#fff",
    justifyContent: "center",
    paddingHorizontal: 8,
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  action: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    backgroundColor: "#3fd1ff",
    borderRadius: 5,
    width: "20%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#101026",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#3FFFA3",
    borderRadius: 5,
    width: "75%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
