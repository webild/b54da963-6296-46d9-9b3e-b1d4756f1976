import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { SimpleHeroStyle } from "../types";

export function getFunAndTrendyHeroStyle(
  colorTemplate: ColorTemplate = 1
): SimpleHeroStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    navbar: {
      logoSrc: "/images/logowhite.svg",
      buttonBgColor: colors.button,
      buttonHoverBgColor: colors.buttonHover,
      buttonTextColor: "text-white",
      buttonHoverTextColor: colors.buttonHoverText,
      buttonContentClassName: `!text-2xl ${theme.text.headingClass} ${theme.fonts.body.className}`,
      className: `mx-auto w-full! bg-transparent! px-6 sm:px-[var(--width-10)]! shadow-none text-black left-1/2! top-4! -translate-x-1/2 ${theme.fonts.body.className} px-8 rounded-xl! py-4 `,
      buttonClassName: `h-11 px-8 ${theme.borders.button}`,
      logoClassName: "!h-8"
    },
    section: {
      className: `pt-25 pb-8 md:py-19 px-6 sm:px-[var(--width-10)] flex flex-col ${colors.primary}`,
      height: "h-svh md:h-screen",
      imageClassName: "border-4 border-white shadow-[6px_6px_0px_rgba(0,0,0)]",
      imageSrc: "/images/flokiplaceholder.png",
      imageContainerClassName: "w-full h-full absolute z-0",
      backgroundPattern: theme.backgrounds.texture,
    },
    overlayClassName: `bg-gradient-to-tr from-black md:from-black/80 via-black/50 md:via-black/30 to-transparent `,
    descriptions: {
      className: `${theme.text.white} ${theme.description.className}`,
      containerClassName: "flex flex-col gap-3 md:gap-4",
    },
    layout: {
      alignStart: true,
      descriptionClassName: "w-full",
      textboxClassName: "!gap-4 sm:!gap-5 !text-center md:!text-left",
      titleClassName: "!text-center md:!text-left",
    },
    title: {
      className: `text-5xl md:text-8xl !tracking-normal ${theme.text.headingClass} ${theme.text.white} ${theme.fonts.heading.className}`,
      useRetroText: true,
      animation: "slide",
      shadowOffset: theme.shadows.retro.offset,
      shadowColor: theme.shadows.retro.color,
      animationProps: {
        duration: theme.animations.duration,
        stagger: theme.animations.stagger,
        start: "top 80%",
        end: "top 20%",
        variant: theme.animations.variant,
      },
    },
    buttons: {
      buttonBgColor: colors.button,
      buttonHoverBgColor: colors.buttonHover,
      buttonTextColor: theme.text.white,
      buttonHoverTextColor:  colors.buttonHoverText,
      buttonClassName: `h-12 px-8 ${theme.borders.button}`,
      buttonContentClassName: `!text-base md:!text-xl ${theme.text.headingClass} ${theme.fonts.body.className}`,
    },
    secondaryButton: {
      buttonBgColor: "bg-white",
      buttonHoverBgColor: colors.buttonHover,
      buttonTextColor: "text-black",
      buttonHoverTextColor: colors.buttonHoverText,
      buttonClassName: `h-12 px-8 ${theme.borders.button}`,
      buttonContentClassName: `!text-base md:!text-xl ${theme.text.headingClass} ${theme.fonts.body.className}`,
    }
  };
}

export const funandtrendyStyle = getFunAndTrendyHeroStyle(1);
