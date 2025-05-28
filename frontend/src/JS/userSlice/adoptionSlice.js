import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// envoie d'une demande d'adoption 
export const submitAdoptionRequest = createAsyncThunk(
  "adoption/submitAdoptionRequest",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/adoption", formData); //envoie des données au back
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Erreur lors de l'envoi"
      );
    }
  }
);

// Get adoptions
export const fetchAdoptionRequests = createAsyncThunk(
  "adoption/fetchAdoptionRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/adoption");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Erreur lors du chargement"
      );
    }
  }
);

// supprimer une demande
export const deleteAdoptionRequest = createAsyncThunk(
  'adoption/deleteAdoptionRequest',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/adoption/${id}`);
      return id;
    } catch (error) {
      console.error("Error delete:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Erreur inconnue"
      );
    }
  }
);
export const updateAdoptionStatus = createAsyncThunk(
  "adoption/updateAdoptionStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/adoption/status/${id}`, { status });
      return res.data.updatedRequest; // حسب الرد اللي في الباك
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Erreur lors de la mise à jour"
      );
    }
  }
);

//1st time 
const adoptionSlice = createSlice({
  name: "adoption",
  initialState: {
    loading: false,
    success: false,
    error: null,
    requests: [],
  },
  reducers: {
    resetAdoptionState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  //les situations 
  extraReducers: (builder) => {
    builder
      .addCase(submitAdoptionRequest.pending, (state) => { //l'operation est en cours
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitAdoptionRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.requests.push(action.payload);
      })
      .addCase(submitAdoptionRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdoptionRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdoptionRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchAdoptionRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAdoptionRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdoptionRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter(r => r._id !== action.payload);
      })
      .addCase(deleteAdoptionRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(updateAdoptionStatus.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(updateAdoptionStatus.fulfilled, (state, action) => {
    state.loading = false;
    // نبدل العنصر اللي في requests حسب id
    const index = state.requests.findIndex(r => r._id === action.payload._id);
    if (index !== -1) {
      state.requests[index] = action.payload;
    }
  })
  .addCase(updateAdoptionStatus.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  },
});

export const { resetAdoptionState } = adoptionSlice.actions;
export default adoptionSlice.reducer;
