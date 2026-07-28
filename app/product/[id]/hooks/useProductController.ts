"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/app/lib/api";
import { useCart } from "@/app/store/cart";

import { ProductDetails } from "../types/product-details";
import { Variant } from "../types/variant";

import { useGallery } from "./useGallery";

import {
  getColorVariants,
  getGarmentVariants,
  getProductImages,
  getRelatedProducts,
  getReviewData,
} from "../domain/product";

type Props = {
  product: ProductDetails;
  variants: Variant[];
};

export function useProductController({
  product,
  variants,
}: Props) {
  const router = useRouter();

  const addToCart = useCart(
    (state) => state.addToCart
  );

  const [selectedSize, setSelectedSize] =
    useState("");

  const [selectedColor, setSelectedColor] =
    useState(product.color_name);

  const [quantity, setQuantity] =
    useState(1);

  const [error, setError] =
    useState("");

  useEffect(() => {
    setSelectedColor(product.color_name);
    setSelectedSize("");
    setQuantity(1);
    setError("");
  }, [product]);

  const gallery = useGallery(
    useMemo(
      () => getProductImages(product),
      [product]
    )
  );

  const garmentVariants = useMemo(
    () => getGarmentVariants(variants),
    [variants]
  );

  const colorVariants = useMemo(
    () =>
      getColorVariants(
        variants,
        product.garment_type_id
      ),
    [variants, product]
  );

  const relatedProducts = useMemo(
    () =>
      getRelatedProducts(
        variants,
        product.id
      ),
    [variants, product]
  );

  const reviewData = useMemo(
    () => getReviewData(product),
    [product]
  );

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("event", "view_item", {
      currency: "INR",

      value: product.price,

      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price: product.price,
        },
      ],
    });
  }, [product]);

  async function handleAddToCart() {
    if (!selectedSize) {
      setError("Please select size");
      return;
    }

    setError("");

    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize}`,
      title: `${product.title} (${selectedSize})`,
      price: product.price,
      image: product.main_image
        ? `/${product.main_image}`
        : "/placeholder.webp",
      quantity,
    });

    window.gtag("event", "add_to_cart", {
      currency: "INR",

      value: product.price * quantity,

      items: [
        {
          item_id: product.id,
          item_name: product.title,
          quantity,
          item_variant: selectedSize,
        },
      ],
    });

    await apiFetch("/api/products/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: product.id,
        size: selectedSize,
        quantity,
        title: `${product.title} (${selectedSize})`,
        price: product.price,
        image: product.main_image
          ? `/${product.main_image}`
          : "/placeholder.webp",
      }),
    });

    await useCart.getState().fetchCart();
  }

  function handleBuyNow() {
    if (!selectedSize) {
      setError("Please select size");
      return;
    }

    localStorage.setItem(
      "buyNowItem",
      JSON.stringify({
        id: `${product.id}-${selectedSize}`,
        title: `${product.title} (${selectedSize})`,
        image: product.main_image
          ? `/${product.main_image}`
          : "/placeholder.webp",
        price: product.price,
        quantity,
      })
    );

    router.push("/checkout?mode=buyNow");
  }

  return {
    product,

    variants,

    gallery,

    router,

    garmentVariants,

    colorVariants,

    relatedProducts,

    reviewData,

    selectedSize,

    selectedColor,

    quantity,

    error,

    setSelectedSize,

    setSelectedColor,

    setQuantity,

    setError,

    handleAddToCart,

    handleBuyNow,
  };
}