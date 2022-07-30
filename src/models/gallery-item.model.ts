import { User } from "./user.model";

export class GalleryItem {
  id: string;
  name: string;
  type: string;

  image?: string;

  description?: string;

  is_active?: boolean;

  quantity?: number;

  price?: number;

  parent_id: string;

  business_id: string;

  created_by_id: string;

  updated_by_id: string;

  children: GalleryItem[];

  parent?: GalleryItem;
  created_by: User;

  updated_by?: User;

  // business: Business;

  // favorites: Favorite[];
  created_at: string;
  updated_at: string;
}
