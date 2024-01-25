"use client";

import { Product } from "@/payload-types";
import { FC, useEffect, useState } from "react";
import ProductPlaceHolder from "./ProductPlaceHolder";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import ImageSlider from "../ImageSlider";

type IProductListingProps = {
  product: Product | null;
  index: number;
};

const ProductListing: FC<IProductListingProps> = ({ product, index }) => {
  const [isVisable, setIsVisable] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisable(true);
    }, 100 * index);

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  if (!product || !isVisable) return <ProductPlaceHolder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const imageUrls = product.images
    .map(({ image }) => {
      return typeof image === "string" ? image : image.url;
    })
    .filter(Boolean) as string[];

  if (isVisable && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisable,
        })}
      >
        <ImageSlider urls={imageUrls} />
        <div className="flex flex-col w-full">
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

export default ProductListing;
