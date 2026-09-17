import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { BRANDS } from '../data/products';

interface BrandPartnersSectionProps {
  onSelectBrand: (brandName: string) => void;
}

export const BrandPartnersSection: React.FC<BrandPartnersSectionProps> = ({
  onSelectBrand,
}) => {
  return (
    <section className="space-y-4 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4" id="thuong-hieu-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#004aae] font-bold">
            Cam kết nguồn gốc xuất xứ
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
            THƯƠNG HIỆU ĐỐI TÁC CHIẾN LƯỢC
          </h2>
        </div>
        <span className="text-xs text-[#424654] flex items-center gap-1 font-medium self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#004aae]" />
          Đại lý phân phối ủy quyền chính thức
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {BRANDS.map((brand, idx) => (
          <div
            key={idx}
            onClick={() => {
              onSelectBrand(brand.name);
              const el = document.getElementById('san-pham-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white p-4 rounded-xl shadow-xs hover:shadow-md border border-gray-100 flex flex-col items-center justify-center text-center group cursor-pointer transition-all hover:-translate-y-1"
          >
            <span className="text-base sm:text-lg font-black tracking-tight text-[#131b2e] group-hover:text-[#004aae] transition-colors">
              {brand.name}
            </span>
            <span className="text-[11px] text-gray-500 mt-1 font-medium">
              {brand.origin}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
