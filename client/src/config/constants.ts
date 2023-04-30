// import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets';

import swatch from '../assets/swatch.png';
import fileIcon from '../assets/file.png';
import ai from '../assets/ai.png';
import logoShirt from '../assets/logo-tshirt.png';
import stylishShirt from '../assets/stylish-tshirt.png';

export type EditorTabsNames = 'colorpicker' | 'filepicker' | 'aipicker';
export type FilterTabsNames = 'logoShirt' | 'stylishShirt';

export type EditorTabType = {
    name: EditorTabsNames;
    icon: string;
};

export type FilterTabType = {
    name: FilterTabsNames;
    icon: string;
};

export const EditorTabs: EditorTabType[] = [
    {
        name: 'colorpicker',
        icon: swatch,
    },
    {
        name: 'filepicker',
        icon: fileIcon,
    },
    {
        name: 'aipicker',
        icon: ai,
    },
];

export const FilterTabs: FilterTabType[] = [
    {
        name: 'logoShirt',
        icon: logoShirt,
    },
    {
        name: 'stylishShirt',
        icon: stylishShirt,
    },
];

export const DecalTypes = {
    logo: {
        stateProperty: 'logoDecal',
        filterTab: 'logoShirt',
    },
    full: {
        stateProperty: 'fullDecal',
        filterTab: 'stylishShirt',
    },
};
