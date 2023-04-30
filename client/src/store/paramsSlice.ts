import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorResult } from 'react-color';
import { FilterTabsNames } from '../config/constants';

export interface ParamsState {
    intro: boolean;
    color: string | ColorResult;
    isLogoTexture: boolean;
    isFullTexture: boolean;
    logoDecal: string | File | null;
    fullDecal: string | File | null;
}

const initialState: ParamsState = {
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './maxim2.jpg',
    fullDecal: './maxim2.jpg',
};

export const paramsSlice = createSlice({
    name: 'paramsSlice',
    initialState,
    reducers: {
        changeIntro: (state, action: PayloadAction<boolean>) => {
            state.intro = action.payload;
        },
        changeColor: (state, action: PayloadAction<ColorResult | string>) => {
            state.color = action.payload;
        },
        changeActiveFilterTab: (
            state,
            action: PayloadAction<FilterTabsNames>
        ) => {
            if (action.payload === 'logoShirt') {
                state.isLogoTexture = !state.isLogoTexture;
                state.isFullTexture = false;
            } else {
                state.isLogoTexture = false;
                state.isFullTexture = !state.isFullTexture;
            }
        },
        changelogoDecal: (state, action: PayloadAction<File>) => {
            if (!action.payload) return;
            state.logoDecal = action.payload;
        },
        changeFullDecal: (state, action: PayloadAction<File>) => {
            if (!action.payload) return;
            state.fullDecal = action.payload;
        },
    },
});
