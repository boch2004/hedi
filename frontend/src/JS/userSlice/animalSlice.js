import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/animals"; // ✅ تصحيح الرابط

// ✅ جلب كل الحيوانات
export const getanimal = createAsyncThunk("animal/get", async (_, { rejectWithValue }) => {
    try {
        let response = await axios.get(`${API_URL}/`);
        return response.data.animals;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "Error fetching animals");
    }
});

// ✅ إضافة حيوان جديد
export const addanimal = createAsyncThunk("animal/add", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.animal;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Error adding animal");
    }
  });
  

// ✅ حذف حيوان
export const deleteanimal = createAsyncThunk("animal/delete", async (id, { rejectWithValue }) => {
    try {
        let response = await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "Error deleting animal");
    }
});

// ✅ تعديل حيوان
export const editanimal = createAsyncThunk("animal/edit", async ({ id, edited }, { rejectWithValue }) => {
    try {
        let response = await axios.put(`${API_URL}/${id}`, edited);
        return response.data.animal;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "Error editing animal");
    }
});

// ✅ الحالة الابتدائية
const initialState = {
    animalList: [],
    status: "idle",
    error: null,
};

// ✅ دالة لتحديث حالة الطلبات
const setStatus = (state, status, error = null) => {
    state.status = status;
    state.error = error;
};

export const animalSlice = createSlice({
    name: "animal",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ جلب الحيوانات
            .addCase(getanimal.pending, (state) => setStatus(state, "loading"))
            .addCase(getanimal.fulfilled, (state, action) => {
                setStatus(state, "success");
                state.animalList = action.payload;
            })
            .addCase(getanimal.rejected, (state, action) => setStatus(state, "fail", action.payload))

            // ✅ إضافة حيوان
            .addCase(addanimal.pending, (state) => setStatus(state, "loading"))
            .addCase(addanimal.fulfilled, (state, action) => {
                setStatus(state, "success");
                if (action.payload) state.animalList.push(action.payload);
            })
            .addCase(addanimal.rejected, (state, action) => setStatus(state, "fail", action.payload))

            // ✅ حذف حيوان
            .addCase(deleteanimal.pending, (state) => setStatus(state, "loading"))
            .addCase(deleteanimal.fulfilled, (state, action) => {
                setStatus(state, "success");
                state.animalList = state.animalList.filter(animal => animal._id !== action.payload);
            })
            .addCase(deleteanimal.rejected, (state, action) => setStatus(state, "fail", action.payload))

            // ✅ تعديل حيوان
            .addCase(editanimal.pending, (state) => setStatus(state, "loading"))
            .addCase(editanimal.fulfilled, (state, action) => {
                setStatus(state, "success");
                state.animalList = state.animalList.map(animal =>
                    animal._id === action.payload?._id ? action.payload : animal
                );
            })
            .addCase(editanimal.rejected, (state, action) => setStatus(state, "fail", action.payload));
    },
});

// ✅ تصدير الـ Reducer
export default animalSlice.reducer;
