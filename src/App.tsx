import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { ProductGridSection } from './components/ProductGridSection';
import { ServicesSection } from './components/ServicesSection';
import { BrandPartnersSection } from './components/BrandPartnersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ConsultationCtaSection } from './components/ConsultationCtaSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { BtuCalculatorModal } from './components/BtuCalculatorModal';
import { CallbackModal } from './components/CallbackModal';
import { WarrantyModal } from './components/WarrantyModal';
import { ContactModal } from './components/ContactModal';

import { PRODUCTS, VOUCHERS, STORE_INFO } from './data/products';
import { Product, ProductCategory, CartItem, PromotionVoucher, OrderTrackingInfo } from './types';
import { Phone, ArrowUp, ShoppingCart, CheckCircle2 } from 'lucide-react';

export default function App() {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Pre-populate with Daikin Inverter to let user explore cart right away
      quantity: 1,
      includeInstallation: true,
    },
  ]);
  const [appliedVoucher, setAppliedVoucher] = useState<PromotionVoucher | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('trang-chu');

  // Modals state
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isBtuCalcOpen, setIsBtuCalcOpen] = useState(false);
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Orders state
  const [recentOrders, setRecentOrders] = useState<OrderTrackingInfo[]>([]);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, includeInstallation = true) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, includeInstallation }
            : item
        );
      }
      return [...prev, { product, quantity, includeInstallation }];
    });
    showToast(`Đã thêm "${product.name}" vào danh sách báo giá!`);
  };

  const handleBuyNow = (product: Product, quantity = 1, includeInstallation = true) => {
    handleAddToCart(product, quantity, includeInstallation);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã xóa sản phẩm khỏi danh sách báo giá.');
  };

  const handleApplyVoucherCode = (code: string) => {
    const found = VOUCHERS.find(
      (v) => v.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (found) {
      setAppliedVoucher(found);
      showToast(`Áp dụng thành công mã "${found.code}" - ${found.badge}!`);
      return true;
    }
    return false;
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    showToast('Đã gỡ mã ưu đãi.');
  };

  const handleOrderPlaced = (orderId: string, orderData: any) => {
    setRecentOrders((prev) => [orderData, ...prev]);
    setCartItems([]);
    setAppliedVoucher(null);
    showToast(`Gửi yêu cầu báo giá thành công! Mã yêu cầu: ${orderId}`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#131b2e] font-sans flex flex-col relative selection:bg-[#d9e2ff] selection:text-[#004aae]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenCallback={() => setIsCallbackOpen(true)}
        onOpenBtuCalc={() => setIsBtuCalcOpen(true)}
        onOpenWarranty={() => setIsWarrantyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content Area */}
      <main className="flex-1 space-y-6 sm:space-y-8">
        {/* 1. Hero Showcase */}
        <HeroSection
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('san-pham-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenConsultation={() => setIsCallbackOpen(true)}
        />

        {/* 2. Top 10 Product Categories */}
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3. Featured Products Grid (8 Items) */}
        <ProductGridSection
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={(p) => handleAddToCart(p, 1, true)}
          onBuyNow={(p) => handleBuyNow(p, 1, true)}
          onViewProductDetail={(p) => setSelectedProductDetail(p)}
          searchQuery={searchQuery}
        />

        {/* 4. Core Value Propositions & Services (4 Pillars) */}
        <ServicesSection />

        {/* 6. Strategic Brand Partners (Samsung, LG, Daikin, Panasonic...) */}
        <BrandPartnersSection
          onSelectBrand={(brandName) => {
            setSearchQuery(brandName);
          }}
        />

        {/* 7. Real Customer Testimonials */}
        <TestimonialsSection />

        {/* 8. Air Conditioner Capacity & General Consultation CTA */}
        <ConsultationCtaSection
          onOpenCallback={() => setIsCallbackOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenWarranty={() => setIsWarrantyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenBtuCalc={() => setIsBtuCalcOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Floating Hotline Button */}
        <a
          href={`tel:${STORE_INFO.hotline.replace(/[^0-9]/g, '')}`}
          className="pointer-events-auto p-3 bg-[#d14300] hover:bg-[#a73400] text-white rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105"
          title="Gọi ngay hotline 0905.186.386"
        >
          <Phone className="w-5 h-5 animate-bounce" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1">
            {STORE_INFO.hotline}
          </span>
        </a>

        {/* Floating Quick Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="pointer-events-auto p-3 bg-[#004aae] hover:bg-[#0060df] text-white rounded-full shadow-2xl flex items-center justify-center relative transition-transform hover:scale-105 cursor-pointer"
          title="Xem danh sách báo giá"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#d14300] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-xs">
              {totalCartCount}
            </span>
          )}
        </button>

        {/* Scroll To Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="pointer-events-auto p-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg border border-gray-200 transition-colors cursor-pointer"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={(p, qty, install) => handleAddToCart(p, qty, install)}
        onBuyNow={(p, qty, install) => handleBuyNow(p, qty, install)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        appliedVoucher={appliedVoucher}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onApplyVoucher={handleApplyVoucherCode}
        onRemoveVoucher={handleRemoveVoucher}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        recentOrders={recentOrders}
      />

      <BtuCalculatorModal
        isOpen={isBtuCalcOpen}
        onClose={() => setIsBtuCalcOpen(false)}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
        onAddToCart={(p) => handleAddToCart(p, 1, true)}
      />

      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />

      <WarrantyModal
        isOpen={isWarrantyOpen}
        onClose={() => setIsWarrantyOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
