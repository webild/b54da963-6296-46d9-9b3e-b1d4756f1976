import React, { ReactNode, memo } from "react";
import {
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
} from "./constants";
import { cls } from "../../lib/utils";

export interface VerticalTextboxProps {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  reverseLayout?: boolean;
  alignStart?: boolean;
}

const VerticalTextbox = memo(function VerticalTextbox({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  reverseLayout = false,
  alignStart = false,
}: VerticalTextboxProps) {
  const layoutClass = reverseLayout ? "flex-col-reverse" : "";
  const alignClass = reverseLayout
    ? "items-start"
    : alignStart
    ? "items-start"
    : "items-end";

  return (
    <div
      className={cls(
        "w-full flex flex-col gap-2 md:gap-6",
        layoutClass,
        alignClass,
        className
      )}
    >
      <div
        className={cls(
          "w-full md:w-2/3",
          DEFAULT_TITLE_CLASSES,
          titleClassName
        )}
      >
        {title}
      </div>
      <div
        className={cls(
          "w-full md:w-11/12",
          DEFAULT_DESCRIPTION_CLASSES,
          descriptionClassName
        )}
      >
        {description}
      </div>
    </div>
  );
});

export default VerticalTextbox;
