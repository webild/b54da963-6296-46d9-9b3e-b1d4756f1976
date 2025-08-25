export type ColorTemplate = 1 | 2;

export interface ColorThemeProps {
    colorTemplate?: ColorTemplate;
}

export const funAndTrendyColors = {
    1: {
        primary: 'bg-fun-template-1-primary',
        secondary: 'bg-fun-template-1-secondary', 
        tertiary: 'bg-fun-template-1-tertiary',
        button: 'bg-fun-template-1-button',
        buttonHover: 'after:bg-fun-template-1-button-hover',
        buttonHoverText: 'after:text-fun-template-1-button-hover-text'
    },
    2: {
        primary: 'bg-fun-template-2-primary',
        secondary: 'bg-fun-template-2-secondary',
        tertiary: 'bg-fun-template-2-tertiary',
        button: 'bg-fun-template-2-button',
        buttonHover: 'after:bg-fun-template-2-button-hover',
        buttonHoverText: 'after:text-fun-template-2-button-hover-text'
    }
} as const;

export const futuristicColors = {
    1: {
        primary: 'bg-futuristic-template-1-primary',
        gradientLinear: 'var(--color-futuristic-template-1-gradient-linear)',
        cardBg: 'futuristic-template-1-card-bg',
        spotlight: 'var(--color-futuristic-template-1-spotlight)',
        primaryButtonBg: 'bg-futuristic-template-1-button',
        primaryButtonHover: 'after:bg-futuristic-template-1-button-hover',
        primaryButtonHoverText: 'after:text-futuristic-template-1-button-hover-text',
        secondaryButtonHover: 'after:bg-futuristic-template-1-primary',
        tagText: 'text-futuristic-template-1-tag-text'
    },
    2: {
        primary: 'bg-futuristic-template-2-primary',
        gradientLinear: 'var(--color-futuristic-template-2-gradient-linear)',
        cardBg: 'futuristic-template-2-card-bg',
        spotlight: 'var(--color-futuristic-template-2-spotlight)',
        primaryButtonBg: 'bg-futuristic-template-2-button',
        primaryButtonHover: 'after:bg-futuristic-template-2-button-hover',
        primaryButtonHoverText: 'after:text-futuristic-template-2-button-hover-text',
        secondaryButtonHover: 'after:bg-futuristic-template-2-primary',
        tagText: 'text-futuristic-template-2-tag-text'
    }
} as const;

export function getFunAndTrendyColors(template: ColorTemplate) {
    return funAndTrendyColors[template];
}

export function getFuturisticColors(template: ColorTemplate) {
    return futuristicColors[template];
}