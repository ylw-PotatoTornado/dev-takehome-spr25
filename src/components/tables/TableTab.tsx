import { RequestStatus } from "@/lib/types/request";

export type TabOption = {
    label: string,
    value: RequestStatus | null,
}

interface TabProps {
  options: TabOption[];
  selected: RequestStatus | null;
  onChange: (value: RequestStatus | null) => void;
}

export function TableTab({ options, selected, onChange }: TabProps) {
  
  const handleChange = (value: RequestStatus | null) => {
    if (value !== selected) {
      onChange(value)
    }
  }

  return (
    <div className="top-[67px] w-full max-w-[1205px] h-[42px] flex flex-wrap gap-[6px] border-b border-[#EAECF0] ">
      <div className="sm:block w-[11px] h-[36px]"></div>

      {options.map((option) => (
        <button
          key={option.value}
          className={`px-4 sm:px-6 py-1 sm: py-2 hover:bg-[#EFF6FF] rounded-t ${
            selected === option.value
              ? "bg-[#0070FF] text-sm leading-[16.94px] font-Inter font-medium text-[#FFFFFF]"
              : "bg-[#F2F2F2] text-sm leading-[16.94px] font-Inter font-medium text-[#666666]"
          }`}
          onClick={() => handleChange(option.value)}
        >
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}