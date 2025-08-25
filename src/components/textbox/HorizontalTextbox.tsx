import React, { ReactNode, memo } from 'react';
import { DEFAULT_TITLE_CLASSES, DEFAULT_DESCRIPTION_CLASSES } from './constants';

export interface HorizontalTextboxProps {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  reverseLayout?: boolean;
  alignStart?: boolean;
}

const HorizontalTextbox = memo(function HorizontalTextbox({
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  reverseLayout = false,
  alignStart = false
}: HorizontalTextboxProps) {
  const layoutClass = reverseLayout ? 'md:flex-row-reverse' : 'md:flex-row';
  const alignClass = reverseLayout ? 'items-start' : (alignStart ? 'items-start' : 'items-end');
  
  return (
    <div className={`w-full flex flex-col gap-2 md:gap-6 justify-between ${layoutClass} ${alignClass} ${className}`}>
      <div className={`w-full md:w-1/2 ${DEFAULT_TITLE_CLASSES} ${titleClassName}`}>
        {title}
      </div>
      <div className={`w-full md:w-[31%] ${DEFAULT_DESCRIPTION_CLASSES} ${descriptionClassName}`}>
        {description}
      </div>
    </div>
  );
});

export default HorizontalTextbox;