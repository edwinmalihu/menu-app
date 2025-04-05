"use client";

import { useState } from "react";

export default function MenuPage() {
  const menuItems = [
    {
      id: 1,
      name: "Nasi Goreng",
      price: 15000,
      image: "/images/nasi-goreng.jpg",
    },
    {
      id: 2,
      name: "Ayam Goreng",
      price: 17000,
      image: "/images/ayam-goreng.jpg",
    },
    {
      id: 3,
      name: "Nasi",
      price: 5000,
      image: "/images/nasi.jpg",
    },
  ];

  const [order, setOrder] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (id: number, qty: number) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [id]: qty >= 0 ? qty : 0,
    }));
  };

  const resetOrder = () => setOrder({});

  const total = Object.entries(order).reduce(
    (sum, [id, qty]) =>
      sum +
      (menuItems.find((item) => item.id === Number(id))?.price || 0) * qty,
    0
  );

  const orderSummary = menuItems
    .filter((item) => order[item.id])
    .map((item) => ({
      ...item,
      qty: order[item.id],
      subtotal: order[item.id] * item.price,
    }));

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-black mb-8">
        🍽️ Menu Nasi Goreng dan Ayam Bakar 3 Bersaudara
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3">
              <p className="text-lg font-bold text-gray-900">{item.name}</p>
              <p className="text-md font-semibold text-gray-600">
                {item.price.toLocaleString("id-ID")} IDR
              </p>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={order[item.id] || ""}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                }
                className="mt-2 w-full border border-gray-400 bg-white text-black text-xl font-bold rounded-lg px-4 py-3 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Ringkasan */}
      {orderSummary.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🧾 Ringkasan Pesanan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-lg">
                  <th className="p-3">Menu</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderSummary.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t text-gray-800 font-semibold"
                  >
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-center">{item.qty}</td>
                    <td className="p-3 text-right">
                      {item.subtotal.toLocaleString("id-ID")} IDR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-blue-600">
                {total.toLocaleString("id-ID")} IDR
              </span>
            </h2>

            <button
              onClick={resetOrder}
              className="mt-4 bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Reset Pesanan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
