import React, { useState } from 'react';
import { X, Phone, Headphones, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [productInterest, setProductInterest] = useState('may-lanh');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto close after 3s
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-[#131b2e]">
              Đã ghi nhận yêu cầu!
            </h4>
            <p className="text-xs text-gray-600">
              Kỹ sư điện máy Bình Lực sẽ liên hệ lại số <strong>{phone}</strong> trong vòng <strong>5 - 10 phút</strong> để tư vấn tận tình cho quý khách.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#004aae] text-white rounded-xl font-bold text-xs hover:bg-[#0060df] transition-colors"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d9e2ff] text-[#004aae] text-[11px] font-bold">
                <Headphones className="w-3.5 h-3.5" />
                <span>Tư vấn kỹ thuật miễn phí</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#131b2e]">
                Yêu cầu gọi lại tư vấn
              </h3>
              <p className="text-xs text-gray-500">
                Để lại số điện thoại, kỹ sư điện lạnh Bình Lực sẽ gọi lại giải đáp kỹ thuật, tính toán công suất hoặc báo giá chi tiết.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Số điện thoại của bạn *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0905.xxx.xxx"
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#004aae]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Tên của bạn (tùy chọn)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anh/Chị..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#004aae]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Thiết bị cần tư vấn:
                </label>
                <select
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-medium"
                >
                  <option value="may-lanh">Máy lạnh / Điều hòa Inverter</option>
                  <option value="tivi">Tivi thông minh 4K / OLED</option>
                  <option value="tu-lanh">Tủ lạnh 2 cánh / Side by Side</option>
                  <option value="may-giat">Máy giặt &amp; Sấy quần áo</option>
                  <option value="sua-chua">Bảo trì / Vệ sinh máy lạnh tại nhà</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#d14300] hover:bg-[#a73400] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Gửi yêu cầu gọi lại ngay</span>
              </button>
            </div>

            <div className="text-center text-[11px] text-gray-400">
              Hoặc gọi ngay hotline trực tiếp:{' '}
              <a href={`tel:${STORE_INFO.hotline.replace(/[^0-9]/g, '')}`} className="font-bold text-[#004aae]">
                {STORE_INFO.hotline}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
