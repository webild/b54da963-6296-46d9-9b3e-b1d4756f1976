import { TechyHeroStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate, getFuturisticColors } from "../../shared/themeConfig";


export function getTechyFuturisticHeroStyle(
  colorTemplate: ColorTemplate = 1
): TechyHeroStyle {
  const colors = getFuturisticColors(colorTemplate);

  const buttonBase = {
    className: "w-full sm:w-auto px-10",
  };

  const animationProps = {
    variant: "trigger" as const,
  };

  return {
    navbar: {
      logoSrc: "/images/logowhite.svg",
      className: `mx-auto w-full! px-6 sm:px-[var(--width-10)]! bg-transparent! backdrop-blur-3xl shadow-none text-black left-1/2! top-4! -translate-x-1/2 ${theme.fonts.body.className} px-8 rounded-xl! py-4`,
      buttonBgColor: theme.buttons.primary.base,
      buttonHoverBgColor: theme.buttons.primary.hover,
      buttonTextColor: theme.buttons.primary.text,
      buttonHoverTextColor: theme.buttons.primary.hoverText,
      buttonClassName: theme.buttons.primary.className,
      buttonContentClassName: theme.buttons.primary.contentClassName,
    },
    section: {
      className: colors.primary,
      height: "h-svh md:h-screen",
    },
    heading: {
      className: `font-medium! md:text-7xl text-4xl mt-4 mx-auto tracking-tight ${theme.fonts.heading.className}`,
    },
    subheading: {
      className: `${theme.description.className} my-4 leading-5 md:leading-8 md:max-w-[var(--width-40)] mx-auto`,
    },
    radialGradient: {
      color: colors.gradientLinear,
    },
    tag: {
      labelClassName: `font-normal!`,
      className: `mx-auto py-2 font-normal! rounded-full bg-white/5 backdrop-blur-md px-4 text-grey ${theme.borders.button}`,
    },
    title: {
      className: `font-medium! md:text-7xl text-4xl mt-4 mx-auto tracking-tight ${theme.fonts.heading.className}`,
      useRetroText: false,
      animationProps,
      gradientColors: theme.gradients.text,
    },
    description: {
      className: `${theme.description.className} my-4 leading-5 md:leading-8 md:max-w-[var(--width-40)] mx-auto`,
      useRetroText: false,
      animationProps,
    },
    buttons: {
      primary: {
        ...buttonBase,
        buttonBgColor: theme.buttons.primary.base,
        buttonHoverBgColor: theme.buttons.primary.hover,
        className: `${theme.buttons.primary.text} ${theme.buttons.primary.className}`,
        buttonTextColor: theme.buttons.primary.text,
        buttonHoverTextColor: theme.buttons.primary.hoverText,
        buttonClassName: theme.buttons.primary.className,
        buttonContentClassName: theme.buttons.primary.contentClassName,
      },
      secondary: {
        ...buttonBase,
        buttonTextColor: theme.buttons.secondary.text,
        buttonHoverTextColor: theme.buttons.secondary.hoverText,
        buttonClassName: theme.buttons.secondary.className,
        buttonContentClassName: theme.buttons.secondary.contentClassName,
        buttonBgColor: theme.buttons.secondary.base,
        buttonHoverBgColor: colors.secondaryButtonHover,
        className: `${theme.buttons.secondary.text} ${theme.buttons.secondary.className}`,
      },
    },
  };
}
