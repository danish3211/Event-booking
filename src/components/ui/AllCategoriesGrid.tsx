import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/constants";

export default function AllCategoriesGrid() {
  const [selectedCity,] = useState("mumbai");

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          to="/$city/$category"
          params={{
            city: selectedCity.toLowerCase(),
            category: cat.slug,
          }}
          target="_blank"
         className="rounded-2xl border border-surface/30 bg-background hover:bg-primary/10 transition-transform hover:scale-105 hover:border-primary/50 p-6 text-center shadow-xs"
        >
          <span className="text-7xl">{cat.icon}</span>
          <span className="font-medium text-3xl text-text">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}