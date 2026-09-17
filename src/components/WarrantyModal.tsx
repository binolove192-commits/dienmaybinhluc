import React from 'react';
import { X, ShieldCheck, RotateCcw, Clock, CheckCircle2, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface WarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WarrantyModal: React.FC<WarrantyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d9e2ff] text-[#004aae] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Chính sách minh bạch</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#131b2e]">
              Chính Sách Bảo Hành &amp; Đổi Mới Tại Bình Lực
            </h3>
            <p className="text-xs text-gray-500">
              Cam kết bảo vệ 100% quyền lợi người tiêu dùng với quy chuẩn bảo hành chính hãng từ nhà sản xuất.
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#424654]">
            {/* Rule 1 */}
            <div className="p-4 bg-[#f2f3ff] rounded-2xl border border-[#d9e2ff] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#004aae]">
                <RotateCcw className="w-4 h-4" />
                <span>1. Đổi mới 1 - 1 trong vòng 35 ngày</span>
              </div>
              <p className="leading-relaxed">
                Nếu thiết bị phát sinh lỗi phần cứng từ nhà sản xuất (như không lạnh, lỗi bo mạch điều khiển, máy nén không khởi động được), kỹ thuật viên Bình Lực sẽ đến tận nhà thẩm định và tiến hành đổi máy mới nguyên đai nguyên kiện 100% hoàn toàn miễn phí.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#131b2e]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2. Kích hoạt bảo hành điện tử chính hãng</span>
              </div>
              <p className="leading-relaxed">
                Ngay khi hoàn tất lắp đặt và bàn giao, nhân viên sẽ kích hoạt số seri máy trực tiếp trên hệ thống hãng (Daikin, Panasonic, Samsung, LG, Aqua) qua tin nhắn SMS tới số điện thoại của quý khách. Quý khách có thể kiểm tra thời hạn bảo hành bất cứ lúc nào.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#131b2e]">
                <Clock className="w-4 h-4 text-[#d14300]" />
                <span>3. Cam kết bảo hành mối nối ống đồng &amp; vật tư 12 tháng</span>
              </div>
              <p className="leading-relaxed">
                Khác biệt lớn nhất khi mua sắm tại Bình Lực là gói bảo hành dịch vụ thi công: Toàn bộ mối nối ống đồng, giắc co, dây điện nối và bảo ôn được bảo hành chống xì gas, rò rỉ nước trong suốt 1 năm. Nếu xảy ra rò gas, chúng tôi nạp lại gas và xử lý miễn phí 100%.
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-4">
            <div className="text-xs text-amber-900">
              <span className="font-bold block">Tổng đài hỗ trợ sự cố khẩn cấp:</span>
              <span>Tiếp nhận yêu cầu bảo hành mọi ngày trong tuần từ 6h45 đến 21h00</span>
            </div>
            <a
              href={`tel:${STORE_INFO.hotline.replace(/[^0-9]/g, '')}`}
              className="px-4 py-2 bg-[#d14300] hover:bg-[#a73400] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
