import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  ShoppingCart, 
  CreditCard, 
  RotateCcw, 
  PhoneCall 
} from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, includeInstallation: boolean) => void;
  onBuyNow: (product: Product, quantity: number, includeInstallation: boolean) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'policy'>('desc');

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + '₫';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Đóng chi tiết sản phẩm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square bg-[#f2f3ff] rounded-2xl p-6 flex items-center justify-center border border-[#d9e2ff]">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#004aae] text-white text-xs font-bold">
                  {product.tag}
                </span>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#ffeedd] text-[#d14300] border border-[#ffdbcf] text-xs font-bold">
                  Giảm {product.discountPercent}%
                </span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#424654]">
                <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#004aae] shrink-0" />
                  <span>Bảo hành {product.warrantyMonths} tháng</span>
                </div>
                <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#004aae] shrink-0" />
                  <span>1 đổi 1 trong 35 ngày</span>
                </div>
              </div>
            </div>

            {/* Right: Product Info & Pricing */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span className="font-bold text-[#004aae] uppercase">{product.brand}</span>
                  <span>•</span>
                  <span>Mã SP: {product.id}</span>
                </div>
                <h2 className="text-lg md:text-xl font-extrabold text-[#131b2e] leading-snug">
                  {product.name}
                </h2>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex items-center text-[#d14300]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d14300] text-[#d14300]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-600">
                    {product.rating} ({product.reviewCount} đánh giá từ khách hàng)
                  </span>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 bg-[#f2f3ff] rounded-2xl space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-gray-500 font-semibold block">Giá thiết bị:</span>
                    <span className="text-xl sm:text-2xl font-black text-[#d14300]">
                      Liên hệ báo giá ưu đãi
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Sẵn hàng tại kho Đà Nẵng
                  </span>
                </div>
                <p className="text-xs text-[#004aae] font-semibold flex items-center gap-1 pt-1">
                  <Wrench className="w-3.5 h-3.5" />
                  {product.perkBadge} • Hỗ trợ khảo sát thực tế miễn phí
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Đặc điểm nổi bật:
                </p>
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#131b2e]">
                    <CheckCircle className="w-4 h-4 text-[#004aae] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Installation Option */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="w-4 h-4 rounded text-[#004aae] focus:ring-[#004aae]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#131b2e] block">
                      Đăng ký gói lắp đặt &amp; hút chân không chuyên nghiệp
                    </span>
                    <span className="text-emerald-600 font-medium">
                      Miễn phí công thợ + bảo hành mối nối ống đồng 1 năm
                    </span>
                  </div>
                </label>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-semibold text-gray-600">Số lượng:</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, quantity, includeInstallation);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-[#f2f3ff] hover:bg-[#d9e2ff] text-[#004aae] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Thêm danh sách báo giá</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onBuyNow(product, quantity, includeInstallation);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-[#004aae] hover:bg-[#0060df] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Nhận báo giá ngay</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Description & Technical Specs */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4 border-b border-gray-200 pb-2 mb-4 text-xs sm:text-sm">
              <button
                onClick={() => setActiveTab('desc')}
                className={`font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === 'desc'
                    ? 'text-[#004aae] border-b-2 border-[#004aae]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Mô tả chi tiết
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'text-[#004aae] border-b-2 border-[#004aae]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Thông số kỹ thuật
              </button>
              <button
                onClick={() => setActiveTab('policy')}
                className={`font-bold pb-2 transition-colors cursor-pointer ${
                  activeTab === 'policy'
                    ? 'text-[#004aae] border-b-2 border-[#004aae]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Chính sách giao lắp
              </button>
            </div>

            {activeTab === 'desc' && (
              <div className="text-xs sm:text-sm text-[#424654] leading-relaxed space-y-3">
                <p>{product.description}</p>
                <p>
                  Khi mua sản phẩm tại Cửa hàng Điện Máy Điện Lạnh Bình Lực, quý khách được đảm bảo 100% hàng chính hãng, nguyên đai nguyên kiện cùng dịch vụ khảo sát và giao hàng nhanh trong ngày trên toàn địa bàn TP. Đà Nẵng và tỉnh Quảng Nam.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2.5 px-4 font-semibold text-gray-600 w-1/3 border-b border-gray-100">
                          {key}
                        </td>
                        <td className="py-2.5 px-4 text-[#131b2e] font-medium border-b border-gray-100">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'policy' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                  <span className="font-bold text-[#004aae] block">1. Giao hàng 2-4h</span>
                  <p className="text-gray-500">Giao nhanh tại Hải Châu, Cẩm Lệ, Ngũ Hành Sơn, Thăng Bình, Tam Kỳ.</p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                  <span className="font-bold text-[#004aae] block">2. Kiểm tra trước thanh toán</span>
                  <p className="text-gray-500">Khách hàng được mở thùng kiểm tra máy móc, cắm điện thử nghiệm hài lòng mới trả tiền.</p>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                  <span className="font-bold text-[#004aae] block">3. Hỗ trợ kỹ thuật trọn đời</span>
                  <p className="text-gray-500">Bảo dưỡng định kỳ, vệ sinh máy lạnh giá ưu đãi cho khách hàng thân thiết.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
