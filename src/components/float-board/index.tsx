import { ReactNode } from 'react';

interface FloatBoardProps {
  children?: ReactNode;
  open?: boolean;
  className?: string;
  onClose?: Function;
}

export const FloatBoard = (props: FloatBoardProps) => {
  const { children, open, className = 'pt-7 px-4', onClose } = props;
  if (!open) return null;
  return (
    <div
      onClick={() => {
        onClose && onClose();
      }}
      className=' fixed bg-mask5 left-0 right-0 top-0 bottom-0 flex items-center justify-center z-1000 overflow-hidden'
    >
      <div className={`bg-white rounded-t-7.5 w-full bottom-0 fixed ${className}`}>{children}</div>
    </div>
  );
};
