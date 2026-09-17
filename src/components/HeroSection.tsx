import React from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Fan, 
  Tv, 
  CheckCircle2,
  PhoneCall 
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { ProductCategory } from '../types';

interface HeroSectionProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onOpenConsultation,
}) => {
  const scrollToProducts = () => {
    const el = document.getElementById('san-pham-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Top Highlight Notice Bar */}
      <div className="w-full bg-[#004aae] text-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-xs sm:text-sm font-semibold flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300" />
            <span>Điện Máy Bình Lực: Tổng kho phân phối máy lạnh, tivi, tủ lạnh chính hãng tại Đà Nẵng &amp; Quảng Nam</span>
          </div>
          <div className="flex items-center gap-4 text-blue-100">
            <span className="hidden sm:inline">
              Hotline tư vấn: <strong className="text-white font-bold">{STORE_INFO.hotline}</strong>
            </span>
            <button
              onClick={scrollToProducts}
              className="underline hover:text-white transition-colors cursor-pointer"
            >
              Xem danh mục
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Main Visual Showcase (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 flex flex-col justify-between min-h-[460px] md:min-h-[500px] group">
            {/* Background Image with Ambient Zoom */}
            <div className="absolute inset-0 z-0">
              <img
                src={STORE_INFO.heroBannerUrl}
                alt="Không gian phòng khách hiện đại trưng bày điều hòa Daikin, Tivi 65 inch và tủ lạnh thông minh tại Bình Lực"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent"></div>
            </div>

            {/* Banner Content */}
            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-between h-full max-w-xl text-white">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004aae] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
                  <span>Tổng kho điện máy chính hãng</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold leading-tight tracking-tight text-white">
                  ĐIỆN MÁY HIỆN ĐẠI – <span className="text-amber-300">NÂNG TẦM CUỘC SỐNG</span>
                </h1>
                <p className="text-sm md:text-base text-gray-200 font-normal leading-relaxed">
                  Khám phá các thiết bị điện máy, điện lạnh chính hãng từ Daikin, Panasonic, LG, Samsung, Toshiba. Miễn phí giao hàng &amp; hỗ trợ khảo sát lắp đặt chuyên nghiệp.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={scrollToProducts}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#004aae] text-white font-bold text-sm sm:text-base shadow-lg hover:bg-[#0060df] transition-all cursor-pointer"
                  >
                    <span>Khám phá sản phẩm</span>
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenConsultation) {
                        onOpenConsultation();
                      } else {
                        scrollToProducts();
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#004aae] font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors shadow-md cursor-pointer"
                  >
                    <span>Tư vấn báo giá</span>
                    <PhoneCall className="w-4 h-4 text-[#004aae]" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    Bảo hành 24 tháng
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    Lắp đặt tận nơi
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white">
                    <CreditCard className="w-4 h-4 text-amber-300" />
                    Hỗ trợ trả góp 0%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Sub-Banners (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-5 justify-between">
            {/* Card 1: Air Conditioner */}
            <div
              onClick={() => {
                onSelectCategory('may-lanh');
                scrollToProducts();
              }}
              className="relative rounded-2xl overflow-hidden p-6 bg-[#f2f3ff] border border-[#d9e2ff] flex flex-col justify-between flex-1 shadow-sm hover:shadow-xl hover:border-[#004aae]/40 transition-all cursor-pointer group"
            >
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#004aae]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-1.5 relative z-10">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#004aae] text-white text-[11px] font-bold uppercase">
                  Chính Hãng 100%
                </span>
                <h3 className="text-lg md:text-xl text-[#131b2e] font-extrabold leading-snug">
                  Mùa Hè Mát Lạnh <span className="text-[#004aae] block">Inverter Siêu Tiết Kiệm</span>
                </h3>
                <p className="text-xs text-[#424654] leading-relaxed">
                  Điều hòa Daikin, Panasonic thế hệ mới công nghệ lọc khí và tiết kiệm điện năng.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 relative z-10">
                <span className="text-xs text-[#004aae] font-bold group-hover:underline flex items-center gap-1">
                  Khám phá máy lạnh <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#d9e2ff] flex items-center justify-center text-[#004aae] group-hover:scale-110 transition-transform">
                  <Fan className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Card 2: Smart TV */}
            <div
              onClick={() => {
                onSelectCategory('tivi');
                scrollToProducts();
              }}
              className="relative rounded-2xl overflow-hidden p-6 bg-[#f2f3ff] border border-[#c2c6d7]/40 flex flex-col justify-between flex-1 shadow-sm hover:shadow-xl hover:border-[#004aae]/40 transition-all cursor-pointer group"
            >
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#004aae]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-1.5 relative z-10">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#004aae] text-white text-[11px] font-bold uppercase">
                  Độ Phân Giải 4K
                </span>
                <h3 className="text-lg md:text-xl text-[#131b2e] font-extrabold leading-snug">
                  Giải Trí Đỉnh Cao <span className="text-[#004aae] block">Smart Tivi Chính Hãng</span>
                </h3>
                <p className="text-xs text-[#424654] leading-relaxed">
                  Màn hình sống động từ Sony, Samsung, LG cùng dịch vụ lắp đặt tận phòng khách.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 relative z-10">
                <span className="text-xs text-[#004aae] font-bold group-hover:underline flex items-center gap-1">
                  Khám phá Tivi <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#d9e2ff] flex items-center justify-center text-[#004aae] group-hover:scale-110 transition-transform">
                  <Tv className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
