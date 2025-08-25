'use client';

import React, { memo } from 'react';
import UnderlineButton from '@/components/buttons/UnderlineButton';
import { ChevronRight } from 'lucide-react';
import FooterLogo from './FooterLogo';

interface FooterColumn {
    items: Array<{
        label: string;
        onClick?: () => void;
    }>;
}

interface LogoFooterProps {
    logoSrc?: string;
    logoAlt?: string;
    columns: FooterColumn[];
    logoText?: string;
    className?: string;
    containerClassName?: string;
    logoClassName?: string;
    columnsClassName?: string;
    columnClassName?: string;
    itemClassName?: string;
    iconClassName?: string;
    buttonClassName?: string;
}

const LogoFooter = memo<LogoFooterProps>(function LogoFooter({
    logoSrc,
    logoAlt = 'Logo',
    columns,
    logoText = 'Webild',
    className = '',
    containerClassName = '',
    logoClassName = '',
    columnsClassName = '',
    columnClassName = '',
    itemClassName = '',
    iconClassName = '',
    buttonClassName = ''
}) {

    return (
        <footer
            className={`w-full bg-white shadow text-black ${logoSrc ? 'py-15' : 'pt-0 pb-15'} rounded-t-[var(--width-10)] md:rounded-t-[calc(var(--width-10)/2)] px-[var(--width-10)] flex justify-center ${className}`}
            role="contentinfo"
            aria-label="Site footer"
        >
            <div className={`w-full max-w-[var(--width-100)] flex flex-col ${logoSrc ? 'gap-10 md:gap-20' : 'gap-0'} ${containerClassName}`}>
                <FooterLogo
                    logoSrc={logoSrc}
                    logoAlt={logoAlt}
                    logoText={logoText}
                    className={logoClassName}
                />

                <div className={`w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[var(--width-10)] md:gap-[calc(var(--width-10)/2)] mb-10 ${columnsClassName}`}>
                    {columns.map((column, index) => (
                        <div key={`column-${index}`} className={`flex items-start flex-col gap-4 ${columnClassName}`}>
                            {column.items.map((item) => (
                                <div key={`${item.label}-${index}`} className={`flex items-center gap-2 ${itemClassName}`}>
                                    <ChevronRight className={`h-[var(--text-base)] w-auto text-blue ${iconClassName}`} strokeWidth={3} />
                                    <UnderlineButton
                                        text={item.label}
                                        onClick={item.onClick}
                                        className={`!text-base font-medium ${buttonClassName}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
});

export default LogoFooter;