"use client";

import { Product } from "@/payload-types";
import { FC } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks";
import { formatPrice } from "@/lib/utils";

type ICartItemProps = {
  product: Product;
};

const CartItem: FC<ICartItemProps> = ({ product }) => {
  const { images, name, id, price } = product;
  const { image } = images[0];
  const { removeItem } = useCart();

  

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 mix-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image?.url ? (
              <Image
                src={image?.url}
                layout="fill"
                className="object-cover absolute"
                alt="product_image"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {name}
            </span>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>
            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(id)}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
