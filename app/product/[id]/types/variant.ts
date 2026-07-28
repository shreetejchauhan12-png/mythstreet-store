export interface Variant {
  // ---------------------------------------------------------------------------
  // Identity
  // ---------------------------------------------------------------------------

  id: number;

  design_id: number;

  // ---------------------------------------------------------------------------
  // Design
  // ---------------------------------------------------------------------------

  title: string;

  design: string;

  design_slug: string;

  // ---------------------------------------------------------------------------
  // Garment
  // ---------------------------------------------------------------------------

  garment_type_id: number;

  garment_type: string;

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
  // Variant
  // ---------------------------------------------------------------------------

  sku: string;

  variant_code: string;

  price: number;

  qikink_product_id: string | null;

  is_hero: boolean;

  // ---------------------------------------------------------------------------
  // Images
  // ---------------------------------------------------------------------------

  main_image: string | null;

  image_2: string | null;

  image_3: string | null;

  image_4: string | null;

  image_5: string | null;

  image_6: string | null;

  banner_image: string | null;

  // ---------------------------------------------------------------------------
  // Sizes
  // ---------------------------------------------------------------------------

  sizes: VariantSize[];
}

export interface VariantSize {
  id?: number;

  name: string;

  stock: number;

  price?: number;

  enabled?: boolean;
}