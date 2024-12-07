/* eslint-disable react/prop-types */
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { filterCategories } from "@/data/categories"; // Import filterCategories from categories.js

const Filter = ({ handleFilterChange, selectedCategories }) => {
  const [localSelectedCategories, setLocalSelectedCategories] =
    useState(selectedCategories);
  const [sortByPrice, setSortByPrice] = useState("");

  // Sync local state with parent component's selectedCategories state
  useEffect(() => {
    setLocalSelectedCategories(selectedCategories);
  }, [selectedCategories]);

  // Handle the category change when selecting from dropdown
  const handleCategoryChange = (newCategories) => {
    setLocalSelectedCategories(newCategories);
    handleFilterChange(newCategories, sortByPrice); // Pass updated categories to parent
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(localSelectedCategories, selectedValue); // Pass sort option with selected categories
  };

  return (
    <div className="relative w-full md:w-[25%] bg-transparent p-6 rounded-lg shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl text-white">
          Filter Options
        </h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="text-white border border-gray-300 hover:border-blue-600 focus:ring focus:ring-blue-600 rounded-md">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-gray-300 shadow-lg rounded-md">
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4 border-gray-300" />
      <div>
        <h1 className="font-semibold mb-2 text-white">CATEGORY</h1>
        <Select
          multiple
          value={localSelectedCategories} // Ensure this is an array of selected category ids
          onValueChange={handleCategoryChange} // Update the categories on selection change
          className="bg-white text-black border border-gray-300 rounded-md p-2 shadow-lg"
        >
          <SelectTrigger className="text-black border border-gray-300 hover:border-blue-600 focus:ring focus:ring-blue-600 rounded-md">
            <SelectValue placeholder="Select Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-gray-300 shadow-lg rounded-md">
            <SelectGroup>
              {filterCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
