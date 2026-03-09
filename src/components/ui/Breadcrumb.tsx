import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 flex-wrap">
      {allItems.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#7A9E98]" />}
          {item.href && index < allItems.length - 1 ? (
            <Link
              href={item.href}
              className="text-[#7A9E98] hover:text-[#0FEA7A] transition-colors text-sm flex items-center gap-1"
            >
              {index === 0 && <Home className="w-3.5 h-3.5" />}
              {item.label}
            </Link>
          ) : (
            <span className="text-[#E8F4F1] text-sm font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
