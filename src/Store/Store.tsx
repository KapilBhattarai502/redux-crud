import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/UserSlice/UserSlice'
import drawerReducer from '../features/DrawerSlice/DrawerSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    drawer:drawerReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;