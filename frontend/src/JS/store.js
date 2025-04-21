import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice/userSlice'
import  animalSlice from './userSlice/animalSlice'
import  postSlice  from './userSlice/postSlice'
import  favorisSlice  from './userSlice/favorisslice'

export const store = configureStore({
  reducer: {
    user:userSlice,
    animal:animalSlice,
    post:postSlice,
    favoris:favorisSlice

  },
})