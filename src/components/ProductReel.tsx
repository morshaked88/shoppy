import Link from "next/link";
import { FC } from "react";

type IProductReelProps = {
  title: string;
  subtitle?: string;
  href?: string;
};

const ProductReel: FC<IProductReelProps> = ({ title, subtitle, href }) => {
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <h1 className="mt-2 text-sm text-muted-foreground">{subtitle}</h1>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-orange-600 hover:text-orange-600 md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default ProductReel;
