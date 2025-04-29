import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk("user/register", async (user) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/user/register",
      user
    );
    return response;
  } catch (error) {
    console.log(error);
  }
});
export const userlogin = createAsyncThunk("user/login", async (user, { rejectWithValue }) => {
  try {
    let response = await axios.post("http://localhost:5000/user/login", user);
    return response.data; // إعادة بيانات المستخدم عند النجاح
  } catch (error) {
    return rejectWithValue(error.response?.data || { msg: "Login failed! Please try again." });
  }
});

export const userCurrent = createAsyncThunk("user/current", async () => {
  try {
    let response = await axios.get("http://localhost:5000/user/current", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return await response;
  } catch (error) {
    console.log(error);
  }
});



export const deleteuser = createAsyncThunk("user/delete", async(id)=>{
  try {
      let result = axios.delete(`http://localhost:5000/user/${id}`)
      console.log("Response:", result);
      return result
  } catch (error) {
      console.log(error)
  }
})
export const edituser = createAsyncThunk("user/edit", async({id,edited})=>{
  try {
      let result = axios.put(`http://localhost:5000/user/${id}`,edited)
      console.log("Response:", result);
      return result
  } catch (error) {
      console.log(error)
  }
})

export const getusers = createAsyncThunk("user/get", async () => {
  try {
      let result = axios.get("http://localhost:5000/user/")
      console.log("Response:", result);
      return result
  } catch (error) {
      console.log(error)
  }
})
const initialState = {
  user: null,
  status: null,
  userlist:[]
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
        state.status = "successsss";
        state.user = action.payload.data.newUserToken;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(userRegister.rejected, (state) => {
        state.status = "fail";
      })
      .addCase(userlogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        state.error = null; // تصفير الخطأ عند النجاح
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload?.msg || "Login failed! Please try again.";
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
      });
  },
})  

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
