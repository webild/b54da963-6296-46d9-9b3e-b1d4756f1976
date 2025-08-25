import React, { ReactNode, memo } from 'react';
import { INLINE_TITLE_CLASSES, INLINE_DESCRIPTION_CLASSES } from './constants';

export interface InlineTextboxProps {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const InlineTextbox = memo(function InlineTextbox({
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = ''
}: InlineTextboxProps) {
  return (
    <div className={`block relative ${className}`}>
      <span className={`inline-block mr-[var(--width-15)] md:mr-[var(--width-10)] ${INLINE_TITLE_CLASSES} ${titleClassName} [&>*]:!inline`}>
        {title}
      </span>
      <span className={`inline font-light ${INLINE_DESCRIPTION_CLASSES} ${descriptionClassName} [&>*]:!inline`}>
        {description}
      </span>
    </div>
  );
});

export default InlineTextbox;