"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Sun, Moon } from 'lucide-react';

export default function InvestmentTracker() {
  const [investments, setInvestments] = useState([]);
  const [inputMode, setInputMode] = useState('total'); // 'capital' or 'total'
  const [isLightMode, setIsLightMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    profitRate: '',
    totalAmount: ''
  });

  // Toggle light/dark mode
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // Convert Arabic numerals to English
  const convertArabicToEnglish = (str) => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let result = str;
    arabicNumerals.forEach((num, index) => {
      result = result.replace(new RegExp(num, 'g'), index.toString());
    });
    return result;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert Arabic numerals to English for number fields
    const convertedValue = ['capital', 'profitRate', 'totalAmount'].includes(name)
      ? convertArabicToEnglish(value)
      : value;
    setFormData(prev => ({
      ...prev,
      [name]: convertedValue
    }));
  };

  const addInvestment = () => {
    const rate = parseFloat(formData.profitRate);

    // Validate based on input mode
    if (!formData.name || !formData.profitRate || isNaN(rate)) return;

    let capital;

    if (inputMode === 'capital') {
      // Direct capital input mode
      if (!formData.capital) return;
      capital = parseFloat(formData.capital);
    } else {
      // Total amount mode - calculate capital from total and profit rate
      // Formula: capital = totalAmount / (1 + profitRate/100)
      if (!formData.totalAmount) return;
      const totalAmount = parseFloat(formData.totalAmount);
      capital = totalAmount / (1 + rate / 100);
    }

    if (isNaN(capital)) return;

    const newInvestment = {
      id: Date.now(),
      name: formData.name,
      capital: capital,
      profitRate: rate
    };

    setInvestments(prev => [...prev, newInvestment]);
    setFormData({ name: '', capital: '', profitRate: '', totalAmount: '' });
  };

  const removeInvestment = (id) => {
    setInvestments(prev => prev.filter(inv => inv.id !== id));
  };

  const switchInputMode = (mode) => {
    setInputMode(mode);
    // Clear capital/totalAmount when switching modes
    setFormData(prev => ({ ...prev, capital: '', totalAmount: '' }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addInvestment();
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ar-EG').format(num.toFixed(2));
  };

  const getInvestmentIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('ذهب') || lowerName.includes('gold')) return '🥇';
    if (lowerName.includes('فضة') || lowerName.includes('silver')) return '🪙';
    if (lowerName.includes('أسهم') || lowerName.includes('stock') || lowerName.includes('بورصة')) return '📈';
    if (lowerName.includes('عقار') || lowerName.includes('real estate') || lowerName.includes('شقة')) return '🏠';
    if (lowerName.includes('عملات') || lowerName.includes('crypto') || lowerName.includes('بيتكوين')) return '💰';
    if (lowerName.includes('سيارة') || lowerName.includes('car')) return '🚗';
    if (lowerName.includes('شهادة') || lowerName.includes('بنك')) return '🏦';
    return '💎';
  };

  // Empty state icon component
  const EmptyStateIcon = ({ isLightMode }) => {
    const strokeColor = isLightMode ? "#28755b" : "white";
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M28 49C30.5773 49 32.6667 46.9107 32.6667 44.3333C32.6667 41.756 30.5773 39.6667 28 39.6667C25.4227 39.6667 23.3333 41.756 23.3333 44.3333C23.3333 46.9107 25.4227 49 28 49Z" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 16.3333C30.5773 16.3333 32.6667 14.244 32.6667 11.6667C32.6667 9.08934 30.5773 7 28 7C25.4227 7 23.3333 9.08934 23.3333 11.6667C23.3333 14.244 25.4227 16.3333 28 16.3333Z" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M37.3333 32.6667C39.9107 32.6667 42 30.5773 42 28C42 25.4227 39.9107 23.3333 37.3333 23.3333C34.756 23.3333 32.6667 25.4227 32.6667 28C32.6667 30.5773 34.756 32.6667 37.3333 32.6667Z" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M46.6667 49C49.244 49 51.3333 46.9107 51.3333 44.3333C51.3333 41.756 49.244 39.6667 46.6667 39.6667C44.0893 39.6667 42 41.756 42 44.3333C42 46.9107 44.0893 49 46.6667 49Z" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.33332 49C11.9107 49 14 46.9107 14 44.3333C14 41.756 11.9107 39.6667 9.33332 39.6667C6.75599 39.6667 4.66666 41.756 4.66666 44.3333C4.66666 46.9107 6.75599 49 9.33332 49Z" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.6667 32.6667C21.244 32.6667 23.3333 30.5773 23.3333 28C23.3333 25.4227 21.244 23.3333 18.6667 23.3333C16.0893 23.3333 14 25.4227 14 28C14 30.5773 16.0893 32.6667 18.6667 32.6667Z" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  // Logo component
  const Logo = ({ isLightMode }) => (
    <svg width="144" height="64" viewBox="0 0 144 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="97%" y2="100%" gradientUnits="userSpaceOnUse">
          <stop offset="0.19%" stopColor={isLightMode ? "#28755b" : "white"} stopOpacity={isLightMode ? "0.5" : "0.3"}/>
          <stop offset="50.1%" stopColor={isLightMode ? "#28755b" : "white"} stopOpacity={isLightMode ? "1" : "0.8"}/>
          <stop offset="100%" stopColor={isLightMode ? "#28755b" : "white"} stopOpacity={isLightMode ? "0.5" : "0.3"}/>
        </linearGradient>
      </defs>
      <path d="M11.5983 19.8202C12.0165 19.4008 12.2611 19.4013 12.6778 19.8221L15.7576 22.9326C16.6048 23.7882 17.1009 23.7845 17.936 22.9169L20.6775 20.0684C21.4763 19.2384 21.4795 18.754 20.6921 17.9131L17.9354 14.9693C17.1019 14.0792 16.6003 14.0719 15.7425 14.9383L12.6858 18.0254C12.2634 18.452 12.0159 18.4505 11.5983 18.0193L8.60837 14.932C7.7729 14.0693 7.27788 14.0665 6.43311 14.92L3.59546 17.7871C2.77473 18.6163 2.76826 19.106 3.56583 19.9578L6.31213 22.8905C7.14286 23.7776 7.64295 23.7859 8.5011 22.9255L11.5983 19.8202Z" fill="url(#logoGradient)"/>
      <path d="M49.6249 8.08304C51.6135 10.8088 52.7948 19.4896 47.7113 19.4896C46.5132 19.4896 45.6304 18.8163 45.1575 17.9185C44.8422 19.5216 43.518 21.0926 41.5317 21.0926C37.5464 21.0926 37.8538 15.5869 39.2127 13.0307C39.2961 12.8737 39.5292 12.9852 39.4866 13.1481C39.4019 13.4718 39.3247 13.8166 39.3247 14.1353C39.3247 15.3536 40.176 16.0269 41.5317 16.0269C43.3062 16.0269 44.4044 14.714 44.7353 11.9647C44.7555 11.7969 44.9937 11.786 45.0356 11.9487C45.4413 13.5229 46.917 14.4559 48.6886 14.4559C49.9498 14.4559 50.9587 13.9749 50.9587 13.7185C50.9587 13.5085 50.0206 12.7374 48.48 11.5626C48.2302 11.3722 48.1864 11.2208 48.2938 10.9247L49.306 8.13486C49.3527 8.00608 49.5444 7.97272 49.6249 8.08304Z" fill="url(#logoGradient)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M102.705 34.8167C102.769 35.6234 102.45 36.5834 101.638 36.9127C100.482 37.3809 98.6224 37.778 96.1602 37.7994C93.393 37.7994 91.6215 36.5537 88.2552 32.5912L75.6843 17.7221C75.2242 17.1779 75.2727 16.8892 75.8926 16.5389C83.044 12.4979 89.8132 8.87423 91.0225 8.87423C91.4504 8.87423 91.6215 9.07669 91.6215 9.42376C91.6215 9.94289 91.3924 11.2879 91.0785 12.6787C91.0056 13.0017 91.4841 13.1649 91.6021 12.8476C92.8985 9.36102 95.1229 0.457584 89.1396 0.457584C86.4471 0.457584 74.917 6.68125 70.5269 9.93119C70.1712 10.1945 70.0066 10.4429 69.8738 10.8661L66.9607 20.1447C66.7076 20.951 66.7842 21.3877 67.3718 21.998C70.5637 25.3128 77.1007 30.7995 77.1007 34.8762C77.1007 38.6761 66.1106 40.9582 58.6837 40.7005C51.9678 40.4674 45.6652 37.1805 40.5638 32.9572C37.8887 30.7426 35.153 28.5612 31.6797 28.5612C21.6381 28.5612 21.6051 42.5809 22.3668 50.856C22.4877 52.1689 22.054 52.4392 21.1099 51.4818C15.5966 45.8907 13.1325 39.3779 14.2456 31.5116C14.3021 31.1128 13.7456 30.9566 13.5862 31.3182C10.8681 37.4825 7.18742 38.762 2.13447 39.0639C1.68463 39.0908 1.23419 39.1041 0.959851 39.5164C-0.193519 41.25 -0.363832 47.403 0.757757 49.1499C2.68809 52.1564 9.07898 46.567 9.99818 44.9318C10.2677 52.0089 13.9491 59.6281 19.3346 63.6678C20.0524 64.2063 20.4493 64.0878 20.9087 63.3296L25.1625 56.3105C25.744 55.351 25.7175 54.8835 25.2398 53.8717C23.2465 49.6494 21.5794 42.2052 25.1152 39.3805C29.4591 35.9101 34.2364 39.4681 37.9469 42.1212C44.1812 46.5788 50.8796 49.7952 58.6837 49.9403C68.4593 50.1221 77.0764 45.7331 77.693 35.3851C77.739 34.6142 77.9649 34.5122 78.4159 35.1592C82.3337 40.7802 86.8538 47.9227 94.2858 47.9227C98.3174 47.8706 101.355 46.0844 102.899 43.1337C103.262 42.4417 103.429 42.4535 103.762 43.1568C105.134 46.0554 108.193 47.6792 111.895 47.6337L111.893 47.6463L118.468 47.5721C121.429 47.5229 123.544 46.6153 125.075 43.7625C125.752 42.5013 126.149 42.2951 127.416 42.9916C131.35 45.1549 135.037 46.4152 137.125 46.4152C146.67 46.4152 146.166 21.1942 136.298 21.1942C132.133 21.1942 128.995 28.049 126.969 32.561C125.29 36.2254 124.236 37.3856 120.35 37.4486L113.783 37.5226L113.771 37.5103C109.292 37.5682 107.437 35.9774 107.323 33.114L106.161 0.202189C106.154 0.000415291 105.888 -0.0747305 105.777 0.0904062L101.167 6.98853C100.709 7.67341 100.583 8.15931 100.649 8.98209L102.705 34.8167ZM128.91 31.4453C127.875 32.2178 128.179 33.0411 129.244 33.5623C133.56 35.6735 139.145 37.7093 141.719 37.7093C142.517 37.7093 143.002 37.5069 143.002 36.8706C143.002 34.817 138.552 30.1893 133.103 30.1893C131.449 30.1893 130.051 30.5943 128.91 31.4453Z" fill="url(#logoGradient)"/>
      <path d="M41.3535 57.5972C41.7718 57.1779 42.0164 57.1784 42.4331 57.5992L45.5128 60.7096C46.36 61.5653 46.8562 61.5616 47.6912 60.694L50.4328 57.8454C51.2316 57.0155 51.2347 56.531 50.4473 55.6902L47.6907 52.7463C46.8572 51.8563 46.3556 51.8489 45.4977 52.7154L42.4411 55.8024C42.0187 56.229 41.7712 56.2276 41.3535 55.7963L38.3636 52.7091C37.5282 51.8464 37.0331 51.8436 36.1884 52.6971L33.3507 55.5641C32.53 56.3934 32.5235 56.8831 33.3211 57.7348L36.0674 60.6676C36.8981 61.5547 37.3982 61.563 38.2564 60.7025L41.3535 57.5972Z" fill="url(#logoGradient)"/>
      <path d="M127.538 56.5327C131.532 55.0333 135.905 53.7674 140.658 52.7351C140.941 52.6891 141.605 52.5689 141.605 52.9932C141.605 53.9567 140.846 56.6065 139.71 56.8276C135.142 57.8782 130.604 59.0509 126.249 60.7727C125.101 61.2511 125.037 60.7019 125.339 59.7034C125.671 58.6064 126.324 56.9545 127.538 56.5327Z" fill="url(#logoGradient)"/>
    </svg>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300 ${isLightMode ? 'bg-[#f5f5f5]' : 'bg-[#001a08]'}`}>
      {/* Main Container - Centered */}
      <div className="relative w-full max-w-6xl">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className={`absolute top-0 left-0 p-2 transition-colors ${
            isLightMode ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
          }`}
        >
          {isLightMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center mb-6">
            <Logo isLightMode={isLightMode} />
          </div>
          <p className={`text-lg md:text-xl leading-relaxed ${isLightMode ? 'text-black' : 'text-white'}`}>
            تابع أداءات استثماراتك المختلفة بشكل تراكمي
            <br />
            واحسب أرباحك مباشرة
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 mt-12 justify-center items-stretch">

          {/* Calculator Card - FIRST in DOM (TOP on mobile), lg:order-1 (RIGHT on desktop in RTL) */}
          <div
            className="w-full lg:w-[29.75rem] lg:order-1 rounded-[1.25rem] p-8 flex flex-col"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            {/* Card Title */}
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              حاسبة الاستثمار التراكمية
            </h2>

            {/* Segmented Control - Simple approach */}
            <div
              className="h-12 rounded-full mb-6 grid grid-cols-2 gap-1 p-1"
              style={{
                background: 'linear-gradient(96.28deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.016) 50%, rgba(0, 0, 0, 0.08) 100%)'
              }}
            >
              <button
                type="button"
                onClick={() => switchInputMode('capital')}
                className={`rounded-full text-base font-bold transition-all duration-300 cursor-pointer ${
                  inputMode === 'capital'
                    ? 'bg-white/80 text-black shadow-[0_0.25rem_0.625rem_0_rgba(0,0,0,0.12)]'
                    : 'bg-transparent text-black/60'
                }`}
              >
                الحساب برأس المال
              </button>
              <button
                type="button"
                onClick={() => switchInputMode('total')}
                className={`rounded-full text-base font-bold transition-all duration-300 cursor-pointer ${
                  inputMode === 'total'
                    ? 'bg-white/80 text-black shadow-[0_0.25rem_0.625rem_0_rgba(0,0,0,0.12)]'
                    : 'bg-transparent text-black/60'
                }`}
              >
                الحساب بالأرباح
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 flex-1 flex flex-col">
              {/* Investment Name */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-black text-right">
                  اسم الاستثمار
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="مثال: ذهب، أسهم، عقارات..."
                  className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[0.625rem] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right"
                  dir="rtl"
                />
              </div>

              {/* Two Column Inputs */}
              <div className="grid grid-cols-2 gap-3">
                {inputMode === 'capital' ? (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-black text-right">
                      رأس المال
                    </label>
                    <input
                      name="capital"
                      type="text"
                      inputMode="decimal"
                      value={formData.capital}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="10000"
                      className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[0.625rem] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      dir="rtl"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-black text-right">
                      الإجمالي بعد الربح
                    </label>
                    <input
                      name="totalAmount"
                      type="text"
                      inputMode="decimal"
                      value={formData.totalAmount}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="11500"
                      className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[0.625rem] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      dir="rtl"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-black text-right">
                    نسبة الربح %
                  </label>
                  <input
                    name="profitRate"
                    type="text"
                    inputMode="decimal"
                    value={formData.profitRate}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="15"
                    className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[0.625rem] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Spacer to push button to bottom */}
              <div className="flex-1" />

              {/* Submit Button */}
              <button
                onClick={addInvestment}
                className="w-full h-12 rounded-[0.625rem] text-white font-medium text-base transition-colors hover:opacity-90"
                style={{ backgroundColor: '#28755b' }}
              >
                + إضافة الاستثمار
              </button>
            </div>
          </div>

          {/* Investments List - SECOND in DOM (BOTTOM on mobile), lg:order-2 (LEFT on desktop in RTL) */}
          <div
            className={`w-full lg:w-[29.75rem] lg:order-2 rounded-[1.25rem] flex flex-col p-6 ${
              investments.length === 0
                ? 'items-center justify-center border-2 border-dashed'
                : 'items-stretch justify-start'
            }`}
            style={investments.length === 0 ? { borderColor: isLightMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)' } : {}}
          >
            {investments.length === 0 ? (
              <div className="text-center" style={{ opacity: 0.4 }}>
                <div className={`mb-6 flex justify-center ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <EmptyStateIcon isLightMode={isLightMode} />
                </div>
                <p className={`text-xl leading-relaxed ${isLightMode ? 'text-black' : 'text-white'}`}>
                  ابدأ بإضافة أول استثماراتك، ستبدأ الاستثمارات
                  <br />
                  بالظهور تباعًا فور إضافتها
                </p>
              </div>
            ) : (
              <div className="w-full space-y-3 overflow-y-auto max-h-[25rem]">
                {investments.map((investment) => {
                  const profit = investment.capital * investment.profitRate / 100;
                  return (
                    <div
                      key={investment.id}
                      className={`rounded-[0.625rem] p-4 flex items-center justify-between group transition-colors ${
                        isLightMode
                          ? 'bg-[#28755b]/10 hover:bg-[#28755b]/15'
                          : 'bg-white/10 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeInvestment(investment.id)}
                          className={`transition-colors p-1 ${
                            isLightMode ? 'text-black/40 hover:text-red-500' : 'text-white/40 hover:text-red-400'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="text-right flex flex-col gap-1">
                          <p className={`font-bold leading-normal ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`}>+{formatNumber(profit)}</p>
                          <p className={`text-sm leading-normal ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>{investment.profitRate}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right flex flex-col gap-1">
                          <h3 className={`font-medium leading-normal ${isLightMode ? 'text-black' : 'text-white'}`}>{investment.name}</h3>
                          <p className={`text-sm leading-normal ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                            رأس المال: {formatNumber(investment.capital)}
                          </p>
                        </div>
                        <span className="text-2xl">{getInvestmentIcon(investment.name)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
