import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import { SimpleHeroStyle } from "../types";

export function getFuturisticHeroStyle(
  colorTemplate: ColorTemplate = 1
): SimpleHeroStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    navbar: {
      logoSrc: "/images/logowhite.svg",
      className: `mx-auto !w-full px-6 !sm:px-[var(--width-10)] !bg-transparent backdrop-blur-3xl shadow-none text-black !left-1/2 !top-4 -translate-x-1/2 ${theme.fonts.body.className} px-8 !rounded-xl py-4`,
      buttonBgColor: theme.buttons.primary.base,
      buttonHoverBgColor: theme.buttons.primary.hover,
      buttonTextColor: theme.buttons.primary.text,
      buttonHoverTextColor: theme.buttons.primary.hoverText,
      buttonClassName: theme.buttons.primary.className,
      buttonContentClassName: theme.buttons.primary.contentClassName,
    },
    section: {
      className: `pt-22 pb-8 md:py-19 px-6 sm:px-[var(--width-10)] flex flex-col ${colors.primary}`,
      height: "h-svh md:h-screen",
      imageSrc: "/images/flokiplaceholder.png",
      imageContainerClassName: `w-full h-full !absolute !z-0 ${colors.cardBg} futuristic-card-border !rounded-md p-4 md:p-6`,
      // Optional
      // sideGlowGradient: {
      //   radialColor: theme.backgrounds.gradient.radialColor,
      //   linearColor: colors.gradientLinear,
      //   radialOpacity: theme.backgrounds.gradient.radialOpacity,
      //   linearOpacity: theme.backgrounds.gradient.linearOpacity,
      // },
      sparkles: {
        particleColor: "#ffffff",
        particleDensity: 80,
        minSize: 0.5,
        maxSize: 1.5,
        speed: 2,
      },
    },
    title: {
      className: `text-5xl md:text-7xl !text-white ${theme.text.headingClass} !font-bold ${theme.fonts.heading.className}`,
      useRetroText: false,
      animationProps: {
        duration: theme.animations.duration,
        stagger: 0.1,
        start: "top 80%",
        end: "top 20%",
        variant: "words-trigger" as const,
      },
      gradientColors: theme.gradients.text,
    },
    overlayClassName: `bg-gradient-to-tr from-black md:from-black/80 via-black/50  !inset-4 md:!inset-6`,
    descriptions: {
      className: theme.description.className,
      containerClassName: "flex flex-col gap-3 md:gap-4",
    },
    layout: {
      alignStart: true,
      descriptionClassName: "w-full",
      textboxClassName: "!gap-4 sm:!gap-5 !text-center md:!text-left",
      titleClassName: "!text-center md:!text-left",
    },
    buttons: {
      buttonBgColor: theme.buttons.primary.base,
      buttonHoverBgColor: theme.buttons.primary.hover,
      buttonTextColor: theme.buttons.primary.text,
      buttonHoverTextColor: theme.buttons.primary.hoverText,
      buttonClassName: theme.buttons.primary.className,
      buttonContentClassName: theme.buttons.primary.contentClassName,
    },
    secondaryButton: {
      buttonBgColor: theme.buttons.secondary.base,
      buttonHoverBgColor: colors.secondaryButtonHover,
      buttonTextColor: theme.buttons.secondary.text,
      buttonHoverTextColor: theme.buttons.secondary.hoverText,
      buttonClassName: theme.buttons.secondary.className,
      buttonContentClassName: theme.buttons.secondary.contentClassName,
    }
  };
}

export const futuristicAndOutOfBoxStyle = getFuturisticHeroStyle(1);
