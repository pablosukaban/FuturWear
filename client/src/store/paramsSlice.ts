import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ColorResult } from 'react-color';

export interface ParamsState {
    intro: boolean;
    color: string | ColorResult;
    isLogoTexture: boolean;
    isFullTexture: boolean;
    logoDecal: string;
    fullDecal: string;
}

const initialState: ParamsState = {
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
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
    },
});
