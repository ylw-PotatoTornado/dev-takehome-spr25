
interface HeaderProps {
    text: string,
    badge?: any,
}

export function TableHeader({
    text,
    badge
}:HeaderProps) {
    return (
        <div className="card-header px-4 py-2 border-b border-[#FFFFFF]">
            <div className="content pt-[20px] pr-[24px] pb-[19px] pl-[24px] gap-[16px]">
                <div className="text-and-supporting-text  gap-[4px]">
                <div className="text-and-badge  gap-[8px]">
                    <span className="w-[123px] h-[28px] text-lg font-medium font-inter text-gray-800">{text}</span>
                    <span className="badge">
                        {badge}
                    </span>
                </div>
                </div>
            </div>
        </div>
    )
}