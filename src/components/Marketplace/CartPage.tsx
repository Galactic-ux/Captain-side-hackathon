"use client";
import React, { useState } from "react";

interface CartPageProps {
  purchasedProducts: any[];
  setPurchasedProducts: (products: any[]) => void;
  setSecondHandProducts: (products: any[]) => void;
}

const CartPage = ({
  purchasedProducts,
  setPurchasedProducts,
  setSecondHandProducts,
}: CartPageProps) => {
  const [resalePrices, setResalePrices] = useState<{ [key: number]: number }>(
    {}
  );

  const handleResell = (product: any) => {
    const resalePrice = resalePrices[product.id];
    if (resalePrice) {
      setSecondHandProducts((prev) => [
        ...prev,
        { ...product, price: resalePrice },
      ]);
      setPurchasedProducts(
        purchasedProducts.filter((p) => p.id !== product.id)
      );
    }
  };

  return (
    <main className="flex flex-col bg-gradient-to-tr from-[#60078C] to-[#1A0226] min-h-screen relative">
      <h1 className="text-3xl font-semibold mb-6 m-5">Cart</h1>
      {purchasedProducts.length > 0 ? (
        <div className="grid gap-4 m-10">
          {purchasedProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-300 bg-white rounded-lg"
            >
              <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
              <p className="text-gray-700">Price: ₹{product.price}</p>
              <input
                type="number"
                placeholder="Set Resale Price"
                className="border p-2 mt-2 w-full rounded text-gray-700"
                onChange={(e) =>
                  setResalePrices(
                    {
                    ...resalePrices,
                    [product.id]: Number(e.target.value),
                  })
                }
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleResell(product)}
              >
                Resell
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in the cart.</p>
      )}
    </main>
  );
};

export default CartPage;
