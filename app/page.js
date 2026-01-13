"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, TrendingUp, Wallet, PiggyBank, Sparkles } from 'lucide-react';

export default function InvestmentTracker() {
  const [investments, setInvestments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    profitRate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addInvestment = () => {
    if (!formData.name || !formData.capital || !formData.profitRate) return;
    
    const newInvestment = {
      id: Date.now(),
      name: formData.name,
      capital: parseFloat(formData.capital),
      profitRate: parseFloat(formData.profitRate)
    };
    
    setInvestments(prev => [...prev, newInvestment]);
    setFormData({ name: '', capital: '', profitRate: '' });
  };

  const removeInvestment = (id) => {
    setInvestments(prev => prev.filter(inv => inv.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addInvestment();
    }
  };

  const totalCapital = investments.reduce((sum, inv) => sum + inv.capital, 0);
  const totalProfit = investments.reduce((sum, inv) => sum + (inv.capital * inv.profitRate / 100), 0);
  const overallProfitRate = totalCapital > 0 ? (totalProfit / totalCapital) * 100 : 0;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4 md:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-l from-amber-200 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
              مُستثمر
            </h1>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-slate-400 text-lg">تابع استثماراتك واحسب أرباحك بسهولة</p>
        </div>

        {/* Add Investment Form */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-emerald-400 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              إضافة استثمار جديد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">اسم الاستثمار</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="مثال: ذهب، أسهم، عقارات"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capital" className="text-slate-300">رأس المال</Label>
                <Input
                  id="capital"
                  name="capital"
                  type="number"
                  value={formData.capital}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="10000"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profitRate" className="text-slate-300">نسبة الربح (%)</Label>
                <Input
                  id="profitRate"
                  name="profitRate"
                  type="number"
                  value={formData.profitRate}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="15"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>
            <Button 
              onClick={addInvestment}
              className="w-full mt-4 bg-gradient-to-l from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-6 text-lg transition-all duration-300 shadow-lg shadow-emerald-500/25"
            >
              <Plus className="w-5 h-5 ml-2" />
              إضافة الاستثمار
            </Button>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm mb-1">إجمالي رأس المال</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(totalCapital)}</p>
                </div>
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Wallet className="w-7 h-7 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-emerald-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-300 text-sm mb-1">إجمالي الأرباح</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(totalProfit)}</p>
                </div>
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <PiggyBank className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 border-amber-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-300 text-sm mb-1">نسبة الربح الإجمالية</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(overallProfitRate)}%</p>
                </div>
                <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investments List */}
        {investments.length > 0 && (
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200">قائمة الاستثمارات ({investments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {investments.map((investment, index) => {
                  const profit = investment.capital * investment.profitRate / 100;
                  return (
                    <div 
                      key={investment.id}
                      className="group relative bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 hover:border-emerald-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">{getInvestmentIcon(investment.name)}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{investment.name}</h3>
                            <p className="text-slate-400 text-sm">
                              رأس المال: {formatNumber(investment.capital)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-left">
                            <p className="text-emerald-400 font-bold text-lg">+{formatNumber(profit)}</p>
                            <p className="text-slate-400 text-sm">نسبة {investment.profitRate}%</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeInvestment(investment.id)}
                            className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {investments.length === 0 && (
          <Card className="bg-slate-800/30 border-slate-700/30 border-dashed backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl text-slate-400 mb-2">لا توجد استثمارات بعد</h3>
              <p className="text-slate-500">أضف أول استثمار لك من النموذج أعلاه</p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm pt-4">
          💡 نصيحة: تنويع الاستثمارات يقلل المخاطر ويزيد العوائد
        </p>
      </div>
    </div>
  );
}
