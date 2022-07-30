import { UserRole } from 'src/enums/user-role.enum';

export class User {
  id: string;
  name: string;
  email: string;
  password?: string;
  address?: string;
  role: UserRole;
  business_id?: string;
  // business: Business;
  // createdItems: GalleryItem[];
  // updatedItems: GalleryItem[];
  // favoriteItems: Favorite[];
}
