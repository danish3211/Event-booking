"use client";

import { Link } from "@tanstack/react-router";

type BreadcrumbProps = {
  city: string;
  categoryTitle?: string;
};

export default function Breadcrumb({
  city,
  categoryTitle,
}: BreadcrumbProps) {
  const format = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex items-center gap-2 text-sm text-white/80">
      {/* Home */}
      <Link
        to="/"
        className="hover:text-white hover:underline transition"
      >
        Home
      </Link>

      <span>›</span>

      {/* City */}
      <span className="capitalize">
        {format(city)}
      </span>

      {/* Category (optional) */}
      {categoryTitle && (
        <>
          <span>›</span>
          <span className="font-medium text-white capitalize">
            {categoryTitle}
          </span>
        </>
      )}
    </div>
  );
}