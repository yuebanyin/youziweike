import { memo, useEffect, useState } from 'react';

interface CutDownProps {
  day?: number | string;
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
  className?: string;
  onTimeUp?: Function;
}

const CutDown = (props: CutDownProps) => {
  const { day, hour, minute, second, className, onTimeUp } = props;
  const [s, setS] = useState(Number(second));

  useEffect(() => {
    if (s > 0) {
      setTimeout(() => {
        setS((s: number) => s - 1);
      }, 1000);
    } else {
      if (typeof onTimeUp === 'function') {
        onTimeUp();
      }
    }
  }, [s]);

  return (
    <div className={`flex items-center justify-center py-2 px-4 ${className}`}>
      {day && <span>{day}:</span>}
      {hour && <span>{hour}:</span>}
      {minute && <span>{minute}:</span>}
      {second && <span>{s} 秒</span>}
    </div>
  );
};

export default memo(CutDown);
