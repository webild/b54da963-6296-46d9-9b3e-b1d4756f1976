"use client";
import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { useLenis } from 'lenis/react';
import StaggerButton from '../buttons/staggerButton/StaggerButton';
import UnderlineButton from '../buttons/UnderlineButton';
import { useScrollDetection } from './floatingNavbar/useScrollDetection';
import { NavItem } from '@/types/navigation';

interface SimpleFloatingNavbarProps {
    navItems: NavItem[];
    logoSrc?: string;
    logoWidth?: number;
    logoHeight?: number;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
}

const SimpleFloatingNavbar = memo<SimpleFloatingNavbarProps>(function SimpleFloatingNavbar({
    navItems,
    logoSrc = "/images/logo.svg",
    logoWidth = 120,
    logoHeight = 40,
    buttonText = "Join Now",
    onButtonClick = () => {},
    className = ""
}) {
    const lenis = useLenis();
    const isScrolled = useScrollDetection(50);

    const handleNavClick = useCallback((id: string) => {
        if (id && lenis) {
            lenis.scrollTo(`#${id}`);
        }
    }, [lenis]);

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className={`
                fixed z-[100] flex items-center justify-between
                top-6 left-[var(--width-10)] w-80
                bg-white shadow
                rounded-full
                p-3
                pl-6
                h-fit
                transition-all duration-500 ease-in-out
                ${isScrolled ? '' : ''}
                ${className}
            `}
        >
            <Image
                src={logoSrc}
                width={logoWidth}
                height={logoHeight}
                className="h-[var(--text-xl)] w-auto"
                alt="Company Logo"
                priority
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-6 items-center">
                {navItems.map((item, index) => (
                    <UnderlineButton
                        key={index}
                        text={item.name}
                        onClick={() => handleNavClick(item.id)}
                        className="!text-base"
                        aria-label={`Navigate to ${item.name}`}
                    />
                ))}
            </div>
            
            <StaggerButton
                text={buttonText}
                onClick={onButtonClick}
                className="relative !text-white px-6 h-10 z-[100]"
                bgClassName="rounded-full !bg-black"
                aria-label={buttonText}
            />
        </nav>
    );
});

export default SimpleFloatingNavbar;