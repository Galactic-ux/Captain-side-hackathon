"use client";
import React from "react";

interface SecondHandMarketPageProps {
  secondHandProducts: any[];
}

const SecondHandMarketPage = ({ secondHandProducts }: SecondHandMarketPageProps) => {
  return (
    <main className="flex flex-col bg-gradient-to-tr from-[#60078C] to-[#1A0226] min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-white mb-6">Second-Hand Market</h1>
      {secondHandProducts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {secondHandProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-300 bg-white rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">Resale Price: ₹{product.price}</p>
              <div className="flex items-center justify-center w-full h-48 bg-gray-200 mt-4">
                <span className="text-gray-500">Image Placeholder</span>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
                onClick={() => alert(`Purchased ${product.name} for ₹${product.price}`)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">No products available for resale.</p>
      )}
    </main>
  );
};

export default SecondHandMarketPage;
