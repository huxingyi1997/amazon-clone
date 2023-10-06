import { FC, useEffect } from "react";

import HeaderComponent from "../features/products/components/Header.component";
import ProductComponent from "../features/products/components/Product.component";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { getProducts } from "../features/products/productSlice";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const { jwt } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    const token = jwt?.token;
    dispatch(getProducts(token));
  }, [])

  return (
    <div>
      <HeaderComponent />
      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "48px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "48px",
        }}
      >
        {products.length > 0 &&
          products.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
