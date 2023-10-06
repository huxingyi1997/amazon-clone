import axios from "axios";

import { baseAPI } from "../../constant";
import { ProductDocument } from "../models/Product";

const getProducts = async (token?: string) => {
  const url = `${baseAPI}/product`;
  const response = await axios.get<ProductDocument[]>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const productService = {
  getProducts,
};
