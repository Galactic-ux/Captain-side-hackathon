"use client";

import ProductPage from '@/components/Marketplace/ProductPage';
import SecondHandMarketPage from '@/components/Marketplace/SeconHandMarketPage';
import CartPage from '@/components/Marketplace/CartPage';
import Navbar from '@/components/landing/Navbar';
import { useState } from "react";
import React from 'react';

const page = () => {
  const [credits, setCredits] = useState<number>(1000);
  const [activePage, setActivePage] = useState("ProductsPage");
  const [purchasedProducts, setPurchasedProducts] = useState<any[]>([]);
  const [secondHandProducts, setSecondHandProducts] = useState<any[]>([]);

  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
  };

  return (
    <div className="flex flex-col bg-gradient-to-tr from-[#60078C] to-[#1A0226] min-h-screen">
      {/* Navbar */}
      <Navbar bgColor="#110219" credits={credits} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-800 text-white flex flex-col justify-center h-[70%] mx-auto">
          <h1 className="p-4 text-lg font-bold bg-gray-900">Marketplace</h1>
          <nav className="flex-1">
            <ul>
              <li
                className={`p-4 cursor-pointer ${
                  activePage === "ProductsPage" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("ProductsPage")}
              >
                Products
              </li>
              <li
                className={`p-4 cursor-pointer ${
                  activePage === "CartPage" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("CartPage")}
              >
                Cart
              </li>
              <li
                className={`p-4 cursor-pointer ${
                  activePage === "SecondHandMarketPage" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
                onClick={() => setActivePage("SecondHandMarketPage")}
              >
                Second-Hand Market
              </li>
            </ul>
          </nav>
          <div className="p-4 bg-gray-900">
            <p>Credits: ₹{credits}</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 overflow-auto p-4">
          {activePage === "ProductsPage" && (
            <ProductPage
              credits={credits}
              updateCredits={updateCredits}
              purchasedProducts={purchasedProducts}
              setPurchasedProducts={setPurchasedProducts}
            />
          )}
          {activePage === "CartPage" && (
            <CartPage
              purchasedProducts={purchasedProducts}
              setPurchasedProducts={setPurchasedProducts}
              setSecondHandProducts={setSecondHandProducts}
            />
          )}
          {activePage === "SecondHandMarketPage" && (
            <SecondHandMarketPage secondHandProducts={secondHandProducts} />
          )}
        </main>
      </div>
    </div>
  );
};

export default page;
