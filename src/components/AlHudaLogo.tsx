/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AlHudaLogoProps {
  className?: string;
  size?: number;
}

export default function AlHudaLogo({ className = '', size = 48 }: AlHudaLogoProps) {
  return (
    <div 
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100 ${className}`}
    >
      <img 
        src="https://lh3.googleusercontent.com/d/1HKbSgW48z3r3cLp77Hzf_dCQwjfafs97" 
        alt="Al-Huda Digital Academy Logo" 
        className="w-full h-full object-cover select-none"
        loading="eager"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
