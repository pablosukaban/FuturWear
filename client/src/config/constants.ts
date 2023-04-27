// import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets';

import swatch from '../assets/swatch.png';
import fileIcon from '../assets/file.png';
import ai from '../assets/ai.png';
import logoShirt from '../assets/logo-tshirt.png';
import stylishShirt from '../assets/stylish-tshirt.png';

export type TabType = {
    name: string;
    icon: string;
};

export const EditorTabs: TabType[] = [
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

export const FilterTabs: TabType[] = [
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
