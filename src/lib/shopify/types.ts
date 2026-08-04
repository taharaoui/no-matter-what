export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
};

/** Shape for the /boutique grid — no variants, no description. */
export type ProductListItem = {
  handle: string;
  title: string;
  availableForSale: boolean;
  featuredImage: ProductImage | null;
  priceRange: { min: Money };
};

/** Shape for the /boutique/[handle] page — full detail. */
export type Product = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  priceRange: { min: Money };
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: {
      handle: string;
      title: string;
      featuredImage: ProductImage | null;
    };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: CartLine[];
};

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};
