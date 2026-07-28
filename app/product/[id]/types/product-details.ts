/**
 * ============================================================================
 * ProductDetails
 * ----------------------------------------------------------------------------
 * Frontend contract for the Product Details page.
 *
 * This represents the complete response returned by the Product Details API.
 *
 * IMPORTANT
 * ----------
 * This is NOT the database model.
 * This is the object consumed by the Product Page.
 *
 * The backend is free to change internally as long as it continues returning
 * this contract.
 * ============================================================================
 */

import { VariantSize } from "./variant";

export interface ProductDetails {
  // ---------------------------------------------------------------------------
  // Identity
  // ---------------------------------------------------------------------------

  id: number;
  design_id: number;

  // ---------------------------------------------------------------------------
  // Product Information
  // ---------------------------------------------------------------------------

  title: string;
  design: string;
  design_slug: string;

  description: string;

  // ---------------------------------------------------------------------------
  // Collection
  // ---------------------------------------------------------------------------

  collection: string;
  collection_slug: string;

  // ---------------------------------------------------------------------------
  // Garment
  // ---------------------------------------------------------------------------

  garment_type_id: number;

  type: string;
  garment_slug: string;

  gender_visibility: string;
  hero_type: string;

  // ---------------------------------------------------------------------------
  // Color
  // ---------------------------------------------------------------------------

  color_id: number;

  color_name: string;
  color_slug: string;
  hex_code: string;

  // ---------------------------------------------------------------------------
  // Pricing
  // ---------------------------------------------------------------------------

  price: number;

  // ---------------------------------------------------------------------------
  // Variant
  // ---------------------------------------------------------------------------

  sku: string;

  qikink_product_id: string | null;

  is_hero: boolean;

  // ---------------------------------------------------------------------------
  // Images
  // ---------------------------------------------------------------------------

  thumbnail_image: string | null;

  main_image: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  image_5: string | null;
  image_6: string | null;

  banner_image: string | null;

  // ---------------------------------------------------------------------------
  // SEO
  // ---------------------------------------------------------------------------

  seo_title: string;
  seo_description: string;

  // ---------------------------------------------------------------------------
  // Sizes
  // ---------------------------------------------------------------------------

  sizes: VariantSize[];
}