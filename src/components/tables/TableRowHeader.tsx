interface TableRowHeaderProps {
  headers: string[];
}

export function TableRowHeader({ headers }: TableRowHeaderProps) {
  return (
    <tr>
      {headers.map((header) => (
        <td
          key={header}
          className="h-[44px] border-b-[1px] border-[#EAECF0] border-collapse pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[12px] bg-[#FCFCFD]"
        >
          <div className="font-medium font-Inter text-xs leading-[18px] text-[#667085] gap-[4px]">
            {header}
          </div>
        </td>
      ))}
    </tr>
  );
}
