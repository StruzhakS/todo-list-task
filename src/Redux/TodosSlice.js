import { createSlice } from '@reduxjs/toolkit';

import { getAllTodosOperation } from './Operations';

export const todosSlice = createSlice({
  name: 'Todos',
  initialState: {
    todos: [],
    filter: 'all',
    isLoading: false,
    error: '',
  },
  reducers: {
    // filterTodos: (state, action) => ({
    //   ...state,
    //   filter: action.payload,
    // }),

    addNewTodo: (state, action) => ({ ...state, todos: [action.payload, ...state.todos] }),

    updateTodoById: (state, action) => {
      const findUpdateTodoIndex = state.todos.findIndex(el => el.id === action.payload.id);
      state.todos[findUpdateTodoIndex] = action.payload;
    },

    deleteTodoById: (state, action) => ({
      ...state,
      todos: state.todos.filter(el => el.id !== action.payload),
    }),
  },
  extraReducers: builder => {
    if (JSON.parse(localStorage.getItem('persist:root'))?.todos?.length <= 2) {
      return builder
        .addCase(getAllTodosOperation.pending, state => {
          state.isLoading = true;
        })
        .addCase(getAllTodosOperation.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.error = null;
          state.todos = payload;
        })
        .addCase(getAllTodosOperation.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        });
    }
  },
});

export const todoReducer = todosSlice.reducer;
export const { addNewTodo, deleteTodoById, updateTodoById } = todosSlice.actions;
