import type {
  Cart,
  CartLine,
  Money,
  Product,
  ProductImage,
  ProductListItem,
  ProductOption,
  ProductVariant,
  SelectedOption,
} from "./types";

/* Raw shapes as returned by the Storefront GraphQL API — edges/nodes and
   all, kept private to this file. Everything else in the app deals only
   with the flattened types in ./types. */

type Connection<TNode> = { edges: { node: TNode }[] };

type RawImage = { url: string; altText: string | null; width: number; height: number };
type RawMoney = { amount: string; currencyCode: string };
type RawSelectedOption = { name: string; value: string };

type RawProductListNode = {
  handle: string;
  title: string;
  availableForSale: boolean;
  featuredImage: RawImage | null;
  priceRange: { minVariantPrice: RawMoney };
};

export type RawProductsData = { products: Connection<RawProductListNode> };

type RawVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: RawSelectedOption[];
  price: RawMoney;
};

type RawProductDetailNode = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  images: Connection<RawImage>;
  options: { id: string; name: string; values: string[] }[];
  variants: Connection<RawVariantNode>;
  priceRange: { minVariantPrice: RawMoney };
};

export type RawProductByHandleData = { product: RawProductDetailNode | null };

type RawCartLineNode = {
  id: string;
  quantity: number;
  cost: { totalAmount: RawMoney };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: RawSelectedOption[];
    product: {
      handle: string;
      title: string;
      featuredImage: RawImage | null;
    };
  };
};

export type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: RawMoney; totalAmount: RawMoney };
  lines: Connection<RawCartLineNode>;
};

export function edgesToNodes<TNode>(connection: Connection<TNode> | null | undefined): TNode[] {
  return connection?.edges.map((edge) => edge.node) ?? [];
}

function reshapeMoney(raw: RawMoney): Money {
  return { amount: raw.amount, currencyCode: raw.currencyCode };
}

function reshapeImage(raw: RawImage): ProductImage {
  return { url: raw.url, altText: raw.altText, width: raw.width, height: raw.height };
}

function reshapeSelectedOption(raw: RawSelectedOption): SelectedOption {
  return { name: raw.name, value: raw.value };
}

export function reshapeProductListItem(raw: RawProductListNode): ProductListItem {
  return {
    handle: raw.handle,
    title: raw.title,
    availableForSale: raw.availableForSale,
    featuredImage: raw.featuredImage ? reshapeImage(raw.featuredImage) : null,
    priceRange: { min: reshapeMoney(raw.priceRange.minVariantPrice) },
  };
}

export function reshapeProduct(raw: RawProductDetailNode): Product {
  const variants: ProductVariant[] = edgesToNodes(raw.variants).map((v) => ({
    id: v.id,
    title: v.title,
    availableForSale: v.availableForSale,
    selectedOptions: v.selectedOptions.map(reshapeSelectedOption),
    price: reshapeMoney(v.price),
  }));

  const options: ProductOption[] = raw.options.map((o) => ({
    id: o.id,
    name: o.name,
    values: o.values,
  }));

  return {
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    availableForSale: raw.availableForSale,
    images: edgesToNodes(raw.images).map(reshapeImage),
    options,
    variants,
    priceRange: { min: reshapeMoney(raw.priceRange.minVariantPrice) },
  };
}

export function reshapeCart(raw: RawCart): Cart {
  const lines: CartLine[] = edgesToNodes(raw.lines).map((line) => ({
    id: line.id,
    quantity: line.quantity,
    cost: { totalAmount: reshapeMoney(line.cost.totalAmount) },
    merchandise: {
      id: line.merchandise.id,
      title: line.merchandise.title,
      selectedOptions: line.merchandise.selectedOptions.map(reshapeSelectedOption),
      product: {
        handle: line.merchandise.product.handle,
        title: line.merchandise.product.title,
        featuredImage: line.merchandise.product.featuredImage
          ? reshapeImage(line.merchandise.product.featuredImage)
          : null,
      },
    },
  }));

  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: {
      subtotalAmount: reshapeMoney(raw.cost.subtotalAmount),
      totalAmount: reshapeMoney(raw.cost.totalAmount),
    },
    lines,
  };
}
