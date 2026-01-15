"use client";

import React, { useState } from 'react';
import { Trash2, Sun, Zap } from 'lucide-react';

export default function InvestmentTracker() {
  const [investments, setInvestments] = useState([]);
  const [inputMode, setInputMode] = useState('total'); // 'capital' or 'total'
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    profitRate: '',
    totalAmount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    if (lowerName.includes('أسهم') || lowerName.includes('stock') || lowerName.includes('بورصة')) return '📈';
    if (lowerName.includes('عقار') || lowerName.includes('real estate') || lowerName.includes('شقة')) return '🏠';
    if (lowerName.includes('عملات') || lowerName.includes('crypto') || lowerName.includes('بيتكوين')) return '💰';
    if (lowerName.includes('سيارة') || lowerName.includes('car')) return '🚗';
    if (lowerName.includes('شهادة') || lowerName.includes('بنك')) return '🏦';
    return '💎';
  };

  // Empty state circles icon component
  const CirclesIcon = () => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <circle cx="36" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <circle cx="20" cy="36" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <circle cx="36" cy="36" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
    </svg>
  );

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#001a08' }}>
      {/* Header Section */}
      <div className="relative max-w-6xl mx-auto">
        {/* Theme Toggle */}
        <button className="absolute top-0 left-0 p-2 text-white/60 hover:text-white transition-colors">
          <Sun className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="text-center pt-8 mb-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Ping, sans-serif' }}>
            مِلكية
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            تابع أداءات استثماراتك المختلفة بشكل تراكمي
            <br />
            واحسب أرباحك مباشرة
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 mt-12 justify-center items-start">

          {/* Empty State / Investments List - Left Side */}
          <div
            className="w-full lg:w-[476px] min-h-[436px] rounded-[20px] border-2 border-dashed flex flex-col items-center justify-center p-6"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            {investments.length === 0 ? (
              <div className="text-center" style={{ opacity: 0.4 }}>
                <div className="mb-6 flex justify-center text-white">
                  <CirclesIcon />
                </div>
                <p className="text-white text-xl leading-relaxed">
                  ابدأ بإضافة أول استثماراتك، ستبدأ الاستثمارات
                  <br />
                  بالظهور تباعًا فور إضافتها
                </p>
              </div>
            ) : (
              <div className="w-full space-y-3 overflow-y-auto max-h-[400px]">
                {investments.map((investment) => {
                  const profit = investment.capital * investment.profitRate / 100;
                  const total = investment.capital + profit;
                  return (
                    <div
                      key={investment.id}
                      className="bg-white/10 rounded-[10px] p-4 flex items-center justify-between group hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getInvestmentIcon(investment.name)}</span>
                        <div>
                          <h3 className="text-white font-medium">{investment.name}</h3>
                          <p className="text-white/60 text-sm">
                            رأس المال: {formatNumber(investment.capital)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-left">
                          <p className="text-emerald-400 font-bold">+{formatNumber(profit)}</p>
                          <p className="text-white/60 text-sm">{investment.profitRate}%</p>
                        </div>
                        <button
                          onClick={() => removeInvestment(investment.id)}
                          className="text-white/40 hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Calculator Card - Right Side */}
          <div
            className="w-full lg:w-[476px] rounded-[20px] p-8"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            {/* Card Title */}
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              حاسبة الاستثمار التراكمية
            </h2>

            {/* Segmented Control */}
            <div
              className="h-12 p-1 rounded-full mb-6 flex"
              style={{
                background: 'linear-gradient(96.28deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.016) 50%, rgba(0, 0, 0, 0.08) 100%)'
              }}
            >
              <button
                onClick={() => switchInputMode('total')}
                className={`flex-1 rounded-full text-base font-bold transition-all duration-300 ${
                  inputMode === 'total'
                    ? 'bg-white/80 text-black shadow-[0px_4px_10px_0px_rgba(0,0,0,0.12)]'
                    : 'text-black/60'
                }`}
              >
                الحساب بالأرباح
              </button>
              <button
                onClick={() => switchInputMode('capital')}
                className={`flex-1 rounded-full text-base font-bold transition-all duration-300 ${
                  inputMode === 'capital'
                    ? 'bg-white/80 text-black shadow-[0px_4px_10px_0px_rgba(0,0,0,0.12)]'
                    : 'text-black/60'
                }`}
              >
                الحساب برأس المال
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
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
                  className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[10px] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right"
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
                      type="number"
                      value={formData.capital}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="10000"
                      className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[10px] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right"
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
                      type="number"
                      value={formData.totalAmount}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="11500"
                      className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[10px] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right"
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
                    type="number"
                    value={formData.profitRate}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="15"
                    className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[10px] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Helper text for total mode */}
              {inputMode === 'total' && (
                <div className="flex items-center justify-end gap-2 text-black text-sm">
                  <span>سيتم حساب رأس المال تلقائيًا</span>
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={addInvestment}
                className="w-full h-12 rounded-[10px] text-white font-medium text-base transition-colors hover:opacity-90"
                style={{ backgroundColor: '#28755b' }}
              >
                + إضافة الاستثمار
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
