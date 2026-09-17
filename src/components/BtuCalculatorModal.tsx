import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Snowflake, 
  Sun, 
  Users, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingCart 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface BtuCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const BtuCalculatorModal: React.FC<BtuCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [area, setArea] = useState<number>(18);
  const [ceilingHeight, setCeilingHeight] = useState<number>(3.0);
  const [roomType, setRoomType] = useState<'bedroom' | 'living' | 'cafe'>('bedroom');
  const [sunExposure, setSunExposure] = useState<'normal' | 'west_sunny'>('normal');
  const [peopleCount, setPeopleCount] = useState<number>(2);

  // Calculation Logic:
  // Standard: 600 BTU per m² with 3m ceiling
  // If ceiling > 3.2m: increase by 10%
  // If living room/kitchen: +10%
  // If cafe/office: +25%
  // If west sunny: +15%
  // If > 3 people: +500 BTU per additional person
  const baseBtu = area * 600;
  let multiplier = 1.0;
  if (ceilingHeight > 3.2) multiplier += 0.1;
  if (roomType === 'living') multiplier += 0.1;
  if (roomType === 'cafe') multiplier += 0.25;
  if (sunExposure === 'west_sunny') multiplier += 0.15;

  let calculatedBtu = Math.round(baseBtu * multiplier);
  if (peopleCount > 2) {
    calculatedBtu += (peopleCount - 2) * 500;
  }

  // Determine recommended HP
  let recommendedHp = '1.0 HP (9.000 BTU)';
  let hpScore = 1.0;
  let summaryAdvice = 'Phù hợp phòng ngủ nhỏ dưới 15m², làm lạnh dịu nhẹ và siêu tiết kiệm điện.';

  if (calculatedBtu > 21000) {
    recommendedHp = '2.5 HP (24.000 BTU)';
    hpScore = 2.5;
    summaryAdvice = 'Phù hợp phòng khách thông tầng rộng hoặc văn phòng công ty, làm mát nhanh diện rộng.';
  } else if (calculatedBtu > 15000) {
    recommendedHp = '2.0 HP (18.000 BTU)';
    hpScore = 2.0;
    summaryAdvice = 'Phù hợp phòng khách lớn hoặc phòng ngủ trên 20m² có cửa kính đón nắng.';
  } else if (calculatedBtu > 10500) {
    recommendedHp = '1.5 HP (12.000 BTU)';
    hpScore = 1.5;
    summaryAdvice = 'Phù hợp phòng diện tích 15m² - 20m², làm lạnh sâu và bền bỉ.';
  }

  // Filter matching air conditioners in inventory
  const airConditioners = PRODUCTS.filter((p) => p.category === 'may-lanh');

  const formatVND = (num: number) => num.toLocaleString('vi-VN') + '₫';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d9e2ff] text-[#004aae] text-xs font-bold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Tiện ích độc quyền Bình Lực</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#131b2e]">
              Công cụ tính công suất máy lạnh (BTU &amp; Ngựa)
            </h3>
            <p className="text-xs text-gray-500">
              Chọn chuẩn công suất giúp làm lạnh nhanh tức thì, tránh tình trạng máy chạy quá tải gây tốn điện hoặc làm lạnh không đủ sâu.
            </p>
          </div>

          {/* Form parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Area */}
            <div className="p-3.5 bg-gray-50 rounded-xl space-y-2 border border-gray-200">
              <div className="flex justify-between font-bold text-gray-700">
                <span>Diện tích sàn:</span>
                <span className="text-[#004aae] text-sm">{area} m²</span>
              </div>
              <input
                type="range"
                min={8}
                max={50}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[#004aae] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>8 m²</span>
                <span>20 m²</span>
                <span>35 m²</span>
                <span>50 m²</span>
              </div>
            </div>

            {/* Ceiling */}
            <div className="p-3.5 bg-gray-50 rounded-xl space-y-2 border border-gray-200">
              <div className="flex justify-between font-bold text-gray-700">
                <span>Độ cao trần nhà:</span>
                <span className="text-[#004aae] text-sm">{ceilingHeight} m</span>
              </div>
              <input
                type="range"
                min={2.4}
                max={4.5}
                step={0.1}
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(Number(e.target.value))}
                className="w-full accent-[#004aae] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>2.4m</span>
                <span>3.0m</span>
                <span>3.8m</span>
                <span>4.5m</span>
              </div>
            </div>

            {/* Room Type */}
            <div className="p-3.5 bg-gray-50 rounded-xl space-y-2 border border-gray-200">
              <label className="font-bold text-gray-700 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#004aae]" />
                <span>Không gian lắp đặt:</span>
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as any)}
                className="w-full p-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold outline-none"
              >
                <option value="bedroom">Phòng ngủ gia đình (Yên tĩnh)</option>
                <option value="living">Phòng khách / Bếp (Nhiều thiết bị)</option>
                <option value="cafe">Quán cà phê / Văn phòng / Cửa hàng</option>
              </select>
            </div>

            {/* Sun Exposure */}
            <div className="p-3.5 bg-gray-50 rounded-xl space-y-2 border border-gray-200">
              <label className="font-bold text-gray-700 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Mức độ ánh nắng chiếu rọi:</span>
              </label>
              <select
                value={sunExposure}
                onChange={(e) => setSunExposure(e.target.value as any)}
                className="w-full p-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold outline-none"
              >
                <option value="normal">Bình thường / Có rèm che / Hướng Nam mát</option>
                <option value="west_sunny">Hướng Tây nắng gắt / Mái tôn nóng</option>
              </select>
            </div>
          </div>

          {/* Results Box */}
          <div className="p-5 bg-gradient-to-br from-[#f2f3ff] to-[#d9e2ff] rounded-2xl border border-[#b0c6ff] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#004aae] uppercase tracking-wider">
                  Kết quả khuyến nghị
                </span>
                <h4 className="text-xl md:text-2xl font-black text-[#131b2e] flex items-center gap-2">
                  <Snowflake className="w-6 h-6 text-[#004aae] animate-spin" />
                  <span>{recommendedHp}</span>
                </h4>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-500 block">Nhu cầu nhiệt tính toán</span>
                <span className="text-base font-extrabold text-[#d14300]">
                  ~{calculatedBtu.toLocaleString()} BTU/h
                </span>
              </div>
            </div>

            <p className="text-xs text-[#424654] leading-relaxed border-t border-[#b0c6ff]/40 pt-2">
              💡 <strong>Lời khuyên kỹ thuật viên:</strong> {summaryAdvice}
            </p>
          </div>

          {/* Recommended Products matching this choice */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Mẫu điều hòa chính hãng Bình Lực khuyên dùng cho bạn:
            </h4>

            <div className="space-y-2">
              {airConditioners.map((ac) => (
                <div
                  key={ac.id}
                  className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-3 hover:border-[#004aae] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={ac.image}
                      alt={ac.name}
                      className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#004aae] uppercase block">
                        {ac.brand} • Inverter
                      </span>
                      <h5 className="font-bold text-xs text-[#131b2e] line-clamp-1">
                        {ac.name}
                      </h5>
                      <span className="text-xs font-extrabold text-[#004aae]">
                        Liên hệ báo giá
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectProduct(ac);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-[#f2f3ff] text-[#004aae] rounded-lg text-xs font-bold hover:bg-[#d9e2ff] transition-colors cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(ac);
                        onClose();
                      }}
                      className="p-1.5 bg-[#004aae] text-white rounded-lg hover:bg-[#0060df] transition-colors cursor-pointer"
                      title="Thêm danh sách báo giá"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
