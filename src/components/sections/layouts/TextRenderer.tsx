'use client';

import React, { memo } from 'react';
import AnimatedRetroText from '@/components/text/AnimatedRetroText';
import SlideText from '@/components/text/SlideText';
import { BaseTextConfig } from '@/components/sections/styles/shared/types';

interface TextRendererProps {
    config: BaseTextConfig;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const TextRenderer = ({ config, as = 'h2' }: TextRendererProps) => {
    if (!config || !config.text) return null;
    
    if (config.useRetroText === false) {
        return (
            <SlideText
                text={config.text}
                className={config.className}
                variant={config.animationProps?.variant}
                duration={config.animationProps?.duration}
                stagger={config.animationProps?.stagger}
                start={config.animationProps?.start}
                end={config.animationProps?.end}
                gradientColors={config.gradientColors}
            />
        );
    }
    
    return (
        <AnimatedRetroText
            text={config.text}
            className={config.className}
            animation={config.animation}
            shadowColor={config.shadowColor}
            shadowOffset={config.shadowOffset}
            animationProps={config.animationProps}
            as={as}
        />
    );
};

TextRenderer.displayName = 'TextRenderer';

export default memo(TextRenderer);