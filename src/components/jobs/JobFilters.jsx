"use client";

import React from "react";
import { Select, Label, ListBox, Input, Checkbox } from "@heroui/react";

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "engineering", label: "Engineering" },
  { id: "data-analytics", label: "Data Analytics" },
  { id: "marketing", label: "Marketing" },
];

const JOB_TYPES = [
  { id: "all", label: "All Types" },
  { id: "full-time", label: "Full-Time" },
  { id: "part-time", label: "Part-Time" },
  { id: "contract", label: "Contract" },
];

function FilterSelect({ label, placeholder, value, onChange, options }) {
  return (
    <Select
      value={value}
      // HeroUI v3 (React Aria) uses onChange, not onValueChange.
      // Clear button passes null, so fall back to "all".
      onChange={(key) => onChange(key ?? "all")}
      className="w-full md:w-48"
    >
      <Label className="text-xs text-zinc-400 mb-1">{label}</Label>
      <Select.Trigger className="border border-zinc-800 text-white rounded-xl px-3 py-2 flex items-center justify-between">
        <Select.Value placeholder={placeholder} />
        <Select.ClearButton />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="border border-zinc-800 rounded-2xl shadow-xl mt-1 p-1 z-50">
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.id}
              id={option.id}
              textValue={option.label}
              className="p-2 hover:bg-zinc-800/50 rounded-lg cursor-pointer"
            >
              <Label className="text-white">{option.label}</Label>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export default function JobFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  isRemoteOnly,
  onRemoteChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between border border-zinc-800 p-6 rounded-3xl w-full mb-8">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Input
          aria-label="Search jobs"
          className="w-full border-zinc-800 text-white"
          placeholder="Search title, company, location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Select Filters & Remote Checkbox */}
      <div className="flex flex-wrap md:flex-nowrap gap-6 items-center w-full md:w-auto">
        {/* Remote Only Checkbox */}
        <div className="flex items-center px-2">
          <Checkbox
            isSelected={isRemoteOnly}
            onChange={onRemoteChange}
            className="cursor-pointer"
          >
            <Checkbox.Content className="flex items-center gap-2.5">
              <Checkbox.Control className="w-5 h-5 rounded-md border border-zinc-700 bg-transparent flex items-center justify-center transition-colors data-[selected=true]:bg-white data-[selected=true]:border-white">
                <Checkbox.Indicator className="text-zinc-950 text-xs font-bold" />
              </Checkbox.Control>
              <span className="text-sm text-zinc-300 font-medium select-none">
                Remote Only
              </span>
            </Checkbox.Content>
          </Checkbox>
        </div>

        <FilterSelect
          label="Category"
          placeholder="Select Category"
          value={selectedCategory}
          onChange={onCategoryChange}
          options={CATEGORIES}
        />

        <FilterSelect
          label="Job Type"
          placeholder="Select Job Type"
          value={selectedType}
          onChange={onTypeChange}
          options={JOB_TYPES}
        />
      </div>
    </div>
  );
}
