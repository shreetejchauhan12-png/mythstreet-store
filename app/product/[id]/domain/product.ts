import { ProductDetails } from "../types/product-details";
import { Variant } from "../types/variant";
import { reviews } from "@/app/data/reviews";

export function getProductImages(product: ProductDetails): string[] {
  return [
    product.main_image,
    product.image_2,
    product.image_3,
    product.image_4,
    product.image_5,
    product.image_6,
  ]
    .filter(Boolean)
    .map((image) => `/${image}`);
}

export function getGarmentVariants(
  variants: Variant[]
): Variant[] {
  return [
    ...new Map(
      variants.map((variant) => [
        variant.garment_type_id,
        variant,
      ])
    ).values(),
  ];
}

export function getColorVariants(
  variants: Variant[],
  garmentTypeId: number
): Variant[] {
  return variants.filter(
    (variant) =>
      variant.garment_type_id === garmentTypeId
  );
}

export function getRelatedProducts(
  variants: Variant[],
  currentProductId: number
): Variant[] {
  return [
    ...new Map(
      variants
        .filter(
          (variant) =>
            variant.id !== currentProductId
        )
        .map((variant) => [
          variant.garment_type_id,
          variant,
        ])
    ).values(),
  ];
}

export function getReviewData(
  product: ProductDetails
) {
  return reviews[
    product.design as keyof typeof reviews
  ];
}