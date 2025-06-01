import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://back-adoption-production.up.railway.app";

// Dans userSlice.js
export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`);
    dispatch({ type: "user/fetchUserData", payload: response.data });
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur", error);
  }
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/register`, user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const userlogin = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      let response = await axios.post(`${BASE_URL}/user/login`, user);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: "Échec de la connexion ! Veuillez réessayer" }
      );
    }
  }
);

export const userCurrent = createAsyncThunk("user/current", async () => {
  try {
    let response = await axios.get(`${BASE_URL}/user/current`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return await response;
  } catch (error) {
    console.log(error);
  }
});

export const deleteuser = createAsyncThunk("user/delete", async (id) => {
  try {
    let result = await axios.delete(`${BASE_URL}/user/${id}`);
    console.log("Response:", result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const edituser = createAsyncThunk("user/edit", async ({ id, edited }) => {
  try {
    const result = await axios.put(`${BASE_URL}/user/users/${id}`, edited);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getusers = createAsyncThunk("user/get", async () => {
  try {
    let result = await axios.get(`${BASE_URL}/user/`);
    console.log("Response:", result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

// pour l'image
export const uploadAndEditUserImage = createAsyncThunk(
  "user/uploadImage",
  async ({ imageFile }) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const uploadRes = await axios.post(`${BASE_URL}/api/upload`, formData);
    const imageUrl = uploadRes.data.url;
    console.log("Upload response:", uploadRes.data);
    return { img: imageUrl };
  }
);

// pour user
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/api/users/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  status: null,
  userlist: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = "pending";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload;
      })
      .addCase(userlogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload?.msg || "Échec de la connexion ! Veuillez réessayer";
      })
      .addCase(userCurrent.pending, (state) => {
        state.status = "pending";
      })
      .addCase(userCurrent.fulfilled, (state, action) => {
        state.status = "successsss";
        state.user = action.payload?.data.user;
      })
      .addCase(userCurrent.rejected, (state) => {
        state.status = "fail";
      })
      .addCase(getusers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getusers.fulfilled, (state, action) => {
        state.status = "successsss";
        state.userlist = action.payload?.data.users;
      })
      .addCase(getusers.rejected, (state) => {
        state.status = "fail";
      })
      .addCase(edituser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(edituser.fulfilled, (state) => {
        state.status = "successsss";
      })
      .addCase(edituser.rejected, (state) => {
        state.status = "fail";
      })
      .addCase(deleteuser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteuser.fulfilled, (state) => {
        state.status = "successsss";
      })
      .addCase(deleteuser.rejected, (state) => {
        state.status = "fail";
      })
      .addCase(uploadAndEditUserImage.pending, (state) => {
        state.status = "pending";
      })
      .addCase(uploadAndEditUserImage.fulfilled, (state, action) => {
        if (state.user) state.user.img = action.payload.img;
      })
      .addCase(uploadAndEditUserImage.rejected, (state) => {
        state.status = "fail";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
