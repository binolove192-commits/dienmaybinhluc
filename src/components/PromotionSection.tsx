import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  ArrowRight, 
  CreditCard, 
  Tv, 
  Layers, 
  Truck, 
  Check, 
  Copy 
} from 'lucide-react';
import { VOUCHERS } from '../data/products';
import { PromotionVoucher } from '../types';

interface PromotionSectionProps {
  onApplyVoucherToCart: (voucher: PromotionVoucher) => void;
  onOpenPromoListModal?: () => void;
}

export const PromotionSection: React.FC<PromotionSectionProps> = ({
  onApplyVoucherToCart,
  onOpenPromoListModal,
}) => {
  // Countdown timer simulation starting from 8h 34m 12s
  const [timeLeft, setTimeLeft] = useState(8 * 3600 + 34 * 60 + 12);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  const handleCopy = (voucher: PromotionVoucher, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(voucher.code);
    setCopiedCode(voucher.code);
    onApplyVoucherToCart(voucher);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const getPromoIcon = (iconName: string) => {
    switch (iconName) {
      case 'payments':
        return <CreditCard className="w-6 h-6 text-[#d14300]" />;
      case 'speaker_group':
        return <Tv className="w-6 h-6 text-[#004aae]" />;
      case 'join_inner':
        return <Layers className="w-6 h-6 text-[#d14300]" />;
      case 'home_repair_service':
        return <Truck className="w-6 h-6 text-[#004aae]" />;
      default:
        return <Flame className="w-6 h-6 text-[#d14300]" />;
    }
  };

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4" id="khuyen-mai-block">
      <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#a73400] via-[#d14300] to-[#004aae] text-white p-6 md:p-10 shadow-2xl relative">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header with Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/20 pb-6 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs uppercase font-bold tracking-wider text-amber-200">
              <Flame className="w-4 h-4 animate-bounce text-amber-300" />
              <span>Giờ vàng giá sốc</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              KHUYẾN MÃI ĐẶC BIỆT TRONG THÁNG
            </h2>
            <p className="text-xs sm:text-sm text-gray-200">
              Số lượng ưu đãi có hạn dành cho khách hàng đăng ký sớm nhất hôm nay
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 self-start md:self-auto">
            <span className="text-xs sm:text-sm font-medium text-white">Kết thúc trong:</span>
            <div className="flex items-center gap-1.5 text-base sm:text-lg font-extrabold text-white">
              <span className="bg-white text-[#d14300] px-2.5 py-1 rounded-lg shadow-xs">
                {pad(hours)}
              </span>
              <span>:</span>
              <span className="bg-white text-[#d14300] px-2.5 py-1 rounded-lg shadow-xs">
                {pad(minutes)}
              </span>
              <span>:</span>
              <span className="bg-white text-[#d14300] px-2.5 py-1 rounded-lg shadow-xs">
                {pad(seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Promo Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 relative z-10">
          {VOUCHERS.map((voucher) => (
            <div
              key={voucher.id}
              onClick={(e) => handleCopy(voucher, e)}
              className="bg-white rounded-2xl p-5 text-[#131b2e] shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#f2f3ff] flex items-center justify-center">
                    {getPromoIcon(voucher.iconName)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-[#d14300]">
                    HOT
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-[#131b2e] group-hover:text-[#004aae] transition-colors">
                  {voucher.title}
                </h4>
                <p className="text-xs text-[#424654] leading-relaxed">
                  {voucher.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#d14300] flex items-center gap-1">
                  {copiedCode === voucher.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Đã lưu mã!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{voucher.badge}</span>
                    </>
                  )}
                </span>
                <ArrowRight className="w-4 h-4 text-[#004aae] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center pt-8 relative z-10">
          <button
            onClick={() => {
              const el = document.getElementById('san-pham-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#d14300] font-extrabold text-sm sm:text-base rounded-xl shadow-xl hover:bg-gray-100 hover:text-[#a73400] transition-all cursor-pointer"
          >
            <span>Xem tất cả sản phẩm đang giảm giá</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
