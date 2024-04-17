import React, { ReactNode, useRef, useEffect } from 'react';

type ComponentClickOutsideProps = {
  conditional: boolean;
  setState: (state: boolean) => void;
  children: ReactNode;
  className?: string;
};

const ComponentClickOutside = ({
  conditional,
  setState,
  children,
  className
}: ComponentClickOutsideProps) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target) && conditional) {
        setState(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [conditional]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ComponentClickOutside;
