import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ThumbsUp, 
  Play, 
  MessageCircle, 
  Camera 
} from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface FooterProps {
  onOpenWarranty: () => void;
  onOpenContact: () => void;
  onOpenBtuCalc: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWarranty,
  onOpenContact,
  onOpenBtuCalc,
  onOpenTracking,
}) => {
  return (
    <footer className="w-full bg-[#f2f3ff] border-t border-[#c2c6d7]/30 text-[#424654] mt-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Store Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={STORE_INFO.logoUrl}
                alt="Binh Luc Electronics Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="font-extrabold text-base text-[#004aae] uppercase tracking-tight">
                BÌNH LỰC
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#424654]">
              Cửa hàng chuyên phân phối thiết bị điện máy, điều hòa nhiệt độ, tủ lạnh, máy giặt và gia dụng chính hãng uy tín tại khu vực miền Trung. Cam kết dịch vụ tận tâm và thiết bị bền bỉ.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#c2c6d7]/40 text-xs text-[#004aae] font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Đã thông báo Bộ Công Thương
              </span>
            </div>
          </div>

          {/* Col 2: Customer Support */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#131b2e] uppercase tracking-wider">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#004aae] hover:underline transition-colors text-left"
                >
                  Hướng dẫn mua hàng online
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBtuCalc}
                  className="hover:text-[#004aae] hover:underline transition-colors text-left"
                >
                  Chính sách giao hàng &amp; lắp đặt tận nhà
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWarranty}
                  className="hover:text-[#004aae] hover:underline transition-colors text-left"
                >
                  Chính sách đổi trả 1 đổi 1 trong 35 ngày
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWarranty}
                  className="hover:text-[#004aae] hover:underline transition-colors text-left"
                >
                  Chính sách bảo hành chính hãng
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-[#004aae] hover:underline transition-colors text-left"
                >
                  Tra cứu bảo hành &amp; đơn hàng
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#131b2e] uppercase tracking-wider">
              Thông tin liên hệ
            </h4>
            <div className="space-y-2.5 text-xs text-[#424654]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#004aae] shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#004aae] shrink-0" />
                <span>
                  Hotline:{' '}
                  <strong className="text-[#d14300] font-bold">
                    {STORE_INFO.hotlineFormatted}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#004aae] shrink-0" />
                <span>{STORE_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#004aae] shrink-0 mt-0.5" />
                <span>Giờ phục vụ: {STORE_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Social & Payments */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#131b2e] uppercase tracking-wider">
              Kết nối &amp; Thanh toán
            </h4>
            <div>
              <p className="text-xs text-[#424654] mb-2 font-medium">Mạng xã hội</p>
              <div className="flex gap-2">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004aae] shadow-xs hover:bg-[#004aae] hover:text-white transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004aae] shadow-xs hover:bg-[#004aae] hover:text-white transition-colors"
                >
                  <Play className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Zalo"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004aae] shadow-xs hover:bg-[#004aae] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004aae] shadow-xs hover:bg-[#004aae] hover:text-white transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-[#424654] mb-2 font-medium">Phương thức thanh toán</p>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {['Visa/Master', 'VNPAY-QR', 'Chuyển khoản', 'Trả góp 0%', 'COD'].map((method) => (
                  <span
                    key={method}
                    className="px-2.5 py-1 bg-white rounded-md border border-[#c2c6d7]/30 text-[#131b2e] font-semibold"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-[#c2c6d7]/20 py-4 bg-[#eaedff]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#424654]">
          <p>© 2025 Điện Máy Điện Lạnh Bình Lực. Bản quyền thuộc về Cửa hàng Bình Lực. Thiết kế giao diện E-commerce UI/UX.</p>
        </div>
      </div>
    </footer>
  );
};
