import React, { ReactNode, memo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
  GSAP_FADE_CONFIG,
  GSAP_SCROLL_TRIGGER_CONFIG,
} from "./constants";
import { cls } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface ContentTextboxProps {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  disableAnimation?: boolean;
}

const ContentTextbox = memo(function ContentTextbox({
  title,
  description,
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  disableAnimation = false,
}: ContentTextboxProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || disableAnimation) return;

    const animation = gsap.fromTo(contentRef.current, GSAP_FADE_CONFIG.from, {
      ...GSAP_FADE_CONFIG.to,
      scrollTrigger: {
        trigger: contentRef.current,
        ...GSAP_SCROLL_TRIGGER_CONFIG,
      },
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [disableAnimation]);

  return (
    <div
      className={`w-full flex flex-col gap-2 md:gap-3 text-center items-center ${className}`}
    >
      <div
        className={cls(
          "w-full md:w-1/2",
          DEFAULT_TITLE_CLASSES,
          titleClassName
        )}
      >
        {title}
      </div>
      <div
        className={cls(
          "w-full md:w-1/2",
          DEFAULT_DESCRIPTION_CLASSES,
          descriptionClassName
        )}
      >
        {description}
      </div>
      <div ref={contentRef} className={cls("w-fit mt-2", contentClassName)}>
        {children}
      </div>
    </div>
  );
});

export default ContentTextbox;
