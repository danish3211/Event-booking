import { cn } from '@/lib/utils';
import React, { memo } from 'react';

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MemorizedWrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={cn(
        'max-w-screen-2xl mx-auto',
        'px-4 sm:px-6 md:px-8 lg:px-10',
        className
      )}
    >
      {children}
    </div>
  );
};

const Wrapper = memo(MemorizedWrapper);
Wrapper.displayName = 'Wrapper';
export { Wrapper };
