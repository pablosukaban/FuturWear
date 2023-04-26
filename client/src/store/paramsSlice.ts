import { createSlice } from '@reduxjs/toolkit';

export interface ParamsState {
    intro: boolean;
    color: string;
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
    reducers: {},
});
