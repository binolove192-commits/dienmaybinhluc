import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#004aae] uppercase tracking-wider">
              Hệ thống cửa hàng
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#131b2e]">
              Liên Hệ Điện Máy Điện Lạnh Bình Lực
            </h3>
            <p className="text-xs text-gray-500">
              Quý khách có thể ghé thăm trực tiếp trải nghiệm showroom hoặc liên hệ kỹ sư khảo sát tại nhà.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Information */}
            <div className="space-y-4 text-xs text-[#424654]">
              <div className="p-4 bg-[#f2f3ff] rounded-2xl border border-[#d9e2ff] space-y-3">
                <h4 className="font-extrabold text-sm text-[#004aae] uppercase">
                  Showroom Trưng Bày &amp; Kho Hàng
                </h4>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#004aae] shrink-0 mt-0.5" />
                    <span>{STORE_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#004aae] shrink-0" />
                    <span>
                      Hotline tư vấn:{' '}
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
                    <span>Thời gian phục vụ: {STORE_INFO.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="font-bold text-[#131b2e] block mb-1">
                  Khu vực phục vụ giao &amp; lắp tận nhà trong 2 - 4h:
                </span>
                <p className="text-gray-500 leading-relaxed">
                  Toàn bộ các quận huyện thuộc TP. Đà Nẵng (Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Cẩm Lệ, Liên Chiểu, Hòa Vang) và tỉnh Quảng Nam (Thăng Bình, Tam Kỳ, Hội An, Điện Bàn, Duy Xuyên...).
                </p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200">
              {sent ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h5 className="font-bold text-sm text-[#131b2e]">Đã gửi tin nhắn!</h5>
                  <p className="text-xs text-gray-500">
                    Bình Lực sẽ liên hệ phản hồi cho bạn trong thời gian sớm nhất.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <h4 className="font-extrabold text-sm text-[#131b2e]">
                    Gửi lời nhắn cho chúng tôi
                  </h4>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Họ tên của bạn</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full p-2 rounded-lg border border-gray-200 outline-none focus:border-[#004aae]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      required
                      placeholder="0905.xxx.xxx"
                      className="w-full p-2 rounded-lg border border-gray-200 outline-none focus:border-[#004aae]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Nội dung câu hỏi</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Ví dụ: Tôi muốn hỏi giá lắp điều hòa Daikin 1.5 HP tại Thăng Bình..."
                      className="w-full p-2 rounded-lg border border-gray-200 outline-none focus:border-[#004aae]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#004aae] hover:bg-[#0060df] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi tin nhắn</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
