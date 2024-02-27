interface CloseIconProps {
  onClick?: any;
  className?: string;
}

export function CloseIcon({ onClick, className }: CloseIconProps) {
  return (
    <div
      onClick={onClick}
      className={`absolute flex justify-center z-20 items-center cursor-pointer hover:rotate-90 transition-transform duration-200 text-assist ${className || 'w-12 h-12 right-4 text-2xl'}`}
    >
      ×
    </div>
  );
}
