"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, TrendingUp, PiggyBank } from 'lucide-react';

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
          <div className="inline-flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="176" height="78" viewBox="0 0 176 78" fill="none" className="w-44 md:w-56 h-auto">
              <path d="M13.812 24.1418C14.044 23.9105 14.1601 23.7949 14.2935 23.7517C14.4109 23.7137 14.5371 23.7139 14.6544 23.7523C14.7876 23.796 14.9032 23.9121 15.1344 24.1442L18.9071 27.9323C19.377 28.4041 19.6119 28.64 19.8821 28.727C20.1197 28.8035 20.3753 28.8017 20.6118 28.7218C20.8807 28.631 21.1123 28.3917 21.5755 27.9132L24.9338 24.4441C25.3772 23.9861 25.5989 23.7571 25.6836 23.4937C25.7581 23.262 25.7598 23.0127 25.6884 22.7799C25.6073 22.5154 25.3888 22.2834 24.9517 21.8193L21.5748 18.2341C21.1125 17.7433 20.8813 17.4978 20.6109 17.4036C20.373 17.3207 20.1151 17.3171 19.8751 17.3932C19.6021 17.4799 19.3643 17.7187 18.8885 18.1964L15.1442 21.956C14.9099 22.1913 14.7928 22.3089 14.658 22.3524C14.5395 22.3907 14.412 22.39 14.2939 22.3504C14.1596 22.3054 14.0437 22.1864 13.812 21.9486L10.1495 18.1887C9.68603 17.7129 9.4543 17.475 9.18571 17.385C8.94947 17.3058 8.69436 17.3044 8.45728 17.381C8.18774 17.4681 7.95345 17.7035 7.48488 18.1741L4.00884 21.6658C3.55341 22.1233 3.32569 22.352 3.23766 22.617C3.1602 22.8501 3.15675 23.1018 3.22778 23.3371C3.3085 23.6044 3.52985 23.8394 3.97255 24.3094L7.33667 27.8811C7.7975 28.3703 8.02792 28.6149 8.29762 28.7093C8.53479 28.7922 8.7921 28.7963 9.03174 28.7209C9.30426 28.6352 9.5422 28.398 10.0181 27.9237L13.812 24.1418Z" fill="url(#paint0_linear_13_547)"/>
              <path d="M60.2164 9.76053C60.2868 9.76053 60.3516 9.79065 60.3934 9.84767C62.8294 13.1673 64.2765 23.7392 58.0493 23.7392C56.5817 23.7392 55.5003 22.9192 54.921 21.8259C54.5348 23.7782 52.9127 25.6915 50.4795 25.6915C45.5977 25.6915 45.9742 18.9863 47.6388 15.8732C47.6906 15.7763 47.8143 15.7511 47.9031 15.8152C47.966 15.8607 47.9942 15.9408 47.9743 16.0162C47.8706 16.4104 47.7761 16.8303 47.7761 17.2184C47.7761 18.7022 48.8188 19.5222 50.4795 19.5222C52.6533 19.5222 53.9986 17.9232 54.4039 14.5749C54.4132 14.4982 54.4682 14.4337 54.5426 14.4149C54.6438 14.3893 54.7454 14.4537 54.7717 14.5554C55.2686 16.4727 57.0763 17.6089 59.2466 17.6089C60.7914 17.6089 62.0273 17.0232 62.0273 16.7108C62.0273 16.4551 60.8782 15.516 58.991 14.0853C58.8582 13.9847 58.7919 13.9344 58.7503 13.8717C58.7005 13.7966 58.6748 13.7086 58.6762 13.6184C58.6774 13.5429 58.7059 13.4648 58.763 13.3084L60.0028 9.91078C60.0357 9.82051 60.121 9.76053 60.2164 9.76053Z" fill="url(#paint1_linear_13_547)"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M125.415 42.4054C125.451 42.8576 125.469 43.0838 125.335 43.5198C125.257 43.7749 124.905 44.3467 124.713 44.531C124.385 44.846 124.293 44.8834 124.107 44.9581C122.692 45.5284 120.414 46.0119 117.398 46.038C114.008 46.038 111.838 44.5209 107.714 39.6952L92.3154 21.5867C92.0597 21.286 91.9318 21.1357 91.9037 20.9773C91.879 20.8385 91.9044 20.695 91.9753 20.5734C92.0561 20.4347 92.2276 20.3384 92.5706 20.1457C101.331 15.2244 109.623 10.8112 111.104 10.8112C111.628 10.8112 111.838 11.0578 111.838 11.4805C111.838 12.1127 111.557 13.7508 111.173 15.4446C111.134 15.6142 111.228 15.7865 111.39 15.8445C111.562 15.9056 111.75 15.822 111.814 15.6502C113.402 11.4041 116.127 0.56095 108.798 0.56095C105.499 0.56095 91.3755 8.14049 85.9977 12.0985C85.7983 12.2453 85.6985 12.3187 85.6034 12.4215C85.523 12.5084 85.4436 12.6195 85.3873 12.7239C85.3207 12.8474 85.2797 12.9773 85.1977 13.2371L81.6293 24.537C81.4831 25.0001 81.4099 25.2316 81.4139 25.4735C81.4172 25.6778 81.471 25.9071 81.559 26.0911C81.6632 26.3092 81.8197 26.4708 82.1329 26.7941C86.0428 30.8311 94.0504 37.5131 94.0504 42.4779C94.0504 47.1057 80.5879 49.885 71.4902 49.5711C68.2837 49.4604 65.3479 48.8058 62.5924 47.8342C57.6384 46.0875 53.3355 43.4674 49.2939 40.1409C46.017 37.4438 42.6659 34.7872 38.4111 34.7872C26.1105 34.7872 26.0701 51.8612 27.0031 61.939C27.0739 62.7035 27.1093 63.0857 26.9742 63.2681C26.8588 63.4237 26.667 63.5145 26.4745 63.5047C26.249 63.4932 25.9871 63.2292 25.4634 62.7012C18.7099 55.892 15.6914 47.9603 17.055 38.3803C17.0917 38.1221 16.8947 37.887 16.6359 37.887C16.4684 37.887 16.3155 37.9907 16.2471 38.1448C12.9176 45.652 8.40888 47.2103 2.21917 47.578C1.70668 47.6084 1.45044 47.6236 1.24002 47.7268C1.05978 47.8151 0.892379 47.9616 0.780302 48.1291C0.649463 48.3246 0.60394 48.5512 0.512895 49.0043C-0.0808442 51.9595 -0.161732 55.3113 0.28402 58.828C0.352161 59.3656 0.386232 59.6344 0.532743 59.8612C0.653386 60.0481 0.86173 60.2227 1.06594 60.3082C1.31393 60.4121 1.57818 60.3971 2.10668 60.3671C6.3677 60.1251 9.53534 58.8215 11.852 54.7242C12.1821 63.3431 16.6918 72.6222 23.2888 77.542C23.6631 77.8212 23.8503 77.9608 24.0714 77.9922C24.2574 78.0186 24.4708 77.9769 24.6335 77.8824C24.827 77.77 24.957 77.5567 25.2171 77.1301L30.4278 68.5819C30.7499 68.0535 30.9109 67.7894 30.977 67.5304C31.0407 67.2807 31.0509 67.0831 31.0134 66.8281C30.9745 66.5636 30.8239 66.2463 30.5225 65.6118C28.0807 60.4696 26.0386 51.4036 30.3698 47.9635C35.6909 43.7371 41.5431 48.0702 46.0883 51.3013C53.7251 56.73 61.9304 60.6471 71.4902 60.8239C83.465 61.0453 94.0206 55.7001 94.776 43.0977C94.8036 42.637 94.8175 42.4066 94.8991 42.3267C94.9712 42.2561 95.068 42.2283 95.1662 42.25C95.2773 42.2745 95.4054 42.4572 95.6615 42.8226C100.461 49.6682 105.998 58.3667 115.102 58.3667C120.04 58.3033 123.761 56.128 125.653 52.5344C125.868 52.1258 125.976 51.9215 126.068 51.8799C126.158 51.8392 126.23 51.8407 126.318 51.885C126.409 51.9303 126.509 52.141 126.71 52.5625C128.39 56.0926 132.138 58.0702 136.673 58.0148L136.67 58.0302L144.724 57.9398C148.352 57.8798 150.942 56.7744 152.818 53.3002C153.23 52.5356 153.437 52.1533 153.669 51.9927C153.896 51.8354 154.088 51.7782 154.364 51.7855C154.645 51.7929 154.992 51.9824 155.685 52.3613C160.504 54.9959 165.02 56.5308 167.579 56.5308C179.271 56.5308 178.653 25.8152 166.565 25.8152C161.463 25.8152 157.619 34.1634 155.138 39.6584C153.081 44.1211 151.789 45.5341 147.03 45.6107L138.985 45.7009L138.97 45.6859C133.483 45.7564 131.212 43.819 131.072 40.3318L129.648 0.249916C129.643 0.110468 129.53 0 129.391 0C129.306 0 129.226 0.0426199 129.178 0.11378L123.53 8.51471C123.256 8.92295 123.119 9.12708 123.027 9.34949C122.946 9.54681 122.892 9.7543 122.866 9.96629C122.837 10.2052 122.857 10.451 122.896 10.9426L125.415 42.4054ZM157.516 38.2996C157.07 38.6304 156.846 38.7959 156.729 39.154C156.643 39.4169 156.683 39.8537 156.816 40.0962C156.996 40.4265 157.306 40.5769 157.924 40.8777C163.211 43.4489 170.053 45.9283 173.205 45.9283C174.184 45.9283 174.778 45.6817 174.778 44.9068C174.778 42.4059 169.326 36.77 162.651 36.77C160.625 36.77 158.913 37.2632 157.516 38.2996Z" fill="url(#paint2_linear_13_547)"/>
              <path d="M50.2613 70.1489C50.4933 69.9176 50.6093 69.802 50.7427 69.7588C50.8601 69.7208 50.9864 69.721 51.1036 69.7594C51.2369 69.8031 51.3525 69.9192 51.5837 70.1514L55.3563 73.9394C55.8262 74.4112 56.0612 74.6472 56.3313 74.7341C56.5689 74.8106 56.8245 74.8088 57.061 74.7289C57.33 74.6381 57.5616 74.3988 58.0248 73.9203L61.3831 70.4512C61.8265 69.9932 62.0482 69.7642 62.1328 69.5008C62.2073 69.2691 62.209 69.0198 62.1377 68.787C62.0566 68.5226 61.838 68.2905 61.4009 67.8264L58.0241 64.2412C57.5617 63.7504 57.3306 63.505 57.0601 63.4107C56.8223 63.3278 56.5644 63.3242 56.3243 63.4003C56.0514 63.487 55.8135 63.7258 55.3378 64.2035L51.5935 67.9631C51.3592 68.1984 51.242 68.316 51.1073 68.3595C50.9888 68.3978 50.8612 68.3971 50.7431 68.3575C50.6088 68.3125 50.493 68.1936 50.2613 67.9557L46.5988 64.1958C46.1353 63.7201 45.9036 63.4822 45.635 63.3921C45.3987 63.3129 45.1436 63.3115 44.9065 63.3881C44.637 63.4752 44.4027 63.7106 43.9341 64.1812L40.4581 67.6729C40.0027 68.1304 39.775 68.3591 39.6869 68.6241C39.6095 68.8573 39.606 69.1089 39.677 69.3442C39.7578 69.6115 39.9791 69.8465 40.4218 70.3165L43.7859 73.8882C44.2468 74.3774 44.4772 74.6221 44.7469 74.7164C44.984 74.7993 45.2414 74.8034 45.481 74.7281C45.7535 74.6423 45.9915 74.4051 46.4674 73.9308L50.2613 70.1489Z" fill="url(#paint3_linear_13_547)"/>
              <path d="M151.706 68.4517C157.771 66.0911 164.411 64.0982 171.627 62.4729C172.058 62.4006 173.067 62.2114 173.067 62.8793C173.067 64.3962 171.914 68.568 170.188 68.9161C163.253 70.5701 156.362 72.4163 149.749 75.127C148.006 75.8801 147.909 75.0155 148.367 73.4436C148.871 71.7165 149.862 69.1158 151.706 68.4517Z" fill="url(#paint4_linear_13_547)"/>
              <defs>
                <linearGradient id="paint0_linear_13_547" x1="0" y1="0" x2="176" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="0.5" stopColor="white"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                </linearGradient>
                <linearGradient id="paint1_linear_13_547" x1="0" y1="0" x2="176" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="0.5" stopColor="white"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                </linearGradient>
                <linearGradient id="paint2_linear_13_547" x1="0" y1="0" x2="176" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="0.5" stopColor="white"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                </linearGradient>
                <linearGradient id="paint3_linear_13_547" x1="0" y1="0" x2="176" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="0.5" stopColor="white"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                </linearGradient>
                <linearGradient id="paint4_linear_13_547" x1="0" y1="0" x2="176" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.3"/>
                  <stop offset="0.5" stopColor="white"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-slate-400 text-lg">تابع أداء استثماراتك المختلفة في مكان واحد واحسب أرباحك فوراً</p>
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
            {/* Input Mode Toggle */}
            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => switchInputMode('total')}
                variant={inputMode === 'total' ? 'default' : 'outline'}
                className={`flex-1 transition-all duration-300 ${
                  inputMode === 'total'
                    ? 'bg-gradient-to-l from-emerald-600 to-emerald-500 text-white'
                    : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                الحساب بالأرباح
              </Button>
              <Button
                onClick={() => switchInputMode('capital')}
                variant={inputMode === 'capital' ? 'default' : 'outline'}
                className={`flex-1 transition-all duration-300 ${
                  inputMode === 'capital'
                    ? 'bg-gradient-to-l from-emerald-600 to-emerald-500 text-white'
                    : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                الحساب برأس المال
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-slate-300">اسم الاستثمار</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="مثال: ذهب، أسهم، عقارات..."
                  className="bg-white/95 border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 rounded-full px-5 py-6 focus:border-emerald-600 focus:ring-0 focus:ring-emerald-600/0 transition-colors"
                />
              </div>

              {inputMode === 'capital' ? (
                <div className="space-y-3">
                  <Label htmlFor="capital" className="text-slate-300">رأس المال</Label>
                  <Input
                    id="capital"
                    name="capital"
                    type="number"
                    value={formData.capital}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="10000"
                    className="bg-white/95 border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 rounded-full px-5 py-6 focus:border-emerald-600 focus:ring-0 focus:ring-emerald-600/0 transition-colors"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="totalAmount" className="text-slate-300">الإجمالي بعد الربح</Label>
                  <Input
                    id="totalAmount"
                    name="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="11500"
                    className="bg-white/95 border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 rounded-full px-5 py-6 focus:border-emerald-600 focus:ring-0 focus:ring-emerald-600/0 transition-colors"
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="profitRate" className="text-slate-300">نسبة الربح (%)</Label>
                <Input
                  id="profitRate"
                  name="profitRate"
                  type="number"
                  value={formData.profitRate}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="15"
                  className="bg-white/95 border-2 border-slate-300 text-slate-800 placeholder:text-slate-400 rounded-full px-5 py-6 focus:border-emerald-600 focus:ring-0 focus:ring-emerald-600/0 transition-colors"
                />
              </div>
            </div>

            {/* Helper text for total mode */}
            {inputMode === 'total' && (
              <p className="text-slate-500 text-sm mt-2">
                💡 سيتم حساب رأس المال تلقائياً: رأس المال = الإجمالي ÷ (1 + نسبة الربح%)
              </p>
            )}

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Capital + Profit Card */}
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-blue-300 text-xs mb-1">إجمالي رأس المال</p>
                  <p className="text-xl font-bold text-white">{formatNumber(totalCapital)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500/30 rounded-full flex items-center justify-center">
                    <span className="text-emerald-400 text-sm font-bold">+</span>
                  </div>
                  <div className="h-px flex-1 bg-slate-600/50"></div>
                </div>
                <div>
                  <p className="text-emerald-300 text-xs mb-1">الأرباح</p>
                  <p className="text-xl font-bold text-emerald-400">+{formatNumber(totalProfit)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Card */}
          <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-emerald-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <p className="text-emerald-300 text-sm mb-1">الإجمالي بالأرباح</p>
              <p className="text-3xl font-bold text-white">{formatNumber(totalCapital + totalProfit)}</p>
              <p className="text-slate-400 text-xs mt-1">Revenue</p>
            </CardContent>
          </Card>

          {/* Profit Rate Card */}
          <Card className="bg-gradient-to-br from-amber-600/20 to-amber-800/20 border-amber-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <p className="text-amber-300 text-sm mb-1">نسبة الربح</p>
              <p className="text-3xl font-bold text-white">{formatNumber(overallProfitRate)}%</p>
            </CardContent>
          </Card>

          {/* Performance Indicator */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${overallProfitRate >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
              <TrendingUp className={`w-8 h-8 ${overallProfitRate >= 0 ? 'text-emerald-400' : 'text-red-400 rotate-180'}`} />
            </div>
            <p className="text-slate-400 text-xs mt-2">مؤشر الأداء</p>
          </div>
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
