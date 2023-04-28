import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorResult } from 'react-color';

export interface ParamsState {
    intro: boolean;
    color: string | ColorResult;
    isLogoTexture: boolean;
    isFullTexture: boolean;
    logoDecal: string | null;
    fullDecal: string | null;
}

const initialState: ParamsState = {
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './maxim.jpg',
    fullDecal: './maxim.jpg',
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
        changeActiveFilterTab: (state, action: PayloadAction<string>) => {
            if (action.payload === 'logoShirt') {
                state.isLogoTexture = !state.isLogoTexture;
                state.isFullTexture = false;
            } else {
                state.isLogoTexture = false;
                state.isFullTexture = !state.isFullTexture;
            }
        },
        changeDecal: (
            state,
            action: PayloadAction<{ stateProperty: string; result: string }>
        ) => {
            if (action.payload.stateProperty === 'logo') {
                state.logoDecal = action.payload.result;
            } else {
                state.fullDecal = action.payload.result;
            }
        },
    },
});
