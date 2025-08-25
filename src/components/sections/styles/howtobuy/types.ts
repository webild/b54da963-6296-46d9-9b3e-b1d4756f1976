import { BentoItem } from '@/components/bento/threeDBento/constants';
import { BaseSection, BaseTextConfig } from '../shared/types';

export interface BentoConfig {
    items?: BentoItem[];
    className?: string;
    gridClassName?: string;
    itemClassName?: string;
    imageContainerClassName?: string;
    imageClassName?: string;
    textContainerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    enableAnimation?: boolean;
}

export interface HowToBuyStyle {
    section: BaseSection;
    title: BaseTextConfig;
    bento: BentoConfig;
}