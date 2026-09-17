import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="space-y-5 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <span className="text-xs uppercase tracking-widest text-[#004aae] font-bold">
          Đánh giá chân thực
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
          KHÁCH HÀNG NÓI GÌ VỀ BÌNH LỰC?
        </h2>
        <p className="text-xs sm:text-sm text-[#424654]">
          Hơn 15,000+ gia đình tại Đà Nẵng và Quảng Nam đã tin tưởng chọn Bình Lực đồng hành
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-1 text-[#d14300]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d14300] text-[#d14300]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#424654] italic leading-relaxed">
                “{review.comment}”
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d9e2ff] text-[#004aae] flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                {review.initial}
              </div>
              <div>
                <h5 className="text-sm font-bold text-[#131b2e]">
                  {review.author}
                </h5>
                <div className="flex items-center gap-1.5 text-xs text-[#424654] flex-wrap">
                  <span>{review.location}</span>
                  <span>•</span>
                  <span className="text-[#004aae] font-semibold">{review.boughtProduct}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
