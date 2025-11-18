import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';

async function getProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return products || [];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            New Collection
          </h2>
          <p className="text-lg text-gray-600">
            Engineered for peak performance and style
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No products available at the moment.
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ATHLETIC</h3>
              <p className="text-gray-400">
                Premium athletic wear for champions
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Shipping Info</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <p className="text-gray-400">
                Stay connected for latest drops
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ATHLETIC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
