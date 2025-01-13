
interface HeaderProps {
  text: string;
}

export function TableHeader({ text }: HeaderProps) {
  return (
    <div className="card-header border-b border-[#FFFFFF]">
      <div className="content pt-[20px] pr-[24px] pb-[19px] pl-[24px] gap-[16px]">
        <div className="text-and-supporting-text  gap-[4px]">
          <div className="text-and-badge  gap-[8px]">
            <span className=" text-lg font-medium font-inter text-gray-800">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}