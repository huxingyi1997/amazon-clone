import { productApiInterface } from "../../../api";

const getProducts = async (token?: string) => {
  const response = await productApiInterface.productControllerFindAllProducts({
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data?.products ?? [];
};

export const productService = {
  getProducts,
};
