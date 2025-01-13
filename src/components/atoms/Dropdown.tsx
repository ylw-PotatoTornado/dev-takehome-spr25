import { useState } from "react";
import { LeftArrowIcon } from "../icons/LeftArrowIcon";
import { RequestStatus } from "@/lib/types/request";

export type DropdownOption = {
    label: string,
    value: RequestStatus,
}

export interface DropdownProps {
    options: DropdownOption[],
    selected: RequestStatus,
    onChange: (value: any) => void;
}


export default function Dropdown({
    options,
    selected,
    onChange
}: DropdownProps) {

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (value: any) => {
        onChange(value);
        setIsOpen(false);
    }

    return (
        <div>
            {/**Part 1 - Always Render - Dropdown button */}
            <button
                className="w-[142px] h-[34px] rounded-[4px] border border-[#EAECF0] bg-[#FCFCFD] pt-[6px] pr-[8px] pb-[6px] pl-[8px] flex justify-between items-center gap-[8px]"
                onClick = {() => setIsOpen(!isOpen)}            
            >

                <div className="w-[8px] h-[8px] rounded-[6px]">
                    <div
                        className = "w-[6px] h-[6px] pt-[1px] pl-[1px] rounded-full"
                        style = {{
                            backgroundColor: "#FD8033"
                        }}
                    ></div>
                </div>

                <div
                    className="w-auto h-auto text-xs font-medium leading-[18px] text-center"
                    style = {{
                        color:  "#A43E00",
                        width:  "47px",
                    }}   
                >
                    {options.find((option) => option.value === selected)?.label || "Unknown"}
                </div>

                <div>
                    <LeftArrowIcon/>
                </div>
            </button>

                    {/* //Begin DEBUGGING */}
            {isOpen && (
                <ul>
                    {options.map((option) => (
                        <li
                            key = {option.value}
                            // onClick = {() => handleChange(option.value)}
                            onClick = {() => handleChange(option.value)}
                            className="w-auto rounded-[16px] bg-[#FFDAC3] pt-[2px] pr-[8px] pb-[2px] pl-[6px] flex items-center gap-[6px]"
                            style = {{
                                backgroundColor: "#FFDAC3",
                            }} 
                        
                        >

                                <div className="w-[8px] h-[8px] rounded-[6px]">
                                    <div
                                        className = "w-[6px] h-[6px] pt-[1px] pl-[1px] rounded-full"
                                        style = {{
                                            backgroundColor: "#FD8033"
                                        }}
                                    ></div>
                                </div>

                                <div
                                    className="w-auto h-auto text-xs font-medium leading-[18px] text-center"
                                    style = {{
                                        color:  "#A43E00",
                                        width:  "47px",
                                    }}   
                                >
                                    {option.label  || "Unknown" }
                                </div>                            


                        </li>
                    ))}



                </ul>
            )}
            


        </div>
    )



}