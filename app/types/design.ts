export interface Design {
  id: number;

  name: string;

  collection: string;

  collection_id: number;

  description: string;

  seo_title: string;

  seo_description: string;

  status: string;

  featured: boolean;

  trending: boolean;

  latest_drop: boolean;

  best_seller: boolean;

  created_at?: string;

  updated_at?: string;
}