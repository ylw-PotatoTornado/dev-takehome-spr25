import { useState } from "react";
import { Badge } from "./DropdownBadge";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import { RequestStatus } from "@/lib/types/request";

export type DropdownOption = {
  label: string;
  value: RequestStatus;
  backgroundColor: string; 
  textColor: string; 
  dotColor: string; 
};

export interface DropdownProps {
  options: DropdownOption[];
  selected: RequestStatus;
  onChange: (value: any) => void;
}

export default function Dropdown({
  options,
  selected,
  onChange
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newOption: RequestStatus) => {
    onChange(newOption);
    setIsOpen(false);
  };

  return (
    <div className="relative">

      {/* Button to expand dropdown menu */}
      <button
        className="w-full h-[36px] flex justify-between items-center px-4 py-2 rounded-md border border-gray-300 bg-[#F9FAFB] hover:bg-[#EFF6FF]"
        onClick={() => setIsOpen(!isOpen)}
      >

        <Badge
          text={options.find((option) => option.value === selected)?.label || ""}
          backgroundColor={
            options.find((option) => option.value === selected)?.backgroundColor || "#E5E7EB"
          }
          textColor={
            options.find((option) => option.value === selected)?.textColor || "#333"
          }
          dotColor={
            options.find((option) => option.value === selected)?.dotColor || "#999"
          }
        />


        <div>{isOpen ? <UpArrowIcon /> : <DownArrowIcon />}</div>
      </button>

      {/* Dropdown menu expand based on isOpen state */}
      {isOpen && (
        <ul
          className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleChange(option.value)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
            >
              {/* Options */}
              <Badge
                text={option.label}
                backgroundColor={option.backgroundColor}
                textColor={option.textColor}
                dotColor={option.dotColor}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}