export interface Variant {
  id: number;

  design_id: number;

  garment_type_id: number;

  garment_type: string;

  color_id: number;

  color_name: string;

  sku: string;

  variant_code: string;

  price: number;

  qikink_product_id: string;

  is_hero: boolean;

  gender_visibility: string;

  hero_type: string;

  main_image: string;

  image_2: string;

  image_3: string;

  image_4: string;

  image_5: string;

  image_6: string;

  banner_image: string;

  sizes: VariantSize[];
}

export interface VariantSize {
  id?: number;

  size: string;

  stock: number;

  price?: number;

  enabled?: boolean;
}