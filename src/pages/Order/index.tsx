import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../service/api";
import ModalPicker from "../../components/ModalPicker";
import ItemList from "../../components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsLst } from "../../routes/app.routes";


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
  id: string | number;
  name: string;
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouterDetailsParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsLst>>();

  const [qtd, setQtd] = useState("");
  const [category, setCategory] = useState<categoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<
    categoryProps | undefined
  >();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productsSelected, setProductsSelected] = useState<
    ProductProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmoumt] = useState("1");
  const [items, setItems] = useState<ItemProps[]>([]);

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
    } catch (e) {
      alert("Falha ao cancelar pedido");
    }
  }


  async function handlerAdd() {
    const response = await api.post("/order/add", {
      order_id: route.params?.order_id,
      product_id: productsSelected?.id,
      amount: Number(amount),
    });

    let data = {
      id: response.data.id,
      product_id: productsSelected?.id as string,
      name: productsSelected?.name as string,
      amount: amount,
    };
    setItems((oldArray) => [...oldArray, data]);
  }

  // listando produtos

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get(`/category/product`, {
        params: {
          category_id: categorySelected?.id,
        },
      });
      setProducts(response.data);
      setProductsSelected(response.data[0]);
    }

    loadProducts();
  }, [categorySelected]);

  function handlerChangeCategory(item: categoryProps) {
    setCategorySelected(item);
  }
  function handlerProductChange(item: ProductProps) {
    setProductsSelected(item);
  }
  async function handlerDeleteItem(item_id: string) {
    await api.delete('order/remove', {
      params:{
        item_id: item_id,
      }
    })

    setItems(items.filter((item) => item.id!== item_id));
  }

  function handlerFinishOrder() {
    navigation.navigate('Finish', {
      number: route.params.number,
      order_id: route.params.order_id,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handlerCloseorder}>
            <Feather name="trash-2" size={28} color="#ff3f4b" />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#fff" }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
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
        <TouchableOpacity style={styles.buttonAdd} onPress={handlerAdd}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlerFinishOrder}
          disabled={items.length === 0}
          style={[
            styles.button,
            {
              opacity: items.length === 0 ? 0.3 : 1,
            },
          ]}
        >
          <Text style={styles.textButton}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemList data={item}  deleteItem={handlerDeleteItem}/>}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handlerCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItemm={handlerChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handlerCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItemm={handlerProductChange}
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
