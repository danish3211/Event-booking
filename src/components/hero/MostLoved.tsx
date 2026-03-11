"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import AllCategoriesGrid from "../ui/AllCategoriesGrid";
import Modal from "../ui/Modal";
import { CATEGORIES } from "@/constants";


export default function MostLoved() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity,] = useState("mumbai");

  return (
    <>
      <p className="text-3xl font-semibold text-background">{selectedCity}'s Most-Loved</p>

      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 9).map((cat) => (
            <Link
              key={cat.slug}
              to="/$city/$category"
              params={{
                city: selectedCity.toLowerCase(),
                category: cat.slug,
              }}
              target="_blank"
              // className="rounded-2xl border border-surface/30 bg-background hover:bg-primary/10 transition-transform hover:scale-105 hover:border-primary/50 p-6 text-center shadow-xs"
              className="flex items-center justify-center rounded-2xl border border-surface/40 p-6 hover:bg-primary/10 hover:border-primary/50 transition-all font-medium text-background hover:text-primary"
            >
              <span className="text-4xl">{cat.icon}</span>
              <p className="mt-2 font-semibold">{cat.name}</p>
            </Link>
          ))}

          {/* View All Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center rounded-2xl border-2 border-dashed border-surface/40 p-6 hover:bg-primary/10 hover:border-primary/50 transition-all font-medium text-background hover:text-primary"
          >
            <span>
              View All →
            </span>
          </button>
        </div>
      </div>

      {/* Reusable Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Categories"
        size="xxl"
      >
        <AllCategoriesGrid />
      </Modal>
    </>
  );
}