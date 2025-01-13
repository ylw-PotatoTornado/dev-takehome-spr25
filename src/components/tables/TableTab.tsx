import { RequestStatus } from "@/lib/types/request";

export type TabOption = {
    label: string,
    value: RequestStatus | null,
}

interface TabProps {
    options: TabOption[],
    selected: RequestStatus | null,
    onChange: (value: any) => void;
}


export function TableTab({
    options,
    selected,
    onChange,
}: TabProps) {
    
    return (
        <div className="w-[1205px] h-[42px] flex gap-2 border-b border-[#EAECF0] ">
            <div
                className= "w-6" 
            ></div>

            {options.map((option) => (
            <button
                key={option.value}
                className={`px-4 py-2 hover:bg-[#EFF6FF] rounded-t ${
                    selected === option.value
                    ? "bg-[#0070FF] text-[14px] leading-[16.94px] font-medium text-[#FFFFFF]" 
                    : "bg-[#F2F2F2] text-[14px] leading-[16.94px] font-medium text-[#666666]"}`}
                onClick={() => onChange(option.value)}
            >
                <span>
                    {option.label}
                </span>
            </button>
            ))}

      </div>
    )

}