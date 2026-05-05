import { type Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <div
      className={`bg-white border rounded-lg p-4 flex flex-col ${
        featured ? 'border-gray-400 shadow-md' : 'border-gray-200'
      }`}
    >
      {/* Image placeholder - nested box pattern */}
      <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center relative">
        <div className="w-16 h-12 border-2 border-gray-300 rounded flex items-center justify-center">
          <span className="text-xs text-gray-400 font-bold">IMG</span>
        </div>
      </div>

      {/* Series badge */}
      <span className="inline-block self-start px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-2">
        {product.series}
      </span>

      {/* Product name */}
      <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h3>

      {/* Feature bullets */}
      <ul className="text-xs text-gray-600 space-y-1 mb-4 flex-1">
        {product.features.slice(0, 3).map((feature, i) => (
          <li key={i} className="flex items-start gap-1">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="space-y-2 mt-auto">
        <button
          type="button"
          className="w-full py-2 px-4 bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium text-gray-900 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="w-full py-2 px-4 border border-gray-300 text-sm text-gray-700 rounded-full hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
