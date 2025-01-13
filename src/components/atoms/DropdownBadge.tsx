interface BadgeProps {
  text: string;
  backgroundColor: string;
  textColor: string;
  dotColor: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  backgroundColor,
  textColor,
  dotColor,
}) => {
  return (
    <div
      className="inline-flex items-center px-3 py-1 rounded-full"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {/* Dot */}
      <div
        className="w-2 h-2 rounded-full mr-2"
        style={{
          backgroundColor: dotColor,
        }}
      ></div>

      {/* Text */}
      <span
        className="text-sm font-medium"
        style={{
          color: textColor,
        }}
      >
        {text}
      </span>
    </div>
  );
};
