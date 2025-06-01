import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://back-adoption-production.up.railway.app/post"; 

// Get post 
export const getpost = createAsyncThunk("post/get", async (_, { rejectWithValue }) => {
    try {
        let response = await axios.get(`${API_URL}/`);
        return response.data.posts; 
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching posts");
    }
});

// ADD post
export const addpost = createAsyncThunk("post/add", async (newpost, { rejectWithValue }) => {
    try {
        let response = await axios.post(`${API_URL}/add`, newpost);
        console.log("Response:", response.data);
        return response.data.post;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error adding post");
    }
});

// Delete animal
export const deletepost = createAsyncThunk("post/delete", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id; 
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error deleting post");
    }
});

// modifier le post ( put )
export const editpost = createAsyncThunk("post/edit", async ({ id, edited }, { rejectWithValue }) => {
    try {
        let response = await axios.put(`${API_URL}/${id}`, edited);
        console.log("Response:", response.data);
        return response.data.post;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error editing post");
    }
});

// 1st time 
const initialState = {
    postlist: [],
    status: "idle",
    error: null,
};

// creation des slices 
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get post 
            .addCase(getpost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getpost.fulfilled, (state, action) => {
                state.status = "success";
                state.postlist = action.payload;
            })
            .addCase(getpost.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.payload;
            })

            // Add post  
            .addCase(addpost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addpost.fulfilled, (state, action) => {
                state.status = "success";
                state.postlist.push(action.payload);
            })
            .addCase(addpost.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.payload;
            })

            // delete a post  
            .addCase(deletepost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletepost.fulfilled, (state, action) => {
                state.status = "success";
                state.postlist = state.postlist.filter(post => post._id !== action.payload);
            })
            .addCase(deletepost.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.payload;
            })

            // modifier post 
            .addCase(editpost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editpost.fulfilled, (state, action) => {
                state.status = "success";
                state.postlist = state.postlist.map(post =>
                    post._id === action.payload._id ? action.payload : post
                );
            })
            .addCase(editpost.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.payload;
            });
    },
});


export default postSlice.reducer;