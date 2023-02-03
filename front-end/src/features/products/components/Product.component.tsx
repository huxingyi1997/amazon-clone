import { FC, useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import { ProductDocument } from "../models/Product";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { decrementProduct, incrementProduct } from "../productSlice";

interface ProductComponentProps {
  product: ProductDocument;
}

const ProductComponent: FC<ProductComponentProps> = ({
  product,
}: ProductComponentProps) => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.product);

  const cartItem = cart.find((item) => item._id === product._id);

  const qty: number = cartItem ? cartItem.quantity : 0;

  return (
    <Card sx={{ width: 300, minWidth: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/300.png/09f/fff"
        alt="image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          $ {product.price.toFixed(2)}
        </Typography>
        {product.description && (
          <Typography variant="body2" color="text.secondary">
           * {product.description}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => {
            dispatch(decrementProduct(product));
          }}
          disabled={qty === 0}
          size="large"
        >
          -
        </Button>
        <span>{qty}</span>
        <Button
          onClick={() => {
            dispatch(incrementProduct(product));
          }}
          size="large"
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductComponent;
