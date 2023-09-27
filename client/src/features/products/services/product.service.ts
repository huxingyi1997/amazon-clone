import axios from "axios";

import { baseAPI } from "../../constant";
import { ProductDocument } from "../models/Product";

const getProducts = async () => {
  const url = `${baseAPI}/product`;
  const response = await axios.get<ProductDocument[]>(url);

  return response;
};

export const productService = {
  getProducts,
};
