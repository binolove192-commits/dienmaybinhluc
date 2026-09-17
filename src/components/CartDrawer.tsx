import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  CheckCircle2 
} from 'lucide-react';
import { CartItem, PromotionVoucher } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedVoucher: PromotionVoucher | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onApplyVoucher: (code: string) => boolean;
  onRemoveVoucher: () => void;
  onOrderPlaced: (orderId: string, orderData: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  appliedVoucher,
  onUpdateQuantity,
  onRemoveItem,
  onApplyVoucher,
  onRemoveVoucher,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay' | 'banking'>('cod');
  const [customerNotes, setCustomerNotes] = useState('');
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + '₫';
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.code === 'BINHLUC2500') {
      discountAmount = 2500000;
    } else if (appliedVoucher.code === 'COMBO10') {
      discountAmount = Math.round(subtotal * 0.1);
    } else if (appliedVoucher.code === 'GIFT1200') {
      discountAmount = 1200000;
    } else if (appliedVoucher.code === 'LAPDAT0DONG') {
      discountAmount = 450000;
    } else {
      discountAmount = Math.min(subtotal, 500000);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.');
      return;
    }

    const generatedId = 'BL-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      orderId: generatedId,
      customerName,
      phone: customerPhone,
      address: customerAddress,
      createdAt: 'Hôm nay ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      status: 'received' as const,
      totalAmount: finalTotal,
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Thanh toán tiền mặt khi nhận hàng (COD)'
          : paymentMethod === 'vnpay'
          ? 'Quét mã VNPAY-QR'
          : 'Chuyển khoản qua ngân hàng',
      notes: customerNotes,
      technician: {
        name: 'Nguyễn Văn Hùng (Kỹ thuật trưởng)',
        phone: '0905.186.386',
      },
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image,
      })),
      steps: [
        {
          statusKey: 'received',
          title: 'Đã tiếp nhận đơn hàng',
          description: 'Hệ thống đã chuyển đơn tới bộ phận kho & kỹ thuật viên',
          time: 'Vừa xong',
          done: true,
        },
        {
          statusKey: 'preparing',
          title: 'Chuẩn bị thiết bị & vật tư',
          description: 'Kiểm tra máy mới nguyên đai, chuẩn bị ống đồng & đồ nghề',
          time: 'Đang xử lý',
          done: false,
        },
        {
          statusKey: 'shipping',
          title: 'Kỹ thuật viên xuất phát',
          description: 'Giao hàng và lắp đặt tận nhà tại Đà Nẵng / Quảng Nam',
          time: 'Dự kiến 30-45 phút',
          done: false,
        },
        {
          statusKey: 'installed',
          title: 'Nghiệm thu & Kích hoạt bảo hành',
          description: 'Chạy thử máy lạnh, hướng dẫn sử dụng và kích hoạt SMS bảo hành',
          time: 'Hoàn tất bàn giao',
          done: false,
        },
      ],
    };

    setOrderSuccessId(generatedId);
    onOrderPlaced(generatedId, newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#f2f3ff]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#004aae]" />
            <h3 className="font-extrabold text-base text-[#131b2e]">
              Danh sách yêu cầu báo giá ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSuccessId ? (
          /* Success Screen */
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-[#131b2e]">
              Gửi yêu cầu báo giá thành công!
            </h4>
            <p className="text-xs text-gray-600">
              Cảm ơn quý khách <strong>{customerName}</strong>. Mã yêu cầu báo giá của bạn là:
            </p>
            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#d9e2ff] w-full">
              <span className="text-lg font-black text-[#004aae] tracking-wider">
                {orderSuccessId}
              </span>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Kỹ thuật viên sẽ liên hệ số {customerPhone} trong vòng 10 phút để báo giá trọn gói &amp; hẹn lịch khảo sát.
              </p>
            </div>
            <button
              onClick={() => {
                setOrderSuccessId(null);
                setIsCheckingOut(false);
                onClose();
              }}
              className="w-full py-3 bg-[#004aae] text-white rounded-xl font-bold text-sm hover:bg-[#0060df] transition-colors cursor-pointer"
            >
              Tiếp tục xem sản phẩm
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#f2f3ff] text-gray-400 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-[#131b2e]">
              Giỏ hàng của bạn đang trống
            </p>
            <p className="text-xs text-gray-500 max-w-xs">
              Hãy chọn cho gia đình các sản phẩm điện lạnh, tivi hoặc máy giặt chính hãng với giá tốt nhất hôm nay.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#004aae] text-white rounded-xl font-bold text-xs hover:bg-[#0060df] transition-colors"
            >
              Xem sản phẩm khuyến mãi
            </button>
          </div>
        ) : (
          /* Content list */
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!isCheckingOut ? (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-xs relative group"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain bg-[#f2f3ff] rounded-lg p-1.5 shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold text-[#004aae] uppercase">
                              {item.product.brand}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-gray-400 hover:text-red-500 p-0.5"
                              title="Xóa khỏi giỏ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <h4 className="text-xs font-bold text-[#131b2e] line-clamp-1">
                            {item.product.name}
                          </h4>
                          {item.includeInstallation && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5">
                              <Wrench className="w-3 h-3" />
                              Kèm gói lắp đặt chuẩn
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-bold text-[#004aae]">
                            Liên hệ báo giá
                          </span>

                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Info */}
                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#004aae]" />
                    <span>Miễn phí giao hàng &amp; cắm thử máy tại TP. Đà Nẵng &amp; Quảng Nam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cam kết bảo hành chính hãng 100% kèm hóa đơn đỏ</span>
                  </div>
                </div>
              </>
            ) : (
              /* Checkout Form */
              <form id="checkout-form" onSubmit={handleCreateOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h4 className="font-bold text-sm text-[#131b2e]">
                    Thông tin giao hàng &amp; lắp đặt
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#004aae] hover:underline"
                  >
                    Xem lại giỏ hàng
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Họ và tên người nhận *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#004aae]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Số điện thoại nhận hàng *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0905.xxx.xxx"
                      className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#004aae]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Địa chỉ cụ thể (Số nhà, đường, phường/xã, quận/huyện) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Ví dụ: 120 Điện Biên Phủ, Thanh Khê, Đà Nẵng"
                      className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#004aae]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Phương thức thanh toán
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-[#004aae]"
                        />
                        <span>Thanh toán tiền mặt khi kiểm tra và nhận hàng (COD)</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'vnpay'}
                          onChange={() => setPaymentMethod('vnpay')}
                          className="text-[#004aae]"
                        />
                        <span>Quét mã VNPAY-QR (Nhận thêm chiết khấu theo mã)</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'banking'}
                          onChange={() => setPaymentMethod('banking')}
                          className="text-[#004aae]"
                        />
                        <span>Chuyển khoản qua ngân hàng (Vietcombank / MBBank)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Ghi chú thêm cho thợ lắp đặt
                    </label>
                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Ví dụ: Lắp đặt vào chiều thứ Bảy, nhà có thang sẵn..."
                      className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#004aae]"
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Bottom Total & Action */}
        {!orderSuccessId && items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Đơn giá thiết bị:</span>
                <span className="font-bold text-[#004aae]">Báo giá theo kho &amp; số lượng</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Vận chuyển Đà Nẵng &amp; Quảng Nam:</span>
                <span className="font-semibold text-emerald-600">Miễn phí 100%</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Khảo sát vị trí lắp đặt:</span>
                <span className="font-semibold text-emerald-600">Miễn phí tận nơi</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#131b2e] pt-2 border-t border-gray-200">
                <span>Tổng chi phí:</span>
                <span className="text-[#d14300] text-sm font-bold">Kỹ sư báo giá trực tiếp</span>
              </div>
            </div>

            {!isCheckingOut ? (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-[#d14300] hover:bg-[#a73400] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Gửi yêu cầu báo giá &amp; Lắp đặt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 bg-[#004aae] hover:bg-[#0060df] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Xác nhận gửi yêu cầu báo giá</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
