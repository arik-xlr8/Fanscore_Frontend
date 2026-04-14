export type ProductCondition =
  | 'Sifir'
  | 'AzKullanilmis'
  | 'Iyi'
  | 'Orta'
  | 'Yipranmis';

export interface ProductList {
  productId: number;
  name: string;
  shortDescription?: string | null;
  price: number;
  listedAt: string;
  condition?: ProductCondition | string | null;

  userId: number;
  userName?: string | null;
  userProfilePic?: string | null;

  teamId?: number | null;
  teamName?: string | null;

  cityId: number;
  cityName?: string | null;

  mainPicUrl?: string | null;
}

export interface ProductDetail {
  productId: number;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  price: number;
  listedAt: string;
  condition?: ProductCondition | string | null;

  userId: number;
  userName?: string | null;
  userProfilePic?: string | null;
  phoneNumber?: string | null;

  teamId?: number | null;
  teamName?: string | null;

  cityId: number;
  cityName?: string | null;

  pictures: string[];
}

export interface ProductCreate {
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  price: number;
  teamId?: number | null;
  cityId: number;
  condition: ProductCondition;
  pictureUrls?: string[];
}

export interface ProductUpdate {
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  price: number;
  teamId?: number | null;
  cityId: number;
  condition: ProductCondition;
  pictureUrls?: string[];
}

export interface ApiMessageResponse {
  message: string;
}
