import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://64af8b57c60b8f941af43343.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get('/contacts');
      return resp.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addTask',
  async (contact, thunkAPI) => {
    try {
      const resp = await axios.post('/contacts', contact);
      return resp.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const resp = await axios.delete(`/contacts/${taskId}`);
      return resp.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
