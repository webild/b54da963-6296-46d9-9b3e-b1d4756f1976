'use client';

import React, { memo } from 'react';
import RetroText from './RetroText';
import SlideText from './SlideText';
import RotateText from './RotateText';
import HighlightText from './HighlightText';
import BlurText from './BlurText';
import ScaleText from './ScaleText';
import ExpandText from './ExpandText';
import FlipText from './FlipText';

interface AnimatedRetroTextProps {
    text: string;
    className?: string;
    animation?: 'slide' | 'rotate' | 'highlight' | 'blur' | 'scale' | 'expand' | 'flip' | 'none';
    shadowColor?: string;
    shadowOffset?: string;
    animationProps?: {
        duration?: number;
        stagger?: number;
        start?: string;
        end?: string;
        variant?: 'scrub' | 'trigger' | 'words-scrub' | 'words-trigger';
    };
    gradientColors?: {
        from: string;
        to: string;
    };
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const AnimatedRetroText = ({
    text,
    className = '',
    animation = 'none',
    shadowColor,
    shadowOffset,
    animationProps = {},
    as = 'h1'
}: AnimatedRetroTextProps) => {
    
    const retroText = (
        <RetroText
            text={text}
            className={className}
            shadowColor={shadowColor}
            shadowOffset={shadowOffset}
            as={as}
        />
    );
    
    switch (animation) {
        case 'slide':
            return <SlideText {...animationProps}>{retroText}</SlideText>;
        case 'rotate':
            return <RotateText text={text} />;
        case 'highlight':
            return <HighlightText text={text} {...animationProps} />;
        case 'blur':
            return <BlurText text={text} {...animationProps} />;
        case 'scale':
            return <ScaleText text={text} {...animationProps} />;
        case 'expand':
            return <ExpandText text={text} {...animationProps} />;
        case 'flip':
            return <FlipText text={text} {...animationProps} />;
        default:
            return retroText;
    }
};

AnimatedRetroText.displayName = 'AnimatedRetroText';

export default memo(AnimatedRetroText);