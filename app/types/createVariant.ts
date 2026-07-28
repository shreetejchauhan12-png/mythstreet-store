export interface CreateVariantForm {
  garment_type_id: number | "";

  color_id: number | "";

  sku: string;

  price: number;

  qikink_product_id: string;

  is_hero: boolean;

  main_image: string;
  image_2: string;
  image_3: string;
  image_4: string;
  image_5: string;
  image_6: string;
  banner_image: string;

  sizes: {
    id?: number;
    name: string;
    stock: number;
    price?: number;
    enabled?: boolean;
  }[];
}
