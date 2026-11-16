import { todoApi } from '@/api/todo'
import counterSlice from '@/reducers/counter'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todo: counterSlice,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
