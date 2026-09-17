export type ProductCategory = 
  | 'all'
  | 'may-lanh'
  | 'tivi'
  | 'tu-lanh'
  | 'may-giat'
  | 'quat-dien'
  | 'may-loc-khi'
  | 'noi-com'
  | 'vi-song'
  | 'bep-tu'
  | 'nuoc-nong';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  features: string[];
  tag: string;
  tagType: 'primary' | 'secondary' | 'accent' | 'neutral';
  perkBadge: string;
  specs: Record<string, string>;
  inStock: boolean;
  warrantyMonths: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
  includeInstallation: boolean;
}

export interface OrderTrackingInfo {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  createdAt: string;
  status: 'received' | 'preparing' | 'shipping' | 'installed' | 'completed';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  paymentMethod: string;
  notes?: string;
  technician?: {
    name: string;
    phone: string;
    avatar?: string;
  };
  steps: {
    statusKey: string;
    title: string;
    description: string;
    time: string;
    done: boolean;
  }[];
}

export interface PromotionVoucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'fixed' | 'percent';
  discountValue: number;
  minSpend: number;
  badge: string;
  iconName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  boughtProduct: string;
  initial: string;
  date: string;
}
