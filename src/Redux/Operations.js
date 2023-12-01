import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllTodos } from '../Services/TodoApi';

export const getAllTodosOperation = createAsyncThunk('Todos/getAll', async (_, thunkAPI) => {
  try {
    const data = await fetchAllTodos();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
