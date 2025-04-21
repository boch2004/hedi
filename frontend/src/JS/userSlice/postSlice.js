import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/post"; // تحديد الـ API URL

// جلب كل المنشورات
export const getpost = createAsyncThunk("post/get", async (_, { rejectWithValue }) => {
    try {
        let response = await axios.get(`${API_URL}/`);
        return response.data.posts; // تأكد أن الـ API يعيد كائن يحتوي على `posts`
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching posts");
    }
});

// إضافة منشور جديد
export const addpost = createAsyncThunk("post/add", async (newpost, { rejectWithValue }) => {
    try {
        let response = await axios.post(`${API_URL}/add`, newpost);
        console.log("Response:", response.data);
        return response.data.post;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error adding post");
    }
});

// حذف منشور
export const deletepost = createAsyncThunk("post/delete", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id; // نرجع ID حتى نحذفه من الحالة
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error deleting post");
    }
});

// تعديل منشور
export const editpost = createAsyncThunk("post/edit", async ({ id, edited }, { rejectWithValue }) => {
    try {
        let response = await axios.put(`${API_URL}/${id}`, edited);
        console.log("Response:", response.data);
        return response.data.post;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error editing post");
    }
});

// الحالة الابتدائية
const initialState = {
    postlist: [],
    status: "idle",
    error: null,
};

// إنشاء Slice لـ posts
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // جلب المنشورات
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

            // إضافة منشور
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

            // حذف منشور
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

            // تعديل منشور
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

// تصدير الـ Reducer
export default postSlice.reducer;
