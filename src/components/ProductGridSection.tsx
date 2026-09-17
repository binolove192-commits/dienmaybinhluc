import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle, 
  Heart, 
  ShoppingCart, 
  Sparkles, 
  Wrench, 
  Truck, 
  Gift, 
  RotateCcw, 
  ShieldCheck, 
  CreditCard,
  Phone 
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface ProductGridSectionProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProductDetail: (product: Product) => void;
  searchQuery: string;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onBuyNow,
  onViewProductDetail,
  searchQuery,
}) => {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Filter products based on category and search query
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + '₫';
  };

  const getPerkIcon = (perk: string) => {
    if (perk.includes('công lắp') || perk.includes('chân đế')) return <Wrench className="w-3.5 h-3.5" />;
    if (perk.includes('hút chân không') || perk.includes('vận chuyển')) return <Truck className="w-3.5 h-3.5" />;
    if (perk.includes('khung treo')) return <Gift className="w-3.5 h-3.5" />;
    if (perk.includes('1 đổi 1')) return <RotateCcw className="w-3.5 h-3.5" />;
    if (perk.includes('trả góp')) return <CreditCard className="w-3.5 h-3.5" />;
    return <ShieldCheck className="w-3.5 h-3.5" />;
  };

  return (
    <section className="space-y-5 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4" id="san-pham-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d14300] font-bold">
            Lựa chọn hàng đầu
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
            SẢN PHẨM NỔI BẬT
          </h2>
        </div>

        {/* Filter Tabs matching HTML */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'may-lanh', label: 'Máy lạnh' },
            { id: 'tivi', label: 'Tivi' },
            { id: 'tu-lanh', label: 'Tủ lạnh' },
            { id: 'may-giat', label: 'Máy giặt' },
            { id: 'may-loc-khi', label: 'Máy lọc không khí' },
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id as ProductCategory)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#004aae] text-white shadow-sm'
                    : 'bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {searchQuery && (
        <div className="bg-[#f2f3ff] p-3 rounded-lg flex items-center justify-between text-xs text-[#424654]">
          <span>
            Kết quả tìm kiếm cho: <strong>"{searchQuery}"</strong> ({filteredProducts.length} sản phẩm)
          </span>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-[#004aae] font-semibold hover:underline cursor-pointer"
          >
            Hiển thị tất cả
          </button>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
          <p className="text-base text-gray-600 font-semibold mb-2">
            Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Quý khách có thể thử tìm kiếm với từ khóa khác hoặc liên hệ hotline để được hỗ trợ kiểm tra kho hàng.
          </p>
          <button
            onClick={() => onSelectCategory('all')}
            className="px-5 py-2.5 rounded-lg bg-[#004aae] text-white font-bold text-xs hover:bg-[#0060df] transition-colors"
          >
            Xem tất cả sản phẩm
          </button>
        </div>
      ) : (
        /* Products Grid (8 Items responsive) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((product) => {
            const isFavorite = !!wishlist[product.id];
            return (
              <div
                key={product.id}
                onClick={() => onViewProductDetail(product)}
                className="flex flex-col justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#004aae]/20 hover:-translate-y-1.5 transition-all cursor-pointer group"
              >
                <div className="space-y-3">
                  {/* Image and Badges */}
                  <div className="relative w-full aspect-square bg-[#f2f3ff] rounded-xl overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
                    />
                    
                    {/* Top-left Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          product.tag === 'Chính hãng'
                            ? 'bg-[#004aae] text-white'
                            : product.tag === 'Bán chạy'
                            ? 'bg-[#d14300] text-white'
                            : product.tag === 'Hot Deal'
                            ? 'bg-[#d14300] text-white'
                            : product.tag === 'Tiết kiệm điện'
                            ? 'bg-[#004aae] text-white'
                            : product.tag === 'Cao cấp'
                            ? 'bg-[#131b2e] text-white'
                            : 'bg-[#004aae] text-white'
                        }`}
                      >
                        {product.tag}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#ffeedd] text-[#d14300] border border-[#ffdbcf] text-[11px] font-bold">
                        Ưu đãi tại kho
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center transition-colors z-10 shadow-xs ${
                        isFavorite ? 'text-[#d14300]' : 'text-gray-400 hover:text-[#d14300]'
                      }`}
                      aria-label="Thêm vào yêu thích"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Brand & Rating */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#424654]">
                      <span className="font-bold text-[#004aae]">{product.brand}</span>
                      <span className="flex items-center gap-1 text-[#d14300] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#d14300] text-[#d14300]" />
                        <span>{product.rating} ({product.reviewCount})</span>
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#131b2e] mt-1 line-clamp-2 leading-snug group-hover:text-[#004aae] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* 3 Key Bullet Points */}
                  <div className="space-y-1 bg-[#f2f3ff]/70 p-2.5 rounded-xl text-xs text-[#424654]">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 leading-snug">
                        <CheckCircle className="w-3.5 h-3.5 text-[#004aae] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price, Perk Badge & Action Buttons */}
                <div className="pt-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                        Giá tham khảo:
                      </span>
                      <span className="text-base font-extrabold text-[#d14300]">
                        Liên hệ báo giá
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#004aae] bg-[#d9e2ff] px-2 py-0.5 rounded-md">
                      Cam kết giá tốt
                    </span>
                  </div>

                  {/* Perk Pill */}
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#004aae] bg-[#d9e2ff]/70 px-2 py-0.5 rounded-md">
                    {getPerkIcon(product.perkBadge)}
                    <span>{product.perkBadge}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full py-2 px-2 bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#004aae] rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Thêm báo giá</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBuyNow(product);
                      }}
                      className="w-full py-2 px-2 bg-[#004aae] hover:bg-[#0060df] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Nhận báo giá</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
