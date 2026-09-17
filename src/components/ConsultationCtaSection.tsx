import React from 'react';
import { Phone, MessageSquare, Headphones } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface ConsultationCtaSectionProps {
  onOpenCallback: () => void;
}

export const ConsultationCtaSection: React.FC<ConsultationCtaSectionProps> = ({
  onOpenCallback,
}) => {
  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <section className="rounded-3xl bg-[#d9e2ff]/70 border border-[#b0c6ff] p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004aae] text-white text-xs font-bold shadow-xs">
              <Headphones className="w-3.5 h-3.5" />
              <span>Hỗ trợ khách hàng 24/7</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] leading-snug">
              Cần tư vấn công suất máy lạnh hoặc chọn thiết bị phù hợp?
            </h3>
            <p className="text-xs sm:text-sm text-[#424654] leading-relaxed">
              Đừng ngần ngại liên hệ kỹ sư điện lạnh Bình Lực. Chúng tôi khảo sát tại nhà và báo giá trọn gói miễn phí, không phát sinh chi phí phụ!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${STORE_INFO.hotline.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#d14300] text-white font-extrabold text-sm sm:text-base shadow-lg hover:bg-[#a73400] transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>{STORE_INFO.hotline}</span>
            </a>
            <button
              type="button"
              onClick={onOpenCallback}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#004aae] font-bold text-sm sm:text-base shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-100 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Yêu cầu gọi lại</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
