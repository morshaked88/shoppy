"use client";

import { useEffect, useState, FC } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useCart } from "@/hooks";
import { Product } from "@/payload-types";

type IAddToCartButtonProps = {
  product: Product;
};
const AddToCartButton: FC<IAddToCartButtonProps> = ({ product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { addItem } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleClick = () => {
    setIsSuccess(true);
    addItem(product);
    toast.success("Added to cart");
  };
  return (
    <Button size="lg" className="w-full" onClick={handleClick}>
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
