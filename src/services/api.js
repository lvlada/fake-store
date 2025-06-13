import axios from "axios";

const HTML = "https://fakestoreapi.com";

export const getAllProducts = async () => {
  const data = await axios.get(`${HTML}/products`);
  return data?.data;
};

export const addNewProduct = async (newProduct) => {
  const response = await axios.post(`${HTML}/products`, newProduct, {
    method: "POST",
    headers: { "Content-Type": "application/json" },

  });
  return response.data;
};
