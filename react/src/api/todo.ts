import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IEditTodo, IResponse } from './todo.type'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://to-dos-api.softclub.tj' }),
  tagTypes: ['Todos'],
  endpoints: (build) => ({
    getTodos: build.query<IResponse, null>({
      query: () => `/api/to-dos`,
      providesTags: ['Todos'],
    }),
    deleteTodo: build.mutation<IResponse, number>({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
    addTodo: build.mutation<IResponse, FormData>({
      query: (formData) => ({
        url: `/api/to-dos`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Todos'],
    }),
    editTodo: build.mutation<IResponse, IEditTodo>({
      query: (todo) => ({
        url: `/api/to-dos`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
})

export const { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useEditTodoMutation } = todoApi
