import React from 'react';
import { 
  Snowflake, 
  Tv, 
  Refrigerator, 
  WashingMachine, 
  Fan, 
  Wind, 
  CookingPot, 
  Microwave, 
  Flame, 
  Droplets, 
  ChevronRight 
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';

interface CategorySectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'may-lanh':
        return <Snowflake className="w-7 h-7" />;
      case 'tivi':
        return <Tv className="w-7 h-7" />;
      case 'tu-lanh':
        return <Refrigerator className="w-7 h-7" />;
      case 'may-giat':
        return <WashingMachine className="w-7 h-7" />;
      case 'quat-dien':
        return <Fan className="w-7 h-7" />;
      case 'may-loc-khi':
        return <Wind className="w-7 h-7" />;
      case 'noi-com':
        return <CookingPot className="w-7 h-7" />;
      case 'vi-song':
        return <Microwave className="w-7 h-7" />;
      case 'bep-tu':
        return <Flame className="w-7 h-7" />;
      case 'nuoc-nong':
        return <Droplets className="w-7 h-7" />;
      default:
        return <Snowflake className="w-7 h-7" />;
    }
  };

  return (
    <section className="space-y-4 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#004aae] font-bold">
            Khám phá theo nhu cầu
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
            DANH MỤC SẢN PHẨM NỔI BẬT
          </h2>
          <p className="text-xs sm:text-sm text-[#424654]">
            Lựa chọn phong phú với hơn 1,000+ sản phẩm điện máy, gia dụng chính hãng tuyển chọn
          </p>
        </div>
        <button
          onClick={() => {
            onSelectCategory('all');
            const el = document.getElementById('san-pham-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs sm:text-sm font-semibold text-[#004aae] hover:underline flex items-center gap-0.5 self-start md:self-auto cursor-pointer"
        >
          <span>Xem toàn bộ danh mục</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id as ProductCategory);
                const el = document.getElementById('san-pham-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex flex-col items-center text-center p-4 rounded-xl transition-all cursor-pointer group text-left ${
                isSelected
                  ? 'bg-[#d9e2ff] border-2 border-[#004aae] shadow-md -translate-y-1'
                  : 'bg-white border border-gray-100 shadow-xs hover:shadow-md hover:-translate-y-1'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                  isSelected
                    ? 'bg-[#004aae] text-white'
                    : 'bg-[#f2f3ff] text-[#004aae]'
                }`}
              >
                {getCategoryIcon(cat.id)}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#131b2e] group-hover:text-[#004aae] transition-colors leading-tight">
                {cat.name}
              </h4>
              <span className="text-[11px] text-[#424654] mt-1">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
