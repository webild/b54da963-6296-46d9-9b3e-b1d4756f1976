import React, { ReactNode, memo } from 'react';
import { DEFAULT_TITLE_CLASSES, DEFAULT_DESCRIPTION_CLASSES } from './constants';

export interface StandardTextboxProps {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const StandardTextbox = memo(function StandardTextbox({
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = ''
}: StandardTextboxProps) {
  return (
    <div className={`w-full flex flex-col gap-2 md:gap-3 text-center items-center ${className}`}>
      <div className={`w-full md:w-1/2 ${DEFAULT_TITLE_CLASSES} ${titleClassName}`}>
        {title}
      </div>
      <div className={`w-full md:w-1/2 ${DEFAULT_DESCRIPTION_CLASSES} ${descriptionClassName}`}>
        {description}
      </div>
    </div>
  );
});

export default StandardTextbox;