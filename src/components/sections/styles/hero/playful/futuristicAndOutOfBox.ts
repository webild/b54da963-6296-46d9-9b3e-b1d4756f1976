import { HeroStyle } from '../types';
import { futuristicTheme as theme } from '../../shared/themes';
import { ColorTemplate } from '../../shared/themeConfig';
import { getFuturisticColors } from '../../shared/themeConfig';

export function getFuturisticHeroStyle(colorTemplate: ColorTemplate = 1): HeroStyle {
    const colors = getFuturisticColors(colorTemplate);

    const sideGlowGradient = {
        radialColor: theme.backgrounds.gradient.radialColor,
        linearColor: colors.gradientLinear,
        radialOpacity: theme.backgrounds.gradient.radialOpacity,
        linearOpacity: theme.backgrounds.gradient.linearOpacity
    };

    return {
        navbar: {
            logoSrc: "/images/logowhite.svg",
            buttonBgColor: theme.buttons.primary.base,
            buttonHoverBgColor: theme.buttons.primary.hover,
            buttonTextColor: theme.buttons.primary.text,
            buttonHoverTextColor: theme.buttons.primary.hoverText,
            buttonClassName: theme.buttons.primary.className,
            buttonContentClassName: theme.buttons.primary.contentClassName,
            className: "top-8",
            logoClassName: "h-8"
        },
        section: {
            className: colors.primary,
            height: "h-svh md:h-screen",
            contentAlignment: "items-center",
            sideGlowGradient: sideGlowGradient,
            textContainerClassName: `${theme.text.white} ${theme.fonts.heading.className}`,
            gapClassName: theme.spacing.gap,
            sparkles: {
                particleColor: '#ffffff',
                particleDensity: 80,
                minSize: 0.5,
                maxSize: 1.5,
                speed: 2
            }
        },
        heading: {
            className: `text-9xl md:text-[clamp(3rem,12.5vw,12.5rem)] !tracking-tight font-extrabold leading-[1.1] mt-[-5%] ${theme.fonts.heading.className}`,
            useRetroText: false,
            animationProps: {
                duration: theme.animations.duration,
                stagger: theme.animations.stagger,
                start: 'top 80%',
                end: 'top 20%',
                variant: theme.animations.variant
            },
            gradientColors: theme.gradients.text
        },
        subheading: {
            className: `md:max-w-[55%] leading-[1.2] ${theme.description.className}`
        }
    };
}

export const futuristicandoutofboxStyle = getFuturisticHeroStyle(1);