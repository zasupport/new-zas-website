'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/types';

interface FAQProps {
  items: FAQ[];
  title?: string;
}

export default function FAQAccordion({ items, title = 'Frequently Asked Questions' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {title && (
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-[#E8F4F1] mb-8"
         
        >
          {title}
        </h2>
      )}
      <div className="divide-y divide-[rgba(255,255,255,0.06)]">
        {items.map((item, index) => (
          <div key={index} className="py-1">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-5 text-left gap-4 group"
              aria-expanded={openIndex === index}
            >
              <span
                className="text-[#E8F4F1] font-semibold text-base sm:text-lg group-hover:text-[#0FEA7A] transition-colors"
               
              >
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#0FEA7A] flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="pb-5 text-[#7A9E98] leading-relaxed text-sm sm:text-base">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
