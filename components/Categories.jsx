import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCategories } from "../services";

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 mt-10">
      <h1 className="font-bold pt-2 py-4 pl-2 border-b-[0.5px] text-[1.2rem] border-gray-200 mb-6">
        Categories
      </h1>
      <div className="space-y-6">
        {categories.map((category, index) => (
          <Link href={`/category/${category.slug}`} key={category.id}>
            <span
              className={`cursor-pointer block pb-4 ${
                index === categories.length - 1
                  ? "border-b-0"
                  : "border-b-[0.5px] border-gray-200"
              }`}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
