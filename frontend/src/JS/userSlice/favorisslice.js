import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Get favoris
export const getfavoris = createAsyncThunk("favoris/get", async () => {
    try {
        let result = await axios.get("http://localhost:5000/favoris/");
        return result.data.favoris; 
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// Add favoris
export const addfavoris = createAsyncThunk("favoris/add", async (newfavoris) => {
    try {
        let result = await axios.post("http://localhost:5000/favoris/add", newfavoris);
        console.log("Response:", result);
        return result.data.favoris; 
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// Delete favoris
export const deletefavoris = createAsyncThunk("favoris/delete", async (id) => {
    try {
        let result = await axios.delete(`http://localhost:5000/favoris/${id}`);
        console.log("Response:", result);
        return id; 
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// Edit favoris
export const editfavoris = createAsyncThunk("favoris/edit", async ({ id, edited }) => {
    try {
        let result = await axios.put(`http://localhost:5000/favoris/${id}`, edited);
        console.log("Response:", result);
        return result.data.updatedFavoris; 
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    favorislist: [],
    status: null,
};

export const favorisSlice = createSlice({
    name: 'favoris',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addfavoris.fulfilled, (state, action) => {
                state.status = "success";
                state.favorislist.push(action.payload);  
            })
            .addCase(deletefavoris.fulfilled, (state, action) => {
                state.status = "success";
                const id = action.payload; 
                state.favorislist = state.favorislist.filter(f => f._id !== id);
            })
            .addCase(getfavoris.fulfilled, (state, action) => {
                state.status = "success";
                state.favorislist = action.payload;
            })
            .addCase(editfavoris.fulfilled, (state, action) => {
                state.status = "success";
                const updated = action.payload; 
                const index = state.favorislist.findIndex(f => f._id === updated._id);
                if (index !== -1) {
                    state.favorislist[index] = updated;
                }
            });
    },
});

export default favorisSlice.reducer;
