import {createSelector} from "@reduxjs/toolkit";

export const hokhauSelector = (state) => state.hokhau.listHokhau ;
export const nhankhauSelector = (state) => state.nhankhau.listNhankhau;
export const tokenSelector = (state) => state.authen.accessToken ;
