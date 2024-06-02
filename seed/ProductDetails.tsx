interface ProductHeader {
  id: number;
  title: string;
}

interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productCategory: string;
}

export const ProductHeaders: ProductHeader[] = [
  {
    id: 1,
    title: "Index",
  },
  {
    id: 2,
    title: "Name",
  },
  {
    id: 3,
    title: "Price",
  },
  {
    id: 4,
    title: "Category",
  },
];

export const Products: Product[] = [
  {
    id: 1,
    productName: "Wireless Noise-Canceling Headphones",
    productPrice: 299,
    productCategory: "Electronics",
  },
  {
    id: 2,
    productName: "Smart Home Assistant Device",
    productPrice: 149,
    productCategory: "Electronics",
  },
  {
    id: 3,
    productName: "Classic Leather Bound Notebook",
    productPrice: 19,
    productCategory: "Books",
  },
  {
    id: 4,
    productName: "Bestseller Mystery Novel",
    productPrice: 12,
    productCategory: "Books",
  },
  {
    id: 5,
    productName: "Stainless Steel Cookware Set",
    productPrice: 199,
    productCategory: "Kitchen",
  },
  {
    id: 6,
    productName: "Chef's Knife Set",
    productPrice: 79,
    productCategory: "Kitchen",
  },
  {
    id: 7,
    productName: "Modern Sofa Set",
    productPrice: 999,
    productCategory: "Furniture",
  },
  {
    id: 8,
    productName: "Vintage Dresser",
    productPrice: 399,
    productCategory: "Furniture",
  },
  {
    id: 9,
    productName: "Designer Sunglasses",
    productPrice: 149,
    productCategory: "Fashion",
  },
  {
    id: 10,
    productName: "Casual Cotton T-Shirt",
    productPrice: 29,
    productCategory: "Fashion",
  },
  {
    id: 11,
    productName: "Gourmet Chocolate Box",
    productPrice: 29,
    productCategory: "Food",
  },
  {
    id: 12,
    productName: "Organic Tea Sampler",
    productPrice: 15,
    productCategory: "Food",
  },
];
