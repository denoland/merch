export interface Money {
  amount: number;
  currencyCode: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  altText: string;
}

export interface List<T> {
  nodes: T[];
}

export interface ProductPriceRange {
  minVariantPrice: Money;
  maxVariantPrice: Money;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: Image | null;
  variants: List<ProductVariant>;
  priceRange: ProductPriceRange;
}

export interface ProductVariant {
  id: string;
  priceV2: Money;
  title: string;
}
