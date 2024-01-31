import { MaxWidthWrapper, ProductReel } from "@/components";
import { PRODUCT_CATEGORIES } from "@/config";
import { FC } from "react";

type Param = string | string[] | undefined;

type IProductsPageProps = {
  searchParams: { [key: string]: Param };
};

const parse = (param: Param) => (typeof param === "string" ? param : undefined);

const ProductsPage: FC<IProductsPageProps> = ({ searchParams }) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse high-quality assests"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
