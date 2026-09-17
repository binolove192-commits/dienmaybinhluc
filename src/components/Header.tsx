import React, { useState } from 'react';
import { 
  Phone, 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  ClipboardList, 
  ChevronDown, 
  Headphones, 
  X,
  Calculator,
  ShieldCheck,
  MapPin,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { STORE_INFO, CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenCallback: () => void;
  onOpenBtuCalc: () => void;
  onOpenWarranty: () => void;
  onOpenContact: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracking,
  onOpenCallback,
  onOpenBtuCalc,
  onOpenWarranty,
  onOpenContact,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  activeNav,
  setActiveNav,
}) => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleNavClick = (navKey: string) => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);
    if (navKey === 'dich-vu-lap-dat') {
      onOpenBtuCalc();
    } else if (navKey === 'chinh-sach-bao-hanh') {
      onOpenWarranty();
    } else if (navKey === 'lien-he-va-cua-hang') {
      onOpenContact();
    } else if (navKey === 'thuong-hieu') {
      const el = document.getElementById('thuong-hieu-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (navKey === 'san-pham') {
      const el = document.getElementById('san-pham-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (navKey === 'trang-chu') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      {/* 1. Top Mini Bar */}
      <div className="bg-[#f2f3ff] px-4 sm:px-6 lg:px-8 border-b border-[#c2c6d7]/30 text-xs text-[#424654] hidden md:block">
        <div className="max-w-[1280px] mx-auto h-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>
              Hotline hỗ trợ tư vấn &amp; đặt hàng:{' '}
              <a href={`tel:${STORE_INFO.hotline.replace(/[^0-9]/g, '')}`} className="font-semibold text-[#004aae] hover:underline">
                {STORE_INFO.hotlineFormatted}
              </a>
            </span>
            <span className="text-[#c2c6d7]">|</span>
            <span>{STORE_INFO.workingHours}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#004aae]" />
              {STORE_INFO.address}
            </span>
            <span className="text-[#c2c6d7]">|</span>
            <button
              onClick={onOpenTracking}
              className="hover:text-[#004aae] transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              Tra cứu đơn hàng
            </button>
            <span className="text-[#c2c6d7]">|</span>
            <button
              onClick={onOpenCallback}
              className="text-[#004aae] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Yêu cầu gọi lại báo giá
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Middle Header */}
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('trang-chu')}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          <img
            src={STORE_INFO.logoUrl}
            alt="Binh Luc Electronics Logo"
            className="h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-base md:text-lg text-[#004aae] tracking-tight leading-tight uppercase group-hover:text-[#0060df] transition-colors">
              {STORE_INFO.name}
            </span>
            <span className="text-[11px] text-[#424654] uppercase tracking-wider font-medium">
              {STORE_INFO.slogan}
            </span>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="flex-1 max-w-xl mx-2 hidden md:flex flex-col gap-1">
          <div className="flex items-center bg-[#f2f3ff] rounded-lg p-1 border border-[#c2c6d7]/40 focus-within:border-[#004aae] focus-within:ring-1 focus-within:ring-[#004aae] transition-all">
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value as ProductCategory)}
              aria-label="Lọc theo danh mục"
              className="bg-transparent text-xs text-[#424654] font-medium px-2 outline-none cursor-pointer border-r border-[#c2c6d7]/40 py-1"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="may-lanh">Máy lạnh / Điều hòa</option>
              <option value="tu-lanh">Tủ lạnh</option>
              <option value="tivi">Tivi / Âm thanh</option>
              <option value="may-giat">Máy giặt / Sấy</option>
              <option value="may-loc-khi">Máy lọc không khí</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Bạn muốn tìm sản phẩm gì? (Daikin, Tivi Samsung, Tủ lạnh Aqua...)"
              className="w-full bg-transparent px-3 text-sm text-[#131b2e] placeholder:text-gray-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById('san-pham-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#004aae] hover:bg-[#0060df] text-white px-3.5 py-1.5 rounded-md flex items-center justify-center transition-colors shrink-0 shadow-sm"
              type="button"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
          {/* Quick Search Suggestions */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#424654] overflow-hidden whitespace-nowrap">
            <span className="text-gray-400 font-medium">Gợi ý:</span>
            {['Daikin Inverter', 'Tivi 55 inch', 'Tủ lạnh Aqua', 'Máy giặt LG'].map((keyword) => (
              <button
                key={keyword}
                onClick={() => onSearchChange(keyword)}
                className="hover:text-[#004aae] hover:underline transition-colors text-left"
              >
                {keyword},
              </button>
            ))}
          </div>
        </div>

        {/* Right Actions: Hotline, Order Lookup, Cart, Account */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Hotline button */}
          <div 
            onClick={onOpenCallback}
            className="hidden xl:flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[#f2f3ff] transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#d9e2ff] flex items-center justify-center text-[#004aae]">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#424654]">Tư vấn mua hàng</span>
              <span className="text-xs font-bold text-[#004aae]">{STORE_INFO.hotline}</span>
            </div>
          </div>

          {/* BTU Calculator Tool button */}
          <button
            onClick={onOpenBtuCalc}
            title="Tính công suất máy lạnh theo m²"
            className="hidden lg:flex flex-col items-center text-[#424654] hover:text-[#004aae] transition-colors p-1"
          >
            <Calculator className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 font-medium">Tính BTU</span>
          </button>

          {/* Tra cứu đơn hàng */}
          <button
            onClick={onOpenTracking}
            className="hidden sm:flex flex-col items-center text-[#424654] hover:text-[#004aae] transition-colors p-1"
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 font-medium">Tra cứu</span>
          </button>

          {/* Giỏ hàng */}
          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center text-[#424654] hover:text-[#004aae] transition-colors p-1.5 rounded-lg hover:bg-[#f2f3ff]"
            aria-label="Xem giỏ hàng"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#d14300] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5 font-medium hidden xs:inline">Báo giá</span>
          </button>

          {/* Tài khoản */}
          <div className="relative">
            <button
              onClick={() => setShowAccountModal(!showAccountModal)}
              className="flex items-center gap-2 pl-1 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-[#004aae] flex items-center justify-center text-white shadow-sm">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#131b2e]">Tài khoản</span>
                <span className="text-[11px] text-[#424654]">Bình Lực Member</span>
              </div>
            </button>

            {/* Dropdown popup for user */}
            {showAccountModal && (
              <div className="absolute right-0 top-11 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in">
                <div className="border-b border-gray-100 pb-3 mb-3">
                  <p className="font-bold text-sm text-[#131b2e]">Chào mừng quý khách!</p>
                  <p className="text-xs text-gray-500">Đăng nhập để nhận ưu đãi thành viên và bảo hành điện tử.</p>
                </div>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      setShowAccountModal(false);
                      onOpenTracking();
                    }}
                    className="w-full py-2 px-3 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#004aae] font-semibold text-xs rounded-lg flex items-center justify-between transition-colors"
                  >
                    <span>Lịch sử &amp; Tra cứu đơn hàng</span>
                    <ClipboardList className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      setShowAccountModal(false);
                      onOpenWarranty();
                    }}
                    className="w-full py-2 px-3 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#004aae] font-semibold text-xs rounded-lg flex items-center justify-between transition-colors"
                  >
                    <span>Kích hoạt bảo hành điện tử</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      setShowAccountModal(false);
                      onOpenCallback();
                    }}
                    className="w-full py-2 px-3 bg-[#004aae] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1 hover:bg-[#0060df] transition-colors"
                  >
                    <span>Tư vấn trực tiếp với kỹ sư</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Input for Mobile */}
      <div className="md:hidden px-4 pb-2">
        <div className="flex items-center bg-[#f2f3ff] rounded-lg p-1 border border-[#c2c6d7]/40">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm máy lạnh, tivi, tủ lạnh..."
            className="w-full bg-transparent px-3 text-sm text-[#131b2e] outline-none"
          />
          <button
            onClick={() => {
              const el = document.getElementById('san-pham-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#004aae] text-white p-1.5 rounded-md"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Navigation Bar & Category Mega Menu */}
      <div className="bg-[#e2e7ff]/60 border-t border-[#c2c6d7]/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Category Dropdown Toggle Button */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="bg-[#004aae] hover:bg-[#0060df] text-white text-xs font-bold flex items-center gap-2 py-2.5 px-4 rounded-t-lg transition-colors cursor-pointer shadow-sm"
              >
                <Menu className="w-4 h-4" />
                <span>DANH MỤC SẢN PHẨM</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Dropdown Menu */}
              {showCategoryMenu && (
                <div 
                  className="absolute left-0 top-full w-72 bg-white rounded-b-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setShowCategoryMenu(false)}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id as ProductCategory);
                        setShowCategoryMenu(false);
                        const el = document.getElementById('san-pham-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[#f2f3ff] transition-colors group"
                    >
                      <span className="text-xs font-semibold text-[#131b2e] group-hover:text-[#004aae]">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-[#d9e2ff] group-hover:text-[#004aae]">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 h-10 text-xs font-medium text-[#424654]">
              <button
                onClick={() => handleNavClick('trang-chu')}
                className={`py-2 transition-colors cursor-pointer ${
                  activeNav === 'trang-chu'
                    ? 'text-[#004aae] font-bold border-b-2 border-[#004aae]'
                    : 'hover:text-[#004aae]'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => handleNavClick('san-pham')}
                className={`py-2 transition-colors cursor-pointer ${
                  activeNav === 'san-pham'
                    ? 'text-[#004aae] font-bold border-b-2 border-[#004aae]'
                    : 'hover:text-[#004aae]'
                }`}
              >
                Sản phẩm
              </button>
              <button
                onClick={() => handleNavClick('thuong-hieu')}
                className={`py-2 transition-colors cursor-pointer ${
                  activeNav === 'thuong-hieu'
                    ? 'text-[#004aae] font-bold border-b-2 border-[#004aae]'
                    : 'hover:text-[#004aae]'
                }`}
              >
                Thương hiệu đối tác
              </button>
              <button
                onClick={() => handleNavClick('dich-vu-lap-dat')}
                className="py-2 hover:text-[#004aae] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Dịch vụ lắp đặt</span>
                <span className="bg-[#004aae] text-white text-[9px] px-1.5 py-0.2 rounded font-bold">BTU Calc</span>
              </button>
              <button
                onClick={() => handleNavClick('chinh-sach-bao-hanh')}
                className="py-2 hover:text-[#004aae] transition-colors cursor-pointer"
              >
                Chính sách bảo hành
              </button>
              <button
                onClick={() => handleNavClick('lien-he-va-cua-hang')}
                className="py-2 hover:text-[#004aae] transition-colors cursor-pointer"
              >
                Liên hệ &amp; Cửa hàng
              </button>
            </nav>
          </div>

          {/* Right Highlight Notice */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => {
                const el = document.getElementById('san-pham-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#004aae] hover:text-[#0060df] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/70 shadow-xs cursor-pointer"
            >
              <span>⚡ Tổng kho phân phối chính hãng - Báo giá trực tiếp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-black/50 z-50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-4 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="font-bold text-sm text-[#004aae]">ĐIỆN MÁY BÌNH LỰC</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Điều hướng</p>
                {[
                  { key: 'trang-chu', label: 'Trang chủ' },
                  { key: 'san-pham', label: 'Sản phẩm nổi bật' },
                  { key: 'thuong-hieu', label: 'Thương hiệu đối tác' },
                  { key: 'dich-vu-lap-dat', label: 'Dịch vụ lắp đặt & Tính BTU' },
                  { key: 'chinh-sach-bao-hanh', label: 'Chính sách bảo hành' },
                  { key: 'lien-he-va-cua-hang', label: 'Liên hệ & Cửa hàng' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      activeNav === item.key ? 'bg-[#004aae] text-white' : 'text-[#131b2e] hover:bg-[#f2f3ff]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-2 space-y-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracking();
                  }}
                  className="w-full py-2.5 px-3 bg-[#f2f3ff] text-[#004aae] font-semibold text-xs rounded-lg flex items-center gap-2"
                >
                  <ClipboardList className="w-4 h-4" />
                  Tra cứu đơn hàng
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBtuCalc();
                  }}
                  className="w-full py-2.5 px-3 bg-[#f2f3ff] text-[#004aae] font-semibold text-xs rounded-lg flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Công cụ tính công suất BTU
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCallback();
                  }}
                  className="w-full py-2.5 px-3 bg-[#d14300] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Yêu cầu tư vấn 0905.186.386
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
              <p>Hotline: 0905.186.386</p>
              <p>Giờ làm việc: 6h45 - 21h00</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
