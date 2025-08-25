import React, { ReactNode, memo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
  GSAP_FADE_CONFIG,
  GSAP_SCROLL_TRIGGER_CONFIG,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

export interface TaggedTextboxProps {
  icon?: ReactNode;
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
  tagClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  disableAnimation?: boolean;
  tagLabelClassName?: string;
}

const TaggedTextbox = memo(function TaggedTextbox({
  icon,
  label,
  title,
  description,
  children,
  className = "",
  tagClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  disableAnimation = false,
  tagLabelClassName
}: TaggedTextboxProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagRef.current || disableAnimation) return;

    const animations: gsap.core.Tween[] = [];

    const tagAnimation = gsap.fromTo(tagRef.current, GSAP_FADE_CONFIG.from, {
      ...GSAP_FADE_CONFIG.to,
      scrollTrigger: {
        trigger: tagRef.current,
        ...GSAP_SCROLL_TRIGGER_CONFIG,
      },
    });
    animations.push(tagAnimation);

    if (contentRef.current && children) {
      const contentAnimation = gsap.fromTo(
        contentRef.current,
        GSAP_FADE_CONFIG.from,
        {
          ...GSAP_FADE_CONFIG.to,
          scrollTrigger: {
            trigger: contentRef.current,
            ...GSAP_SCROLL_TRIGGER_CONFIG,
          },
        }
      );
      animations.push(contentAnimation);
    }

    return () => {
      animations.forEach((animation) => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
    };
  }, [children, disableAnimation]);

  return (
    <div
      className={`w-full flex flex-col gap-2 md:gap-3 text-center items-center ${className}`}
    >
      <div
        ref={tagRef}
        className={`flex items-center gap-2 bg-white shadow p-1 px-3 rounded-full ${tagClassName}`}
      >
        {icon}
        <span className={`text-sm font-medium ${tagLabelClassName}`}>{label}</span>
      </div>
      <div
        className={`w-full md:w-1/2 ${DEFAULT_TITLE_CLASSES} ${titleClassName}`}
      >
        {title}
      </div>
      <div
        className={`w-full md:w-1/2 ${DEFAULT_DESCRIPTION_CLASSES} ${descriptionClassName}`}
      >
        {description}
      </div>
      {children && (
        <div ref={contentRef} className={`w-fit mt-2 ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
});

export default TaggedTextbox;
