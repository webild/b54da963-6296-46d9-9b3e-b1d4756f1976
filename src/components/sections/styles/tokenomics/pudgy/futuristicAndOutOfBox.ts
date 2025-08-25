import { TokenomicsStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";

export function getFuturisticTokenomicsStyle(
  colorTemplate: ColorTemplate = 1
): TokenomicsStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    section: {
      className: theme.spacing.sectionPadding,
      backgroundColor: colors.primary,
      spotlight: {
        width: "25%",
        height: "150%",
        left: "0%",
        top: "-30%",
        rotate: "-60deg",
        color: colors.spotlight,
        blur: "100px",
        opacity: 1,
        mobileWidth: "55%",
        mobileHeight: "70%",
        mobileLeft: "-10%",
        mobileTop: "-60%",
        mobileRotate: "-30deg",
      },
    },
    title: {
      className: `${theme.heading.sizes.hero} leading-none tracking-tight ${theme.text.headingClass} ${theme.heading.className}`,
      animation: "slide",
      useRetroText: false,
      animationProps: {
        duration: theme.animations.duration,
        stagger: theme.animations.stagger,
        start: "top 80%",
        end: "top 20%",
        variant: theme.animations.variant,
      },
      gradientColors: theme.gradients.text,
    },
    description: {
      className: `mt-4 ${theme.description.className} max-w-3xl text-off-white`,
    },
    bento: {
      items: [],
      className: "",
      gridClassName: "gap-3 md:gap-6",
      itemClassName: `${colors.cardBg} futuristic-card-border p-8 md:p-10 !gap-1 md:!gap-3 justify-center items-center`,
      valueClassName: `${theme.tokenomics.value.small} font-semibold ${theme.heading.className}`,
      gradientColors: theme.gradients.text,
      descriptionClassName: `${theme.tokenomics.description.medium} font-medium ${theme.description.className} text-off-white`,
    },
  };
}

export const futuristicTokenomicsStyle = getFuturisticTokenomicsStyle(1);
