import { AboutStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";

export function getFuturisticAboutStyle(
  colorTemplate: ColorTemplate = 1
): AboutStyle {
  const colors = getFuturisticColors(colorTemplate);
  return {
    section: {
      className: `${theme.spacing.sectionPadding} !pb-0`,
      backgroundColor: colors.primary,
      showBorder: true,
      fadeBottom: true,
    },
    gradient: {
      show: true,
      inset: "inset-0",
      rounded: "rounded-none",
      radialOpacity: "0%",
      linearOpacity: "30%",
      linearOpacityMobile: "60%",
      radialColor: theme.backgrounds.gradient.radialColor,
      linearColor: colors.gradientLinear,
    },
    title: {
      className: `${theme.heading.sizes.hero} ${theme.text.headingClass} leading-[1.1] ${theme.heading.className}`,
      useRetroText: false,
      animationProps: {
        duration: theme.animations.duration,
        stagger: 0.1,
        start: theme.animations.scrollTrigger.start,
        end: theme.animations.scrollTrigger.end,
        variant: "words-trigger" as const,
      },
      gradientColors: theme.gradients.text,
    },
    descriptions: {
      className: `${theme.description.className}`,
      containerClassName: "flex flex-col gap-3 md:gap-4",
    },
    layout: {
      alignStart: theme.layout.alignStart,
      descriptionClassName: "w-full",
      textboxClassName: "!gap-3",
    },
    button: {
      className:
        `h-12 md:h-15 w-auto aspect-square flex items-center justify-center cursor-pointer inset-shadow-2xs inset-shadow-blue/30 ${colors.cardBg} futuristic-card-border`,
      childClassName: "bg-transparent !px-0 h-12 md:h-15 w-auto aspect-square",
      iconClassName: "h-[35%] w-auto text-white",
      variant: "none" as const,
    },
    image: {
      parentClassName:
        `relative ${colors.cardBg} futuristic-card-border p-4 flex items-center justify-center w-full md:w-11/12 mx-auto inset-shadow-2xs inset-shadow-blue/30`,
      className: "rounded object-cover size-full",
    },
  };
}

export const futuristicMomocoinAboutStyle = getFuturisticAboutStyle(1);
