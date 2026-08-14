export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                handle
                title
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

/* Shared field selection for the /boutique grid — used both for the root
   catalog read and for a single collection's products, so the two stay in
   sync and can be reshaped with the same function. */
const PRODUCT_LIST_ITEM_FRAGMENT = /* GraphQL */ `
  fragment ProductListItemFragment on Product {
    id
    handle
    title
    description
    availableForSale
    tags
    productType
    vendor
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 2) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

/* Root `products`, not scoped to any collection — must surface whatever a
   real store's catalog actually is, not just what's assigned to one
   collection like the demo store's "frontpage". */
export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($first: Int!) {
    products(first: $first, sortKey: TITLE) {
      edges {
        node {
          ...ProductListItemFragment
        }
      }
    }
  }
  ${PRODUCT_LIST_ITEM_FRAGMENT}
`;

/* Every collection, for the category dropdown on /boutique. */
export const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($first: Int!) {
    collections(first: $first, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
`;

/* Products scoped to one collection, once a category is picked in the
   dropdown. */
export const PRODUCTS_BY_COLLECTION_QUERY = /* GraphQL */ `
  query ProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first, sortKey: TITLE) {
        edges {
          node {
            ...ProductListItemFragment
          }
        }
      }
    }
  }
  ${PRODUCT_LIST_ITEM_FRAGMENT}
`;

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      tags
      productType
      vendor
      seo {
        title
        description
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export const CART_QUERY = /* GraphQL */ `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;
