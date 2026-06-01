"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Datos simulados del inventario
const mockStock = [
  {
    id: "cheesecake",
    name: "Cheesecake Arándanos",
    price: 6.50,
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=300",
    stock: 14,
    status: "high", // high | low | out
  },
  {
    id: "mousse",
    name: "Mousse de Chocolate",
    price: 5.50,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300",
    stock: 2,
    status: "low",
  },
  {
    id: "croissant",
    name: "Croissant Mantequilla",
    price: 3.20,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300",
    stock: 0,
    status: "out",
  },
];

const categories = ["Todos", "Pasteles", "Masas"];

export default function CajeroStockPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Funciones auxiliares para renderizar los badges de stock de forma condicional
  const getStockBadge = (stock: number, status: string) => {
    if (status === "out" || stock === 0) {
      return (
        <div className="mt-2 bg-red-100 text-red-800 text-[10px] font-bold py-1 px-2 rounded-lg flex items-center justify-center gap-1">
          <i className="fa-solid fa-xmark-circle"></i> Agotado
        </div>
      );
    }
    if (status === "low" || stock <= 3) {
      return (
        <div className="mt-2 bg-orange-100 text-orange-800 text-[10px] font-bold py-1 px-2 rounded-lg flex items-center justify-center gap-1">
          <i className="fa-solid fa-triangle-exclamation"></i> Quedan: {stock} u.
        </div>
      );
    }
    return (
      <div className="mt-2 bg-green-100 text-green-800 text-[10px] font-bold py-1 px-2 rounded-lg flex items-center justify-center gap-1">
        <i className="fa-solid fa-check-circle"></i> Stock: {stock} u.
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9EE] flex flex-col justify-between relative font-sans">
      
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-9 pb-2 text-[11px] font-bold text-[#3D2F20]/70 z-40">
        <span>9:42</span>
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-wifi text-[10px]"></i>
          <i className="fa-solid fa-battery-three-quarters text-xs"></i>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-28">
        
        {/* Header Buscador */}
        <header className="p-6 pt-2 sticky top-0 bg-[#FFF9EE]/95 backdrop-blur-md z-30">
          <h1 className="text-xl font-serif font-bold text-(--color-navy) mb-3">Consulta de Stock</h1>
          <div className="relative w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#3D2F20]/40"></i>
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#FCEFD2] rounded-full py-2.5 pl-10 pr-4 text-xs font-bold text-[#3D2F20] focus:outline-none focus:border-(--color-gold) shadow-sm"
            />
          </div>
        </header>

        {/* Categorías */}
        <div className="px-5 mb-4 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-(--color-navy) text-white"
                  : "bg-white text-[#3D2F20]/60 border border-[#FCEFD2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Inventario */}
        <section className="px-5">
          <div className="grid grid-cols-2 gap-4">
            {mockStock.map((product) => (
              <div 
                key={product.id} 
                className={`bg-white rounded-[2rem] p-3 shadow-sm border border-[#FCEFD2] transition-opacity ${
                  product.status === "out" ? "opacity-60" : ""
                }`}
              >
                <div className="relative aspect-square rounded-[1.5rem] bg-[#FFF9EE] mb-2 overflow-hidden">
                  <Image 
                    src={product.img} 
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`w-full h-full object-cover ${
                      product.status === "out" ? "grayscale" : ""
                    }`}
                  />
                </div>
                <h4 className="text-xs font-bold text-(--color-navy) truncate" title={product.name}>
                  {product.name}
                </h4>
                <p className="text-[10px] text-[#3D2F20]/60 mt-0.5">
                  ${product.price.toFixed(2)}
                </p>
                {getStockBadge(product.stock, product.status)}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NavBar Cajero (Stock Activo) */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/90 backdrop-blur-md text-[#3D2F20]/70 py-3.5 px-6 rounded-full flex justify-between items-center shadow-xl shadow-[#3D2F20]/10 border border-[#FCEFD2] z-40">
        <button 
          onClick={() => router.push("/cajero")}
          className="flex flex-col items-center gap-0.5 hover:text-(--color-navy) transition-colors"
        >
          <i className="fa-solid fa-cash-register text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">POS</span>
        </button>
        <button 
          className="flex flex-col items-center gap-0.5 text-(--color-navy) relative"
        >
          <i className="fa-solid fa-box text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">Stock</span>
          <div className="absolute -bottom-1.5 w-[5px] h-[5px] bg-(--color-navy) rounded-full"></div>
        </button>
        <button 
          onClick={() => router.push("/turno")}
          className="flex flex-col items-center gap-0.5 hover:text-(--color-navy) transition-colors"
        >
          <i className="fa-regular fa-clock text-sm"></i>
          <span className="text-[9px] font-bold uppercase tracking-widest">Turno</span>
        </button>
      </nav>

      {/* Indicador de Home */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-40"></div>
    </div>
  );
}