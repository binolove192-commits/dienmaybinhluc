import React from 'react';
import { Truck, Wrench, ShieldCheck, Headphones } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section className="space-y-4 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <span className="text-xs uppercase tracking-widest text-[#004aae] font-bold">
          Uy tín tạo nên thương hiệu
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
          DỊCH VỤ TẬN TÂM – AN TÂM MUA SẮM
        </h2>
        <p className="text-xs sm:text-sm text-[#424654]">
          Tại Bình Lực, trải nghiệm hài lòng của bạn trước, trong và sau bán hàng là ưu tiên số 1.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service 1 */}
        <div className="p-6 bg-[#f2f3ff] rounded-2xl shadow-xs hover:shadow-md border border-[#d9e2ff] transition-all flex flex-col space-y-3 group">
          <div className="w-14 h-14 rounded-2xl bg-[#004aae] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Truck className="w-7 h-7" />
          </div>
          <h4 className="text-base font-extrabold text-[#131b2e]">
            Giao hàng tận nơi 2-4h
          </h4>
          <p className="text-xs text-[#424654] leading-relaxed">
            Giao hàng nhanh chóng trong 2-4h khu vực lân cận, hỗ trợ khách hàng kiểm tra đúng mẫu mã, cắm điện thử máy tại nhà trước khi thanh toán.
          </p>
        </div>

        {/* Service 2 */}
        <div className="p-6 bg-[#ffeedd]/70 rounded-2xl shadow-xs hover:shadow-md border border-[#ffdbcf] transition-all flex flex-col space-y-3 group">
          <div className="w-14 h-14 rounded-2xl bg-[#d14300] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Wrench className="w-7 h-7" />
          </div>
          <h4 className="text-base font-extrabold text-[#131b2e]">
            Lắp đặt chuyên nghiệp
          </h4>
          <p className="text-xs text-[#424654] leading-relaxed">
            Đội ngũ kỹ thuật viên lành nghề hơn 10 năm kinh nghiệm, hút chân không máy lạnh bài bản, vật tư ống đồng chuẩn dày dặn, bảo hành mối nối 1 năm.
          </p>
        </div>

        {/* Service 3 */}
        <div className="p-6 bg-[#f2f3ff] rounded-2xl shadow-xs hover:shadow-md border border-[#d9e2ff] transition-all flex flex-col space-y-3 group">
          <div className="w-14 h-14 rounded-2xl bg-[#0060df] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h4 className="text-base font-extrabold text-[#131b2e]">
            Bảo hành chính hãng 100%
          </h4>
          <p className="text-xs text-[#424654] leading-relaxed">
            Cam kết hàng mới nguyên đai nguyên kiện từ nhà máy. Kỹ thuật viên hỗ trợ kích hoạt tem bảo hành điện tử chính hãng trực tiếp qua tin nhắn SMS.
          </p>
        </div>

        {/* Service 4 */}
        <div className="p-6 bg-[#f2f3ff] rounded-2xl shadow-xs hover:shadow-md border border-[#d9e2ff] transition-all flex flex-col space-y-3 group">
          <div className="w-14 h-14 rounded-2xl bg-[#131b2e] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Headphones className="w-7 h-7" />
          </div>
          <h4 className="text-base font-extrabold text-[#131b2e]">
            Tư vấn miễn phí 24/7
          </h4>
          <p className="text-xs text-[#424654] leading-relaxed">
            Đội ngũ am hiểu chuyên sâu về thể tích phòng và công suất làm lạnh (BTU), tư vấn đúng sản phẩm phù hợp ngân sách, không lo tốn điện lãng phí.
          </p>
        </div>
      </div>
    </section>
  );
};
