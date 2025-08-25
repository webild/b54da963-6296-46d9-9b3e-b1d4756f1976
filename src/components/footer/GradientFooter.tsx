'use client';

import React, { memo } from 'react';
import UnderlineButton from '@/components/buttons/UnderlineButton';
import FooterLogo from './FooterLogo';

interface FooterItem {
    label: string;
    onClick?: () => void;
}

interface GradientFooterProps {
    logoSrc?: string;
    logoAlt?: string;
    logoText?: string;
    items?: FooterItem[];
    className?: string;
    containerClassName?: string;
    gradientClassName?: string;
    logoClassName?: string;
    itemsClassName?: string;
    itemClassName?: string;
    buttonClassName?: string;
}

const GradientFooter = memo<GradientFooterProps>(function GradientFooter({
    logoSrc,
    logoAlt = 'Logo',
    logoText = 'Webild',
    items = [],
    className = '',
    containerClassName = '',
    gradientClassName = '',
    logoClassName = '',
    itemsClassName = '',
    itemClassName = '',
    buttonClassName = ''
}) {

    return (
        <footer
            className={`relative overflow-hidden w-full bg-black shadow text-white ${logoSrc ? 'py-0 pt-20 pb-10' : 'pt-30 md:pt-0 pb-10'} px-[var(--width-10)] flex justify-center ${className}`}
            role="contentinfo"
            aria-label="Site footer"
        >
            <div className="absolute top-0 left-0 w-full h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 100%)' }}>
                <div className={`absolute z-0 -bottom-1/2 translate-y-[30%] left-0 w-[150%] md:w-[125%] -rotate-15 h-140 md:h-240 blur-2xl rounded-[100%] bg-gradient-to-r from-purple-600 via-blue to-orange-400 opacity-30 ${gradientClassName}`} />
            </div>
            <div className={`relative w-full max-w-[var(--width-100)] z-10 flex flex-col-reverse md:flex-col ${logoSrc ? 'gap-5 md:gap-10' : 'gap-0 md:gap-5'} ${containerClassName}`}>
                <FooterLogo
                    logoSrc={logoSrc}
                    logoAlt={logoAlt}
                    logoText={logoText}
                    svgClassName="-mb-10"
                    className={logoClassName}
                />

                <div className={`grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 ${itemsClassName}`}>
                    {items.map((item, index) => (
                        <div key={`${item.label}-${index}`} className={`flex items-center justify-center text-center ${itemClassName}`}>
                            <UnderlineButton
                                text={item.label}
                                onClick={item.onClick}
                                className={`!text-base font-medium !w-fit text-white/50 ${buttonClassName}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
});

export default GradientFooter;