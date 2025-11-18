'use client';

import { Product } from '@/lib/supabase';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOrder = () => {
    const phone = '212600000000';
    const message = encodeURIComponent(
      `Hello, I want to order: ${product.name} - ${product.price} ${product.currency}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
          {product.name}
        </h3>
        <p className="text-2xl font-extrabold text-gray-900 mb-4">
          {product.price} {product.currency}
        </p>

        <button
          onClick={handleOrder}
          className="w-full bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-lg active:scale-95"
        >
          Order Now
        </button>
      </div>

      {product.stock_quantity === 0 && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          Out of Stock
        </div>
      )}
    </div>
  );
}
