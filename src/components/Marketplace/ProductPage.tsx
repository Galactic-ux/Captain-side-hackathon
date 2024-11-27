"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const initialProducts = [
  { id: 1, name: "Product 1", price: 100, image: "product1.jpg" },
  { id: 2, name: "Product 2", price: 200, image: "product2.jpg" },
  { id: 3, name: "Product 3", price: 300, image: "product3.jpg" },
  { id: 4, name: "Product 4", price: 400, image: "product4.jpg" },
  { id: 5, name: "Product 5", price: 500, image: "product5.jpg" },
  { id: 6, name: "Product 6", price: 600, image: "product6.jpg" },
];

interface ProductPageProps {
  credits: number;
  updateCredits: (newCredits: number) => void;
  purchasedProducts: any[];
  setPurchasedProducts: (products: any[]) => void;
}

const ProductPage = ({
  credits,
  updateCredits,
  purchasedProducts,
  setPurchasedProducts,
}: ProductPageProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [message, setMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // New state for search
  const router = useRouter();

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = (productId: number, productPrice: number) => {
    const product = products.find((p) => p.id === productId);
    if (credits >= productPrice && product) {
      // Deduct credits
      updateCredits(credits - productPrice);

      // Add purchased product to cart
      setPurchasedProducts([...purchasedProducts, product]);

      // Remove purchased product
      setProducts(products.filter((product) => product.id !== productId));

      // Show success message
      setMessage("Purchased successfully!");
    } else {
      // Show insufficient credits message
      setMessage("Insufficient credits.");
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <main className="flex flex-col bg-gradient-to-tr from-[#60078C] to-[#1A0226] min-h-screen w-full">
      <section className="block mt-8 mx-4 lg:mx-16">
        <h1 className="text-3xl font-semibold my-6">Marketplace</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="w-full p-2 mb-6 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800"
        />

        {message && (
          <div
            className={`p-4 mb-4 text-white rounded-md ${
              message === "Purchased successfully!"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid place-items-center grid-cols-1 gap-8 gap-y-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-4 lg:gap-y-20">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative w-[374px] h-[390px] overflow-hidden group cursor-pointer m-4 border border-gray-700 rounded-lg bg-gray-900"
              >
                <div className="w-full h-[240px] flex items-center justify-center bg-gray-700 rounded-t-lg text-white text-xl font-semibold">
                  {product.image ? product.image : `Image ${product.id}`}
                </div>
                <div className="p-4 text-white">
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-lg font-medium mb-4">₹{product.price}</p>
                  <button
                    onClick={() => handleBuy(product.id, product.price)}
                    className="w-full py-2 text-lg bg-[#FCCC4C] text-black rounded hover:bg-yellow-500"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No products found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
