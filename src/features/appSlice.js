import {  createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState:{
    user:null,
    selectedImage:null,
  },
  reducers: {
    
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state)=>{
      state.user = null;
    },
    selectImage: (state,action)=>{
      state.selectedImage = action.payload;
    },
    resetCameraImage:(state)=>{
      state.selectedImage = null;
    },
  }    
});

export const {  login,logout,selectImage,resetCameraImage } = appSlice.actions;
export const selectUser = state => state.app.user;
export const selectSelectImage = state => state.app.selectedImage;
export default appSlice.reducer;
