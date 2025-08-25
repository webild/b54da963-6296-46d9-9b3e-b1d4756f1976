'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import UnderlineButton from '@/components/buttons/UnderlineButton';

interface FooterColumn {
    title: string;
    items: Array<{
        label: string;
        onClick?: () => void;
    }>;
}

interface SimpleFooterProps {
    logoSrc?: string;
    logoWidth?: number;
    logoHeight?: number;
    columns: FooterColumn[];
    copyrightText?: string;
    onPrivacyClick?: () => void;
    className?: string;
    containerClassName?: string;
    logoClassName?: string;
    columnsClassName?: string;
    columnClassName?: string;
    columnTitleClassName?: string;
    columnItemClassName?: string;
    copyrightContainerClassName?: string;
    copyrightTextClassName?: string;
    privacyButtonClassName?: string;
}

const SimpleFooter = memo<SimpleFooterProps>(function SimpleFooter({
    logoSrc = '/images/logo.svg',
    logoWidth = 120,
    logoHeight = 40,
    columns,
    copyrightText = `© 2025 | Webild`,
    onPrivacyClick,
    className = '',
    containerClassName = '',
    logoClassName = '',
    columnsClassName = '',
    columnClassName = '',
    columnTitleClassName = '',
    columnItemClassName = '',
    copyrightContainerClassName = '',
    copyrightTextClassName = '',
    privacyButtonClassName = ''
}) {
    return (
        <footer role="contentinfo" aria-label="Site footer" className={`relative overflow-hidden w-full bg-black text-white py-15  px-[var(--width-10)] ${className}`}>
            <div aria-hidden="true" className="absolute z-10 top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue to-transparent" />
            <div aria-hidden="true" className="absolute z-0 -top-1/2 -translate-y-1/2 left-0 w-full bg-blue/20 h-200 md:h-140 blur-2xl rounded-[100%]" ></div>
            <div className={`relative w-full max-w-[var(--width-100)] z-10 ${containerClassName}`}>
                <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-start mb-10">
                    <div className="flex-shrink-0">
                        <Image
                            src={logoSrc}
                            alt="Logo"
                            width={logoWidth}
                            height={logoHeight}
                            className={`object-contain ${logoClassName}`}
                        />
                    </div>

                    <div className={`w-full md:w-fit flex gap-[var(--width-10)] md:gap-[calc(var(--width-10)/2)] ${columnsClassName}`}>
                        {columns.map((column) => (
                            <div key={column.title} className={`flex items-start flex-col gap-4 ${columnClassName}`}>
                                <h3 className={`text-sm font-medium text-white/40 ${columnTitleClassName}`}>{column.title}</h3>
                                {column.items.map((item) => (
                                    <UnderlineButton
                                        key={item.label}
                                        text={item.label}
                                        onClick={item.onClick}
                                        className={`!text-base font-medium ${columnItemClassName}`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`w-full flex items-center justify-between pt-9 border-t border-white/20 ${copyrightContainerClassName}`}>
                    <span className={`text-white/40 text-sm ${copyrightTextClassName}`}>
                        {copyrightText}
                    </span>
                    <UnderlineButton
                        text="Privacy Policy"
                        onClick={onPrivacyClick}
                        className={`text-white/40 ${privacyButtonClassName}`}
                    />
                </div>
            </div>
        </footer>
    );
});

export default SimpleFooter;