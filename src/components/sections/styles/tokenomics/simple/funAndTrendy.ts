import { TokenomicsStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyTokenomicsStyle(
  colorTemplate: ColorTemplate = 1
): TokenomicsStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: `${theme.spacing.sectionPadding} ${theme.borders.section}`,
      backgroundColor: colors.secondary,
      backgroundPattern: theme.backgrounds.texture,
    },
    title: {
      className: `${theme.heading.sizes.hero} leading-none uppercase tracking-tight mb-6 ${theme.text.headingClass} ${theme.text.white} ${theme.heading.className}`,
      shadowOffset: theme.shadows.retro.offset,
      useRetroText: true,
      animation: "slide",
      shadowColor: theme.shadows.retro.color,
      animationProps: {
        duration: theme.animations.duration,
        stagger: theme.animations.stagger,
        start: "top 80%",
        end: "top 20%",
        variant: theme.animations.variant,
      },
    },
    description: {
      className: `${theme.text.white} ${theme.description.className} !text-black ${theme.text.bodyClass}`,
    },
    bento: {
      items: [],
      className: "!mt-0",
      gridClassName: "gap-3 md:gap-5",
      itemClassName: "bg-white border-4 rounded-2xl !gap-14",
      valueClassName: `${theme.tokenomics.value.large} font-bold ${theme.heading.className}`,
      descriptionClassName: `${theme.tokenomics.description.small} font-medium ${theme.description.className}`,
    },
  };
}

export const funAndTrendyTokenomicsStyle = getFunAndTrendyTokenomicsStyle(1);
