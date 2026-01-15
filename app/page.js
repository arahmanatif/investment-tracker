"use client";

import React, { useState } from 'react';
import { Trash2, Sun } from 'lucide-react';

export default function InvestmentTracker() {
  const [investments, setInvestments] = useState([]);
  const [inputMode, setInputMode] = useState('total'); // 'capital' or 'total'
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    profitRate: '',
    totalAmount: ''
  });

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
  const EmptyStateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M28 49C30.5773 49 32.6667 46.9107 32.6667 44.3333C32.6667 41.756 30.5773 39.6667 28 39.6667C25.4227 39.6667 23.3333 41.756 23.3333 44.3333C23.3333 46.9107 25.4227 49 28 49Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 16.3333C30.5773 16.3333 32.6667 14.244 32.6667 11.6667C32.6667 9.08934 30.5773 7 28 7C25.4227 7 23.3333 9.08934 23.3333 11.6667C23.3333 14.244 25.4227 16.3333 28 16.3333Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M37.3333 32.6667C39.9107 32.6667 42 30.5773 42 28C42 25.4227 39.9107 23.3333 37.3333 23.3333C34.756 23.3333 32.6667 25.4227 32.6667 28C32.6667 30.5773 34.756 32.6667 37.3333 32.6667Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M46.6667 49C49.244 49 51.3333 46.9107 51.3333 44.3333C51.3333 41.756 49.244 39.6667 46.6667 39.6667C44.0893 39.6667 42 41.756 42 44.3333C42 46.9107 44.0893 49 46.6667 49Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33332 49C11.9107 49 14 46.9107 14 44.3333C14 41.756 11.9107 39.6667 9.33332 39.6667C6.75599 39.6667 4.66666 41.756 4.66666 44.3333C4.66666 46.9107 6.75599 49 9.33332 49Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.6667 32.6667C21.244 32.6667 23.3333 30.5773 23.3333 28C23.3333 25.4227 21.244 23.3333 18.6667 23.3333C16.0893 23.3333 14 25.4227 14 28C14 30.5773 16.0893 32.6667 18.6667 32.6667Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Logo component
  const Logo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="62" viewBox="0 0 140 62" fill="none">
      <mask id="path-1-inside-1_13_547" fill="white">
        <path d="M10.9868 19.1897C11.1714 19.0058 11.2637 18.9139 11.3698 18.8795C11.4632 18.8493 11.5636 18.8495 11.6569 18.8801C11.7629 18.9148 11.8549 19.0071 12.0388 19.1916L15.0397 22.2026C15.4135 22.5776 15.6004 22.7652 15.8153 22.8343C16.0043 22.8951 16.2076 22.8936 16.3957 22.8301C16.6096 22.7579 16.7939 22.5678 17.1623 22.1874L19.8337 19.4299C20.1864 19.0659 20.3628 18.8838 20.4301 18.6745C20.4894 18.4903 20.4907 18.2921 20.434 18.1071C20.3695 17.8969 20.1956 17.7124 19.8479 17.3435L17.1618 14.4938C16.794 14.1036 16.6101 13.9085 16.395 13.8336C16.2058 13.7677 16.0006 13.7648 15.8097 13.8254C15.5926 13.8942 15.4034 14.0841 15.025 14.4638L12.0465 17.4522C11.8602 17.6392 11.767 17.7327 11.6598 17.7673C11.5655 17.7977 11.4641 17.7972 11.3701 17.7657C11.2633 17.7299 11.1712 17.6354 10.9869 17.4463L8.07347 14.4577C7.7048 14.0795 7.52046 13.8904 7.30681 13.8189C7.11889 13.7559 6.91597 13.7548 6.72739 13.8157C6.51297 13.8849 6.32661 14.072 5.95388 14.4461L3.18885 17.2215C2.82658 17.5852 2.64544 17.767 2.57541 17.9776C2.5138 18.1629 2.51105 18.363 2.56755 18.55C2.63176 18.7625 2.80784 18.9493 3.15998 19.3229L5.83599 22.1619C6.20256 22.5508 6.38584 22.7452 6.60038 22.8202C6.78904 22.8861 6.99371 22.8894 7.18434 22.8295C7.40111 22.7613 7.59039 22.5728 7.96894 22.1957L10.9868 19.1897Z"/>
        <path d="M47.8994 7.75837C47.9554 7.75837 48.0069 7.78231 48.0402 7.82764C49.9779 10.4663 51.129 18.8696 46.1756 18.8696C45.0082 18.8696 44.148 18.2178 43.6872 17.3488C43.3799 18.9006 42.0896 20.4215 40.1542 20.4215C36.2709 20.4215 36.5704 15.0916 37.8945 12.6172C37.9357 12.5401 38.0341 12.5201 38.1047 12.5711C38.1548 12.6072 38.1772 12.6709 38.1614 12.7308C38.0789 13.0442 38.0037 13.378 38.0037 13.6864C38.0037 14.8658 38.8332 15.5176 40.1542 15.5176C41.8833 15.5176 42.9534 14.2467 43.2758 11.5852C43.2832 11.5242 43.327 11.4729 43.3862 11.458C43.4666 11.4376 43.5475 11.4888 43.5684 11.5697C43.9637 13.0937 45.4016 13.9968 47.1279 13.9968C48.3568 13.9968 49.3399 13.5312 49.3399 13.283C49.3399 13.0797 48.4258 12.3333 46.9246 11.196C46.819 11.1161 46.7663 11.0761 46.7332 11.0262C46.6936 10.9666 46.6731 10.8966 46.6742 10.8249C46.6752 10.7649 46.6979 10.7028 46.7433 10.5785L47.7295 7.8778C47.7557 7.80605 47.8235 7.75837 47.8994 7.75837Z"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M99.7618 33.7069C99.7906 34.0663 99.805 34.2461 99.6983 34.5927C99.6359 34.7954 99.3561 35.2499 99.2036 35.3964C98.9429 35.6468 98.8692 35.6765 98.7218 35.7359C97.5962 36.1892 95.7837 36.5736 93.3846 36.5943C90.6882 36.5943 88.9621 35.3884 85.6819 31.5526L73.4327 17.1587C73.2293 16.9197 73.1276 16.8002 73.1052 16.6743C73.0856 16.5639 73.1058 16.4499 73.1622 16.3532C73.2265 16.243 73.3629 16.1664 73.6357 16.0132C80.6041 12.1014 87.2 8.59354 88.3783 8.59354C88.7953 8.59354 88.9621 8.78953 88.9621 9.12551C88.9621 9.62805 88.7388 10.9301 88.4329 12.2764C88.4023 12.4113 88.4765 12.5483 88.606 12.5943C88.7426 12.6429 88.892 12.5765 88.9432 12.4399C90.2063 9.06478 92.3738 0.445883 86.5436 0.445883C83.92 0.445883 72.685 6.47064 68.4073 9.61673C68.2486 9.73342 68.1693 9.79176 68.0936 9.87347C68.0297 9.94255 67.9665 10.0309 67.9217 10.1139C67.8688 10.2121 67.8361 10.3153 67.7709 10.5218L64.9324 19.5038C64.8161 19.8718 64.7579 20.0559 64.761 20.2482C64.7636 20.4106 64.8065 20.5928 64.8765 20.7391C64.9594 20.9124 65.0839 21.0409 65.333 21.2979C68.4431 24.5067 74.8128 29.8181 74.8128 33.7645C74.8128 37.443 64.104 39.6522 56.8672 39.4027C54.3166 39.3147 51.9813 38.7943 49.7894 38.0221C45.8487 36.6336 42.426 34.551 39.211 31.9068C36.6044 29.763 33.9388 27.6514 30.5543 27.6514C20.7697 27.6514 20.7376 41.223 21.4798 49.2336C21.5361 49.8412 21.5642 50.1451 21.4567 50.29C21.3649 50.4137 21.2124 50.4859 21.0592 50.4781C20.8799 50.4689 20.6716 50.2591 20.255 49.8394C14.8829 44.427 12.4818 38.1223 13.5665 30.5075C13.5957 30.3022 13.439 30.1153 13.2331 30.1153C13.0998 30.1153 12.9783 30.1977 12.9239 30.3202C10.2754 36.2875 6.68888 37.5262 1.76525 37.8184C1.35759 37.8426 1.15376 37.8547 0.98638 37.9367C0.843006 38.0069 0.709847 38.1233 0.620695 38.2564C0.516618 38.4118 0.480407 38.5919 0.407985 38.9521C-0.0643079 41.3012 -0.128651 43.9654 0.225925 46.7607C0.280128 47.188 0.30723 47.4017 0.423773 47.582C0.519739 47.7305 0.685467 47.8693 0.847906 47.9373C1.04518 48.0199 1.25537 48.0079 1.67576 47.9841C5.06521 47.7918 7.58493 46.7556 9.4277 43.4987C9.69032 50.3496 13.2775 57.7253 18.5252 61.636C18.823 61.8579 18.9718 61.9688 19.1477 61.9938C19.2957 62.0148 19.4654 61.9817 19.5949 61.9065C19.7488 61.8172 19.8522 61.6476 20.059 61.3086L24.2039 54.5138C24.4601 54.0938 24.5882 53.8839 24.6408 53.678C24.6915 53.4795 24.6996 53.3225 24.6698 53.1198C24.6388 52.9095 24.519 52.6573 24.2793 52.1529C22.337 48.0656 20.7126 40.8593 24.1578 38.1248C28.3905 34.7654 33.0456 38.2097 36.6612 40.778C42.7359 45.0931 49.2628 48.2067 56.8672 48.3472C66.3926 48.5232 74.7891 44.2745 75.39 34.2572C75.412 33.8909 75.423 33.7078 75.4879 33.6443C75.5453 33.5882 75.6223 33.5661 75.7004 33.5833C75.7888 33.6028 75.8906 33.7481 76.0944 34.0385C79.9119 39.4798 84.3163 46.394 91.5582 46.394C95.4865 46.3436 98.4464 44.6146 99.9513 41.7581C100.122 41.4333 100.208 41.2709 100.281 41.2379C100.353 41.2055 100.41 41.2067 100.48 41.242C100.552 41.2779 100.632 41.4454 100.792 41.7804C102.129 44.5864 105.11 46.1584 108.717 46.1143L108.715 46.1265L115.121 46.0547C118.007 46.0071 120.067 45.1284 121.559 42.3668C121.888 41.7591 122.052 41.4552 122.237 41.3276C122.417 41.2025 122.57 41.1571 122.789 41.1628C123.013 41.1687 123.289 41.3193 123.84 41.6206C127.674 43.7147 131.266 44.9347 133.301 44.9347C142.602 44.9347 142.11 20.5198 132.495 20.5198C128.437 20.5198 125.379 27.1555 123.405 31.5233C121.769 35.0706 120.742 36.1937 116.956 36.2547L110.556 36.3263L110.544 36.3145C106.18 36.3705 104.373 34.8305 104.262 32.0586L103.129 0.198651C103.125 0.0878077 103.035 0 102.925 0C102.857 0 102.794 0.0338774 102.756 0.0904406L98.2628 6.7681C98.0445 7.0926 97.9353 7.25486 97.8626 7.43165C97.7981 7.58849 97.755 7.75342 97.7344 7.92193C97.7112 8.11186 97.7269 8.30723 97.7582 8.69796L99.7618 33.7069ZM125.297 30.4433C124.942 30.7062 124.764 30.8377 124.671 31.1224C124.602 31.3314 124.634 31.6786 124.74 31.8714C124.883 32.1339 125.13 32.2534 125.622 32.4926C129.827 34.5363 135.269 36.5071 137.777 36.5071C138.555 36.5071 139.028 36.3111 139.028 35.6951C139.028 33.7072 134.691 29.2274 129.382 29.2274C127.77 29.2274 126.408 29.6195 125.297 30.4433Z"/>
        <path d="M39.9806 55.7594C40.1651 55.5756 40.2574 55.4836 40.3636 55.4493C40.4569 55.4191 40.5574 55.4193 40.6506 55.4498C40.7566 55.4846 40.8486 55.5768 41.0325 55.7613L44.0334 58.7724C44.4072 59.1474 44.5941 59.3349 44.809 59.404C44.998 59.4648 45.2013 59.4634 45.3895 59.3999C45.6034 59.3277 45.7876 59.1375 46.1561 58.7572L48.8275 55.9997C49.1802 55.6356 49.3565 55.4536 49.4238 55.2443C49.4831 55.06 49.4845 54.8619 49.4277 54.6769C49.3632 54.4666 49.1894 54.2822 48.8416 53.9133L46.1555 51.0636C45.7877 50.6734 45.6039 50.4783 45.3887 50.4034C45.1996 50.3375 44.9944 50.3346 44.8035 50.3951C44.5863 50.464 44.3971 50.6539 44.0187 51.0336L41.0403 54.022C40.8539 54.209 40.7607 54.3025 40.6535 54.3371C40.5592 54.3675 40.4578 54.3669 40.3638 54.3355C40.257 54.2997 40.1649 54.2051 39.9806 54.0161L37.0672 51.0275C36.6985 50.6493 36.5142 50.4602 36.3005 50.3886C36.1126 50.3257 35.9097 50.3245 35.7211 50.3854C35.5067 50.4547 35.3203 50.6417 34.9476 51.0159L32.1826 53.7913C31.8203 54.1549 31.6392 54.3368 31.5691 54.5474C31.5075 54.7327 31.5048 54.9328 31.5613 55.1197C31.6255 55.3322 31.8016 55.519 32.1537 55.8926L34.8297 58.7316C35.1963 59.1205 35.3796 59.315 35.5941 59.39C35.7828 59.4559 35.9874 59.4591 36.1781 59.3992C36.3948 59.3311 36.5841 59.1426 36.9627 58.7655L39.9806 55.7594Z"/>
        <path d="M120.676 54.4103C125.5 52.534 130.782 50.9499 136.522 49.658C136.864 49.6004 137.667 49.4501 137.667 49.981C137.667 51.1867 136.75 54.5028 135.377 54.7794C129.86 56.0942 124.379 57.5616 119.118 59.7163C117.732 60.315 117.655 59.6277 118.019 58.3783C118.42 57.0055 119.208 54.9382 120.676 54.4103Z"/>
      </mask>
      <path d="M10.9868 19.1897C11.1714 19.0058 11.2637 18.9139 11.3698 18.8795C11.4632 18.8493 11.5636 18.8495 11.6569 18.8801C11.7629 18.9148 11.8549 19.0071 12.0388 19.1916L15.0397 22.2026C15.4135 22.5776 15.6004 22.7652 15.8153 22.8343C16.0043 22.8951 16.2076 22.8936 16.3957 22.8301C16.6096 22.7579 16.7939 22.5678 17.1623 22.1874L19.8337 19.4299C20.1864 19.0659 20.3628 18.8838 20.4301 18.6745C20.4894 18.4903 20.4907 18.2921 20.434 18.1071C20.3695 17.8969 20.1956 17.7124 19.8479 17.3435L17.1618 14.4938C16.794 14.1036 16.6101 13.9085 16.395 13.8336C16.2058 13.7677 16.0006 13.7648 15.8097 13.8254C15.5926 13.8942 15.4034 14.0841 15.025 14.4638L12.0465 17.4522C11.8602 17.6392 11.767 17.7327 11.6598 17.7673C11.5655 17.7977 11.4641 17.7972 11.3701 17.7657C11.2633 17.7299 11.1712 17.6354 10.9869 17.4463L8.07347 14.4577C7.7048 14.0795 7.52046 13.8904 7.30681 13.8189C7.11889 13.7559 6.91597 13.7548 6.72739 13.8157C6.51297 13.8849 6.32661 14.072 5.95388 14.4461L3.18885 17.2215C2.82658 17.5852 2.64544 17.767 2.57541 17.9776C2.5138 18.1629 2.51105 18.363 2.56755 18.55C2.63176 18.7625 2.80784 18.9493 3.15998 19.3229L5.83599 22.1619C6.20256 22.5508 6.38584 22.7452 6.60038 22.8202C6.78904 22.8861 6.99371 22.8894 7.18434 22.8295C7.40111 22.7613 7.59039 22.5728 7.96894 22.1957L10.9868 19.1897Z" fill="url(#paint0_linear_13_547)"/>
      <path d="M47.8994 7.75837C47.9554 7.75837 48.0069 7.78231 48.0402 7.82764C49.9779 10.4663 51.129 18.8696 46.1756 18.8696C45.0082 18.8696 44.148 18.2178 43.6872 17.3488C43.3799 18.9006 42.0896 20.4215 40.1542 20.4215C36.2709 20.4215 36.5704 15.0916 37.8945 12.6172C37.9357 12.5401 38.0341 12.5201 38.1047 12.5711C38.1548 12.6072 38.1772 12.6709 38.1614 12.7308C38.0789 13.0442 38.0037 13.378 38.0037 13.6864C38.0037 14.8658 38.8332 15.5176 40.1542 15.5176C41.8833 15.5176 42.9534 14.2467 43.2758 11.5852C43.2832 11.5242 43.327 11.4729 43.3862 11.458C43.4666 11.4376 43.5475 11.4888 43.5684 11.5697C43.9637 13.0937 45.4016 13.9968 47.1279 13.9968C48.3568 13.9968 49.3399 13.5312 49.3399 13.283C49.3399 13.0797 48.4258 12.3333 46.9246 11.196C46.819 11.1161 46.7663 11.0761 46.7332 11.0262C46.6936 10.9666 46.6731 10.8966 46.6742 10.8249C46.6752 10.7649 46.6979 10.7028 46.7433 10.5785L47.7295 7.8778C47.7557 7.80605 47.8235 7.75837 47.8994 7.75837Z" fill="url(#paint1_linear_13_547)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M99.7618 33.7069C99.7906 34.0663 99.805 34.2461 99.6983 34.5927C99.6359 34.7954 99.3561 35.2499 99.2036 35.3964C98.9429 35.6468 98.8692 35.6765 98.7218 35.7359C97.5962 36.1892 95.7837 36.5736 93.3846 36.5943C90.6882 36.5943 88.9621 35.3884 85.6819 31.5526L73.4327 17.1587C73.2293 16.9197 73.1276 16.8002 73.1052 16.6743C73.0856 16.5639 73.1058 16.4499 73.1622 16.3532C73.2265 16.243 73.3629 16.1664 73.6357 16.0132C80.6041 12.1014 87.2 8.59354 88.3783 8.59354C88.7953 8.59354 88.9621 8.78953 88.9621 9.12551C88.9621 9.62805 88.7388 10.9301 88.4329 12.2764C88.4023 12.4113 88.4765 12.5483 88.606 12.5943C88.7426 12.6429 88.892 12.5765 88.9432 12.4399C90.2063 9.06478 92.3738 0.445883 86.5436 0.445883C83.92 0.445883 72.685 6.47064 68.4073 9.61673C68.2486 9.73342 68.1693 9.79176 68.0936 9.87347C68.0297 9.94255 67.9665 10.0309 67.9217 10.1139C67.8688 10.2121 67.8361 10.3153 67.7709 10.5218L64.9324 19.5038C64.8161 19.8718 64.7579 20.0559 64.761 20.2482C64.7636 20.4106 64.8065 20.5928 64.8765 20.7391C64.9594 20.9124 65.0839 21.0409 65.333 21.2979C68.4431 24.5067 74.8128 29.8181 74.8128 33.7645C74.8128 37.443 64.104 39.6522 56.8672 39.4027C54.3166 39.3147 51.9813 38.7943 49.7894 38.0221C45.8487 36.6336 42.426 34.551 39.211 31.9068C36.6044 29.763 33.9388 27.6514 30.5543 27.6514C20.7697 27.6514 20.7376 41.223 21.4798 49.2336C21.5361 49.8412 21.5642 50.1451 21.4567 50.29C21.3649 50.4137 21.2124 50.4859 21.0592 50.4781C20.8799 50.4689 20.6716 50.2591 20.255 49.8394C14.8829 44.427 12.4818 38.1223 13.5665 30.5075C13.5957 30.3022 13.439 30.1153 13.2331 30.1153C13.0998 30.1153 12.9783 30.1977 12.9239 30.3202C10.2754 36.2875 6.68888 37.5262 1.76525 37.8184C1.35759 37.8426 1.15376 37.8547 0.98638 37.9367C0.843006 38.0069 0.709847 38.1233 0.620695 38.2564C0.516618 38.4118 0.480407 38.5919 0.407985 38.9521C-0.0643079 41.3012 -0.128651 43.9654 0.225925 46.7607C0.280128 47.188 0.30723 47.4017 0.423773 47.582C0.519739 47.7305 0.685467 47.8693 0.847906 47.9373C1.04518 48.0199 1.25537 48.0079 1.67576 47.9841C5.06521 47.7918 7.58493 46.7556 9.4277 43.4987C9.69032 50.3496 13.2775 57.7253 18.5252 61.636C18.823 61.8579 18.9718 61.9688 19.1477 61.9938C19.2957 62.0148 19.4654 61.9817 19.5949 61.9065C19.7488 61.8172 19.8522 61.6476 20.059 61.3086L24.2039 54.5138C24.4601 54.0938 24.5882 53.8839 24.6408 53.678C24.6915 53.4795 24.6996 53.3225 24.6698 53.1198C24.6388 52.9095 24.519 52.6573 24.2793 52.1529C22.337 48.0656 20.7126 40.8593 24.1578 38.1248C28.3905 34.7654 33.0456 38.2097 36.6612 40.778C42.7359 45.0931 49.2628 48.2067 56.8672 48.3472C66.3926 48.5232 74.7891 44.2745 75.39 34.2572C75.412 33.8909 75.423 33.7078 75.4879 33.6443C75.5453 33.5882 75.6223 33.5661 75.7004 33.5833C75.7888 33.6028 75.8906 33.7481 76.0944 34.0385C79.9119 39.4798 84.3163 46.394 91.5582 46.394C95.4865 46.3436 98.4464 44.6146 99.9513 41.7581C100.122 41.4333 100.208 41.2709 100.281 41.2379C100.353 41.2055 100.41 41.2067 100.48 41.242C100.552 41.2779 100.632 41.4454 100.792 41.7804C102.129 44.5864 105.11 46.1584 108.717 46.1143L108.715 46.1265L115.121 46.0547C118.007 46.0071 120.067 45.1284 121.559 42.3668C121.888 41.7591 122.052 41.4552 122.237 41.3276C122.417 41.2025 122.57 41.1571 122.789 41.1628C123.013 41.1687 123.289 41.3193 123.84 41.6206C127.674 43.7147 131.266 44.9347 133.301 44.9347C142.602 44.9347 142.11 20.5198 132.495 20.5198C128.437 20.5198 125.379 27.1555 123.405 31.5233C121.769 35.0706 120.742 36.1937 116.956 36.2547L110.556 36.3263L110.544 36.3145C106.18 36.3705 104.373 34.8305 104.262 32.0586L103.129 0.198651C103.125 0.0878077 103.035 0 102.925 0C102.857 0 102.794 0.0338774 102.756 0.0904406L98.2628 6.7681C98.0445 7.0926 97.9353 7.25486 97.8626 7.43165C97.7981 7.58849 97.755 7.75342 97.7344 7.92193C97.7112 8.11186 97.7269 8.30723 97.7582 8.69796L99.7618 33.7069ZM125.297 30.4433C124.942 30.7062 124.764 30.8377 124.671 31.1224C124.602 31.3314 124.634 31.6786 124.74 31.8714C124.883 32.1339 125.13 32.2534 125.622 32.4926C129.827 34.5363 135.269 36.5071 137.777 36.5071C138.555 36.5071 139.028 36.3111 139.028 35.6951C139.028 33.7072 134.691 29.2274 129.382 29.2274C127.77 29.2274 126.408 29.6195 125.297 30.4433Z" fill="url(#paint2_linear_13_547)"/>
      <path d="M39.9806 55.7594C40.1651 55.5756 40.2574 55.4836 40.3636 55.4493C40.4569 55.4191 40.5574 55.4193 40.6506 55.4498C40.7566 55.4846 40.8486 55.5768 41.0325 55.7613L44.0334 58.7724C44.4072 59.1474 44.5941 59.3349 44.809 59.404C44.998 59.4648 45.2013 59.4634 45.3895 59.3999C45.6034 59.3277 45.7876 59.1375 46.1561 58.7572L48.8275 55.9997C49.1802 55.6356 49.3565 55.4536 49.4238 55.2443C49.4831 55.06 49.4845 54.8619 49.4277 54.6769C49.3632 54.4666 49.1894 54.2822 48.8416 53.9133L46.1555 51.0636C45.7877 50.6734 45.6039 50.4783 45.3887 50.4034C45.1996 50.3375 44.9944 50.3346 44.8035 50.3951C44.5863 50.464 44.3971 50.6539 44.0187 51.0336L41.0403 54.022C40.8539 54.209 40.7607 54.3025 40.6535 54.3371C40.5592 54.3675 40.4578 54.3669 40.3638 54.3355C40.257 54.2997 40.1649 54.2051 39.9806 54.0161L37.0672 51.0275C36.6985 50.6493 36.5142 50.4602 36.3005 50.3886C36.1126 50.3257 35.9097 50.3245 35.7211 50.3854C35.5067 50.4547 35.3203 50.6417 34.9476 51.0159L32.1826 53.7913C31.8203 54.1549 31.6392 54.3368 31.5691 54.5474C31.5075 54.7327 31.5048 54.9328 31.5613 55.1197C31.6255 55.3322 31.8016 55.519 32.1537 55.8926L34.8297 58.7316C35.1963 59.1205 35.3796 59.315 35.5941 59.39C35.7828 59.4559 35.9874 59.4591 36.1781 59.3992C36.3948 59.3311 36.5841 59.1426 36.9627 58.7655L39.9806 55.7594Z" fill="url(#paint3_linear_13_547)"/>
      <path d="M120.676 54.4103C125.5 52.534 130.782 50.9499 136.522 49.658C136.864 49.6004 137.667 49.4501 137.667 49.981C137.667 51.1867 136.75 54.5028 135.377 54.7794C129.86 56.0942 124.379 57.5616 119.118 59.7163C117.732 60.315 117.655 59.6277 118.019 58.3783C118.42 57.0055 119.208 54.9382 120.676 54.4103Z" fill="url(#paint4_linear_13_547)"/>
      <path d="M43.6872 17.3488L44.1289 17.1146C44.0298 16.9276 43.8237 16.8233 43.6144 16.8541C43.405 16.8849 43.2378 17.0441 43.1967 17.2517L43.6872 17.3488ZM93.3846 36.5943V37.0943L93.3889 37.0943L93.3846 36.5943Z" fill="white" fillOpacity="0.2" mask="url(#path-1-inside-1_13_547)"/>
      <defs>
        <linearGradient id="paint0_linear_13_547" x1="0" y1="0" x2="139.966" y2="62.076" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="0.5" stopColor="white" stopOpacity="0.8"/>
          <stop offset="1" stopColor="white" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="paint1_linear_13_547" x1="0" y1="0" x2="139.966" y2="62.076" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="0.5" stopColor="white" stopOpacity="0.8"/>
          <stop offset="1" stopColor="white" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="paint2_linear_13_547" x1="0" y1="0" x2="139.966" y2="62.076" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="0.5" stopColor="white" stopOpacity="0.8"/>
          <stop offset="1" stopColor="white" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="paint3_linear_13_547" x1="0" y1="0" x2="139.966" y2="62.076" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="0.5" stopColor="white" stopOpacity="0.8"/>
          <stop offset="1" stopColor="white" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="paint4_linear_13_547" x1="0" y1="0" x2="139.966" y2="62.076" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.3"/>
          <stop offset="0.5" stopColor="white" stopOpacity="0.8"/>
          <stop offset="1" stopColor="white" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
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
          <div className="inline-flex items-center justify-center mb-6">
            <Logo />
          </div>
          <p className="text-white text-lg md:text-xl leading-relaxed">
            تابع أداءات استثماراتك المختلفة بشكل تراكمي
            <br />
            واحسب أرباحك مباشرة
          </p>
        </div>

        {/* Main Content - Two Column Layout (Calculator Right, Investments Left) */}
        <div className="flex flex-col lg:flex-row-reverse gap-6 mt-12 justify-center items-start">

          {/* Calculator Card - Right Side (appears first in RTL) */}
          <div
            className="w-full lg:w-[476px] rounded-[20px] p-8"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            {/* Card Title */}
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              حاسبة الاستثمار التراكمية
            </h2>

            {/* Segmented Control with Animation */}
            <div
              className="h-12 p-1 rounded-full mb-6 flex relative"
              style={{
                background: 'linear-gradient(96.28deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.016) 50%, rgba(0, 0, 0, 0.08) 100%)'
              }}
            >
              {/* Animated Background Pill */}
              <div
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/80 rounded-full shadow-[0px_4px_10px_0px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out"
                style={{
                  transform: inputMode === 'total' ? 'translateX(0)' : 'translateX(calc(-100% - 8px))',
                  right: '4px'
                }}
              />
              <button
                onClick={() => switchInputMode('total')}
                className={`flex-1 rounded-full text-base font-bold transition-colors duration-300 relative z-10 ${
                  inputMode === 'total' ? 'text-black' : 'text-black/60'
                }`}
              >
                الحساب بالأرباح
              </button>
              <button
                onClick={() => switchInputMode('capital')}
                className={`flex-1 rounded-full text-base font-bold transition-colors duration-300 relative z-10 ${
                  inputMode === 'capital' ? 'text-black' : 'text-black/60'
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
                      type="text"
                      inputMode="decimal"
                      value={formData.capital}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="10000"
                      className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[10px] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                      className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[10px] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                    className="w-full h-10 px-3 bg-white border border-[#cccccc] rounded-[10px] text-black placeholder:text-[#cccccc] text-sm focus:outline-none focus:border-[#28755b] transition-colors text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    dir="rtl"
                  />
                </div>
              </div>

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

          {/* Empty State / Investments List - Left Side */}
          <div
            className={`w-full lg:w-[476px] min-h-[436px] rounded-[20px] flex flex-col p-6 ${
              investments.length === 0
                ? 'items-center justify-center border-2 border-dashed'
                : 'items-stretch justify-start'
            }`}
            style={investments.length === 0 ? { borderColor: 'rgba(255, 255, 255, 0.2)' } : {}}
          >
            {investments.length === 0 ? (
              <div className="text-center" style={{ opacity: 0.4 }}>
                <div className="mb-6 flex justify-center text-white">
                  <EmptyStateIcon />
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
                  return (
                    <div
                      key={investment.id}
                      className="bg-white/10 rounded-[10px] p-4 flex items-center justify-between group hover:bg-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeInvestment(investment.id)}
                          className="text-white/40 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="text-right">
                          <p className="text-emerald-400 font-bold">+{formatNumber(profit)}</p>
                          <p className="text-white/60 text-sm">{investment.profitRate}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <h3 className="text-white font-medium">{investment.name}</h3>
                          <p className="text-white/60 text-sm">
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
