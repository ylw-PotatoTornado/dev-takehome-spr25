

interface TableRowHeaderProps {
    headers: string[]
}

export function TableRowHeader({
    headers
}:TableRowHeaderProps) {
    return (

        <thead className="top-[67px] gap-[6px]"> 
            <tr>
            {headers.map((header) => (
                <td
                    key = {header}
                    className="h-[44px] border-b-[1px] border-[#EAECF0] border-collapse pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[12px] bg-[#FCFCFD] font-medium font-Inter text-xs leading-[18px] text-[#667085]"
                >
                    {header}
                </td>
            ))}
            </tr>
        </thead>
    )
}