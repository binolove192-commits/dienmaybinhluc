import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle, 
  Clock, 
  Truck, 
  Wrench, 
  UserCheck, 
  Phone, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { DEMO_ORDERS, STORE_INFO } from '../data/products';
import { OrderTrackingInfo } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders?: OrderTrackingInfo[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders = [],
}) => {
  if (!isOpen) return null;

  const sampleOrder = DEMO_ORDERS['BL-9842'];
  const [searchQuery, setSearchQuery] = useState('BL-9842');
  const [foundOrder, setFoundOrder] = useState<OrderTrackingInfo | null>(sampleOrder);
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const query = searchQuery.trim().toLowerCase();

    // Check recent orders first
    const matchedRecent = recentOrders.find(
      (o) =>
        o.orderId.toLowerCase() === query ||
        o.phone.includes(query) ||
        o.customerName.toLowerCase().includes(query)
    );

    if (matchedRecent) {
      setFoundOrder(matchedRecent);
      return;
    }

    // Check sample order
    if (
      sampleOrder.orderId.toLowerCase() === query ||
      sampleOrder.phone.includes(query) ||
      sampleOrder.customerName.toLowerCase().includes(query)
    ) {
      setFoundOrder(sampleOrder);
      return;
    }

    setFoundOrder(null);
    setSearchError('Không tìm thấy thông tin đơn hàng với mã hoặc số điện thoại này.');
  };

  const formatVND = (num: number) => num.toLocaleString('vi-VN') + '₫';

  const getStatusBadge = (status: OrderTrackingInfo['status']) => {
    switch (status) {
      case 'received':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">Đã tiếp nhận</span>;
      case 'preparing':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Xuất kho vật tư</span>;
      case 'shipping':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Đang di chuyển đến nhà bạn</span>;
      case 'installed':
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">Đã lắp đặt &amp; Bàn giao</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-[10px] font-bold">Đang xử lý</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95"
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
            <span className="text-xs font-bold text-[#004aae] uppercase tracking-wider">
              Hệ thống theo dõi đơn hàng
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#131b2e]">
              Tra cứu tiến độ giao hàng &amp; Lắp đặt
            </h3>
            <p className="text-xs text-gray-500">
              Nhập mã đơn hàng hoặc số điện thoại đặt hàng để xem tình trạng xử lý và liên hệ thợ lắp đặt.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập mã đơn (vd: BL-9842) hoặc SĐT đặt hàng..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#004aae]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#004aae] hover:bg-[#0060df] text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Tra cứu
            </button>
          </form>

          {/* Demo hint */}
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#f2f3ff] p-2.5 rounded-lg">
            <span className="font-semibold text-[#004aae]">Đơn hàng mẫu:</span>
            <button
              onClick={() => {
                setSearchQuery('BL-9842');
                setFoundOrder(sampleOrder);
                setSearchError('');
              }}
              className="underline text-[#004aae] font-bold hover:text-[#0060df] cursor-pointer"
            >
              BL-9842 (Khách: Nguyễn Văn Thành - Q. Hải Châu)
            </button>
          </div>

          {searchError && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{searchError}</span>
            </div>
          )}

          {foundOrder && (
            <div className="space-y-6 pt-2">
              {/* Order Meta Header */}
              <div className="p-4 bg-[#f2f3ff] rounded-2xl border border-[#d9e2ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#004aae]">
                      Đơn hàng #{foundOrder.orderId}
                    </span>
                    {getStatusBadge(foundOrder.status)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Ngày tạo: {foundOrder.createdAt} • Khách hàng: {foundOrder.customerName} ({foundOrder.phone})
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-gray-500 block">Hình thức thanh toán</span>
                  <span className="text-sm font-extrabold text-[#004aae]">
                    Báo giá trọn gói
                  </span>
                </div>
              </div>

              {/* Progress Timeline from foundOrder.steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Quy trình xử lý &amp; Lắp đặt
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {foundOrder.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        step.done
                          ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                          : 'border-gray-200 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${step.done ? 'text-emerald-600' : 'text-gray-300'}`} />
                          <span>{step.title}</span>
                        </div>
                        <span className="text-[10px] font-normal text-gray-500">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 pl-6 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technician In Charge */}
              {foundOrder.technician && (
                <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#004aae] text-white flex items-center justify-center font-bold text-lg">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-semibold uppercase">
                        Kỹ thuật viên phụ trách lắp đặt
                      </span>
                      <h5 className="font-extrabold text-sm text-[#131b2e]">
                        {foundOrder.technician.name}
                      </h5>
                      <p className="text-xs text-emerald-600 font-semibold">
                        Kinh nghiệm 8+ năm lắp đặt điều hòa, điện máy dân dụng
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${foundOrder.technician.phone.replace(/[^0-9]/g, '')}`}
                    className="px-4 py-2 bg-[#d14300] hover:bg-[#a73400] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Gọi kỹ thuật</span>
                  </a>
                </div>
              )}

              {/* Delivery Address & Products */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                  <MapPin className="w-4 h-4 text-[#004aae] shrink-0 mt-0.5" />
                  <span><strong>Địa chỉ nhận hàng:</strong> {foundOrder.address}</span>
                </div>

                <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden text-xs">
                  {foundOrder.items.map((item, i) => (
                    <div key={i} className="p-3 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-11 h-11 object-contain bg-gray-50 rounded-lg p-1"
                        />
                        <div>
                          <p className="font-bold text-[#131b2e]">{item.productName}</p>
                          <span className="text-gray-400 text-[11px]">
                            Số lượng: {item.quantity} • Bao trọn gói công lắp
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-[#004aae] text-xs">
                        Báo giá trực tiếp
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 text-center text-xs text-gray-400">
            Cần hỗ trợ gấp? Gọi ngay hotline <strong>{STORE_INFO.hotline}</strong> (6h45 - 21h00).
          </div>
        </div>
      </div>
    </div>
  );
};
